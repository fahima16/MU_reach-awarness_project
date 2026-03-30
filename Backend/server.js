const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const alumniRoutes = require('./routes/alumniRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Atlas link .env file-e thakbe)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Database Connected!"))
    .catch(err => console.log("❌ Error:", err));

// Basic Route
app.get('/', (req, res) => {
    res.send("Metropolitan University Reach Backend is Running!");
});

app.use('/api/alumni', alumniRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server on: http://localhost:${PORT}`);
});

