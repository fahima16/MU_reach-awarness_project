const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    department: { type: String, required: true },
    district: { type: String, required: true }, // ডিস্ট্রিক্ট ফিল্টার করার জন্য জরুরি
    experience: { type: Number, required: true },
    employeeId: { type: String, required: true, unique: true },
    bio: { type: String },
    photoUrl: { type: String }, // ছবির লিংক সেভ করার জন্য
    isFeatured: { type: Boolean, default: false } // হোম পেজে ৩ জনকে দেখানোর জন্য
});

module.exports = mongoose.model('Teacher', teacherSchema);