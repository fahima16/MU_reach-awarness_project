const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// শর্ত ১: ভোট সেভ করা এবং মেসেজ নেওয়া
router.post('/vote', async (req, res) => {
    try {
        const { vote, suggestion } = req.body;
        const newFeedback = new Feedback({ vote, suggestion });
        await newFeedback.save();
        res.status(200).json({ success: true, message: "Feedback Received. Thank you!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// শর্ত ২: পারসেন্টেজ ক্যালকুলেশন (ইমেজ ৯-এর বার গ্রাফের জন্য)
router.get('/stats', async (req, res) => {
    try {
        const totalVotes = await Feedback.countDocuments();
        const yesVotes = await Feedback.countDocuments({ vote: 'Yes' });
        const noVotes = await Feedback.countDocuments({ vote: 'No' });

        // পারসেন্টেজ বের করার লজিক (০ দিয়ে ভাগ হওয়া আটকাতে কন্ডিশন)
        const yesPercentage = totalVotes > 0 ? ((yesVotes / totalVotes) * 100).toFixed(0) : 0;
        const noPercentage = totalVotes > 0 ? ((noVotes / totalVotes) * 100).toFixed(0) : 0;

        res.json({
            yesPercentage,
            noPercentage,
            totalVotes
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// শর্ত ৩: অ্যাডমিনের জন্য সব সাজেশন দেখা
router.get('/admin/suggestions', async (req, res) => {
    try {
        // শুধু যাদের সাজেশন বা মেসেজ আছে তাদের লিস্ট দেখাবে
        const suggestions = await Feedback.find({ suggestion: { $ne: "" } }).sort({ createdAt: -1 });
        res.json(suggestions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;