// backend/routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const Teacher = require('../models/all-teachers');

// Sob teacher-der data get korar API
router.get('/all', async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Noutun teacher register korar API
router.post('/register', async (req, res) => {
    const newTeacher = new Teacher(req.body);
    try {
        const savedTeacher = await newTeacher.save();
        res.status(201).json(savedTeacher);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;