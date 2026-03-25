const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI)
    .then(() => {
        console.log('✅ Connected to Metropolitan University Database');
    })
    .catch(err => {
        console.log('❌ Connection Error:', err.message);
    });

app.listen(5000, () => {
    console.log('🚀 Server active on port 5000');
});
