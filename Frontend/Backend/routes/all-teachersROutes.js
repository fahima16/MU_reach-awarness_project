const express = require('express');
const router = express.Router();
const Teacher = require('../models/all-teachers');
//const multer = require('multer');

// ছবি সেভ করার জন্য সাধারণ মেমোরি স্টোরেজ (যাতে এরর না আসে)
//const upload = multer({ dest: 'uploads/' });



const path = require('path');

// ছবির এক্সটেনশনসহ সেভ করার জন্য স্টোরেজ ইঞ্জিন
/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // ফোল্ডার নাম
  },
  filename: function (req, file, cb) {
    // অরিজিনাল এক্সটেনশন (যেমন .jpg) বের করে নিবে
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });*/

// ১. ইমেজ ১ ও ৪ কানেক্টেড রুট: রেজিস্ট্রেশন এবং ফিডব্যাক
// এই একটি রুট দিয়েই টিচার রেজিস্ট্রেশন হবে এবং পরে ফিডব্যাক দিলে ওই আইডিতেই আপডেট হবে
{/*router.post('/register', upload.single('photo'), async (req, res) => {
    try {
        console.log("Input Data:", req.body); // টার্মিনালে ডাটা আসছে কি না চেক করো
        const { employeeId } = req.body;

        if (!employeeId) {
            return res.status(400).json({ success: false, error: "Employee ID is missing!" });
        }
        const updateData={...req.body,
            /*isUrgent: req.body.whyNoMessage ? true : false,*/}
            {/*ratings:{
            academicEngagement: Number(req.body.academicEngagement) || 0,
            classroomBehavior: Number(req.body.classroomBehavior) || 0,
            resourceUtilization: Number(req.body.resourceUtilization) || 0,
            punctuality: Number(req.body.punctuality) || 0,
            studentParticipation: Number(req.body.studentParticipation) || 0}
        };
        if(req.file){
            updateData.photoUrl=`uploads/${req.file.filename}`;
        }

        const teacher = await Teacher.findOneAndUpdate(
            { employeeId: employeeId },
            { $set: updateData }, 
            { new: true, upsert: true }
        );

        res.status(200).json({ success: true, data: teacher });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});*/}

router.post('/register', async (req, res) => {
    try {
        console.log("Input Data:", req.body); 
        const { employeeId, photoUrl } = req.body; // সরাসরি বডি থেকে photoUrl নিবে

        if (!employeeId) {
            return res.status(400).json({ success: false, error: "Employee ID is missing!" });
        }

        const updateData = {
            ...req.body,
            // যদি ইউজার লিঙ্ক দেয় তবে সেটি সেভ হবে, নাহলে আগেরটি থাকবে
            /*photoUrl: photoUrl || undefined,*/ 
            photoUrl: photoUrl && photoUrl.trim() !== "" ? photoUrl : undefined,
            ratings: {
                academicEngagement: Number(req.body.academicEngagement) || 0,
                classroomBehavior: Number(req.body.classroomBehavior) || 0,
                resourceUtilization: Number(req.body.resourceUtilization) || 0,
                punctuality: Number(req.body.punctuality) || 0,
                studentParticipation: Number(req.body.studentParticipation) || 0
            }
        };

        const teacher = await Teacher.findOneAndUpdate(
            { employeeId: employeeId },
            { $set: updateData }, 
            { new: true, upsert: true }
        );

        res.status(200).json({ success: true, data: teacher });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});



router.get('/complaints', async(req, res)=>{
        try {
            const complaints= await Teacher.find({ whyNoMessage: { $exists: true, $ne: ""}});
            res.status(200).json({success: true, data:complaints});
        } catch(err){
            res.status(500).json(err);
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
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.find().sort({ createdAt: -1 });
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
{/*router.get('/feedback-stats', async (req, res) => {
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
                    avgAcademic: { $avg: "$academicEngagement" },
                    avgBehavior: { $avg: "$classroomBehavior" },
                    avgResources: { $avg: "$resourceUtilization" },
                    avgPunctuality: { $avg: "$punctuality" },
                    avgParticipation: { $avg: "$studentParticipation" }
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
});*/}
router.get('/feedback-stats', async (req, res) => {
    try {
        const stats = await Teacher.aggregate([
            {
                $group: {
                    _id: null,
                    totalResponses: { $sum: 1 },
                    yesCount: { 
                        $sum: { $cond: [{ $eq: ["$recommended", true] }, 1, 0] } 
                    },
                    // রেটিংগুলোর যোগফল
                    totalAcademic: { $sum: "$ratings.academicEngagement" },
                    totalBehavior: { $sum: "$ratings.classroomBehavior" },
                    totalResources: { $sum: "$ratings.resourceUtilization" },
                    totalPunctuality: { $sum: "$ratings.punctuality" },
                    totalParticipation: { $sum: "$ratings.studentParticipation" }
                }
            }
        ]);

        if (stats.length > 0) {
            const data = stats[0];
            //const yesPercent = (data.yesCount / data.totalResponses) * 100;
            //const yesPercent = n > 0 ? (data.yesCount / n) * 100 : 0;
            const n = data.totalResponses;
            const yesPercent = n > 0 ? (data.yesCount / n) * 100 : 0;

            // ১. আলাদা আলাদা পয়েন্ট বের করা (Out of 5)
            const p1 = (data.totalAcademic / n) || 0;
            const p2 = (data.totalBehavior / n) || 0;
            const p3 = (data.totalResources / n) || 0;
            const p4 = (data.totalPunctuality / n) || 0;
            const p5 = (data.totalParticipation / n) || 0;

            // ২. তোমার মেইন লজিক: সামগ্রিক পারসেন্টেজ (Total Earned / 25) * 100
            const totalScore = p1 + p2 + p3 + p4 + p5;
            const overallPercentage = (totalScore / 25) * 100;

            res.json({
                totalTeachers: n,
                yesPercentage: parseFloat(yesPercent.toFixed(1)), // ইমেজ ৩ ও ৫ এর জন্য
                noPercentage: parseFloat((100 - yesPercent).toFixed(1)),
                overallPercentage:parseFloat(overallPercentage.toFixed(1)), // ডান পাশের বড় পারসেন্টেজ
                individualRatings: { // বাম পাশের পয়েন্টগুলো
                    academic: parseFloat(p1.toFixed(1)),
                    behavior: parseFloat(p2.toFixed(1)),
                    resources: parseFloat(p3.toFixed(1)),
                    punctuality: parseFloat(p4.toFixed(1)),
                    participation: parseFloat(p5.toFixed(1))
                }
            });
        } else {
            res.json({ overallPercentage: 0, individualRatings: {} });
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