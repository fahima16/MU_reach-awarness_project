const express = require('express');
const router = express.Router();
const Alumni = require('../models/alumni');

// শর্ত ১: অ্যালুমনাই রেজিস্ট্রেশন (POST request)
router.post('/register', async (req, res) => {
    try {
        const newAlumni = new Alumni(req.body);
        const savedAlumni = await newAlumni.save();
        res.status(201).json({ success: true, data: savedAlumni });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// শর্ত ২ ও ৩: সব অ্যালুমনাই দেখানো এবং সার্চ/ফিল্টার করা
router.get('/', async (req, res) => {
    try {
        const { search, department, country, batchYear } = req.query;
        let query = {};

        // নাম দিয়ে সার্চ করার লজিক
        if (search) {
            query.fullName = { $regex: search, $options: 'i' }; 
        }

        // ড্রপডাউন ফিল্টারিং (Dept, Country, Year)
        if (department && department !== 'All') query.department = department;
        if (country && country !== 'All') query.country = country;
        if (batchYear) query.graduationYear = Number(batchYear);

        const alumniList = await Alumni.find(query).sort({ createdAt: -1 });
        res.json(alumniList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// শর্ত ৪: ম্যাপে ডট দেখানোর জন্য শুধু লোকেশন ডাটা নেওয়া
router.get('/map-dots', async (req, res) => {
    try {
        // শুধু কান্ট্রি এবং লোকেশন ডাটা পাঠাবে হোভার ইফেক্টের জন্য
        const mapData = await Alumni.find({}, 'fullName country location');
        res.json(mapData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;