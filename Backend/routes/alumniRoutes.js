const express = require('express');
const router = express.Router();
const Alumni = require('../models/alumni');

// ১. নতুন Alumni রেজিস্ট্রেশন করা
router.post('/register', async (req, res) => {
    try {
        const alumni = new Alumni(req.body);
        await alumni.save();
        res.status(201).json({ message: "Registration Successful", data: alumni });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ২. সব Alumni-র লিস্ট পাওয়া (All-Alumni পেজের জন্য এবং ফিল্টারিং এর জন্য)
router.get('/all', async (req, res) => {
    try {
        const { department, country, batch, search } = req.query;
        let query = {};

        // ফিল্টারিং লজিক (আপনার প্রপোজাল অনুযায়ী)
        if (department && department !== 'Department (All)') query.department = department;
        if (country && country !== 'Country (All)') query.country = country;
        if (batch && batch !== 'Batch Year') query.batch = batch;
        if (search) query.name = { $regex: search, $options: 'i' }; // Search by name

        const alumniList = await Alumni.find(query);
        res.json(alumniList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;