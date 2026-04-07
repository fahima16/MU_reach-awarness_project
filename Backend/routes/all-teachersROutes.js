const express = require('express');
const router = express.Router();
const Teacher = require('../models/all-teachers'); // আপনার মডেলের নাম অনুযায়ী

// ১. ইমেজ-২ এর জন্য: টিচার রেজিস্ট্রেশন (ফর্ম সাবমিট)
router.post('/register', async (req, res) => {
    try {
        const newTeacher = new Teacher(req.body);
        await newTeacher.save();
        res.status(201).json({ 
            success: true, 
            message: "Teacher registered successfully!" 
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// ২. ইমেজ-১ এর জন্য: হোম পেজে ৩ জন টিচার দেখানো
// এটি 'The Minds Shaping Tomorrow' সেকশনের জন্য
router.get('/featured', async (req, res) => {
    try {
        // লজিক: লেটেস্ট ৩ জন টিচার অথবা যাদের isFeatured: true
        const featured = await Teacher.find().sort({ createdAt: -1 }).limit(3);
        res.json(featured);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ৩. ইমেজ-৩ এর জন্য: সব টিচারের লিস্ট (Meet Our Faculty Leaders)
// যেখানে টিচারদের কার্ড আকারে দেখানো হবে
router.get('/all', async (req, res) => {
    try {
        const teachers = await Teacher.find().sort({ fullName: 1 });
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ৪. ইমেজ-৪ এর জন্য: জেলা ভিত্তিক টিচার সংখ্যা (Top Districts)
// এটি চার্ট এবং ডিস্ট্রিক্ট লিস্টের ডাটা আপডেট করবে
router.get('/stats-by-district', async (req, res) => {
    try {
        const stats = await Teacher.aggregate([
            {
                $group: {
                    _id: "$district", // জেলা অনুযায়ী গ্রুপ করবে
                    totalTeachers: { $sum: 1 } // সংখ্যা গুনবে
                }
            },
            { $sort: { totalTeachers: -1 } }, // বড় থেকে ছোট সাজাবে
            { $limit: 5 } // টপ ৫টি জেলা দেখাবে (আপনার ৪ নং ছবির মতো)
        ]);
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// নির্দিষ্ট টিচারকে Featured হিসেবে সিলেক্ট করার জন্য
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