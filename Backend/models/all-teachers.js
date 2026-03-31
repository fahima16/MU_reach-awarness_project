// backend/models/all-teachers.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dept: { type: String, required: true },
    district: { type: String, required: true },
    experience: { type: Number, required: true },
    joinedYear: { type: Number },
    quote: { type: String },
    rating: { type: Number, default: 5 },
    avatarKey: { type: String } // Jemon 'AK' ba 'SR'
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);