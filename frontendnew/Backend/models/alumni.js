const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    photoUrl: { type: String }, // ১ নং ছবির প্রোফাইল ফটো লিঙ্ক
    department: { type: String, required: true }, // ৩ নং ছবির ফিল্টার
    graduationYear: { type: Number, required: true }, // ৩ নং ছবির ব্যাচ ইয়ার
    recentInvolvement: { type: String }, // ১ নং ছবির কোম্পানি/ইনভলভমেন্ট বক্স
    
    // ম্যাপে ডট দেখানোর জন্য কান্ট্রি ডাটা (শর্ত ৪)
    country: { type: String, required: true }, 
    location: {
        lat: { type: Number }, // ম্যাপে ডটের অক্ষাংশ
        lng: { type: Number }  // ম্যাপে ডটের দ্রাঘিমাংশ
    }
}, { timestamps: true });

module.exports = mongoose.model('Alumni', alumniSchema);