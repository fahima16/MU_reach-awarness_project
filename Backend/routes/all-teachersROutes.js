const express = require('express');
const router = express.Router();
const Teacher = require('../models/all-teachers');

// ১. ইমেজ ১ ও ৪ কানেক্টেড রুট: রেজিস্ট্রেশন এবং ফিডব্যাক
// এই একটি রুট দিয়েই টিচার রেজিস্ট্রেশন হবে এবং পরে ফিডব্যাক দিলে ওই আইডিতেই আপডেট হবে
router.post('/register', async (req, res) => {
    try {
        const { employeeId } = req.body;

        // upsert: true দেওয়ার কারণে আইডি মিললে আপডেট হবে, না থাকলে নতুন তৈরি হবে
        const teacher = await Teacher.findOneAndUpdate(
            { employeeId: employeeId }, 
            { $set: req.body }, 
            { new: true, upsert: true, runValidators: true }
        );

        res.status(201).json({ 
            success: true, 
            message: "Data processed successfully!",
            data: teacher 
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// ২. ইমেজ ১ এর জন্য: হোম পেজে ৩ জন টিচার দেখানো (isFeatured লজিক)
router.get('/featured', async (req, res) => {
    try {
        // যাদের isFeatured: true অথবা লেটেস্ট ৩ জন
        const featured = await Teacher.find({ isFeatured: true }).limit(3);
        res.json(featured);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ৩. ইমেজ ৬ ও ৩ এর জন্য: সব টিচারের লিস্ট (Meet Our Faculty Leaders)
router.get('/all', async (req, res) => {
    try {
        const teachers = await Teacher.find().sort({ fullName: 1 });
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ৪. ইমেজ ৪ এর জন্য: জেলা ভিত্তিক টিচার সংখ্যা
router.get('/stats-by-district', async (req, res) => {
    try {
        const stats = await Teacher.aggregate([
            { $group: { _id: "$district", totalTeachers: { $sum: 1 } } },
            { $sort: { totalTeachers: -1 } },
            { $limit: 5 }
        ]);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ৫. ইমেজ ২, ৩ ও ৫ এর জন্য: এভারেজ রেটিং এবং পারসেন্টেজ ক্যালকুলেশন
router.get('/feedback-stats', async (req, res) => {
    try {
        const stats = await Teacher.aggregate([
            {
                $group: {
                    _id: null,
                    totalResponses: { $sum: 1 },
                    // ইমেজ ৩: Yes কাউন্ট করা
                    yesCount: { 
                        $sum: { $cond: [{ $eq: ["$recommended", true] }, 1, 0] } 
                    },
                    // ইমেজ ২: ৫টি পয়েন্টের গড় (Average) বের করা
                    avgAcademic: { $avg: "$ratings.academicEngagement" },
                    avgBehavior: { $avg: "$ratings.classroomBehavior" },
                    avgResources: { $avg: "$ratings.resourceUtilization" },
                    avgPunctuality: { $avg: "$ratings.punctuality" },
                    avgParticipation: { $avg: "$ratings.studentParticipation" }
                }
            }
        ]);

        if (stats.length > 0) {
            const data = stats[0];
            const yesPercent = (data.yesCount / data.totalResponses) * 100;
            
            res.json({
                totalTeachers: data.totalResponses, // ইমেজ ২ এর নিচের কাউন্টের জন্য
                yesPercentage: yesPercent.toFixed(1), // ইমেজ ৩ ও ৫ এর জন্য
                noPercentage: (100 - yesPercent).toFixed(1),
                averages: {
                    academic: (data.avgAcademic || 0).toFixed(1),
                    behavior: (data.avgBehavior || 0).toFixed(1),
                    resources: (data.avgResources || 0).toFixed(1),
                    punctuality: (data.avgPunctuality || 0).toFixed(1),
                    participation: (data.avgParticipation || 0).toFixed(1)
                }
            });
        } else {
            res.json({ message: "No data found", totalTeachers: 0 });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ৬. টিচারকে Featured হিসেবে সিলেক্ট করার রুট
router.put('/select/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(
            req.params.id, 
            { isFeatured: true }, 
            { new: true }
        );
        if (!teacher) return res.status(404).send("Teacher not found");
        res.json({ message: "Teacher selected for Home Page!", teacher });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;