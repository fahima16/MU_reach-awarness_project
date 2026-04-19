const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Routes Import
const reachRoutes = require('./routes/reachRoutes');
const alumniRoutes = require('./routes/alumniRoutes');
const teacherRoutes = require('./routes/all-teachersROutes'); // স্পেলিং চেক করে নিন


const app = express();
const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

// Logger Middleware (সংশোধিত)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
    next();
});

// API Routes
app.use('/api/reach', reachRoutes);
app.use('/api/alumni', alumniRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/feedback', require('./routes/FeedbackRoutes'));
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

// Basic Route
app.get('/', (req, res) => {
    res.send("Metropolitan University Reach Backend is Running!");
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Database Connected!"))
    .catch(err => console.log("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on: http://localhost:${PORT}`);
});