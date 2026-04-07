const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    department: { type: String, required: true },
    district: { type: String, required: true }, // ডিস্ট্রিক্ট ফিল্টার করার জন্য জরুরি
    experience: { type: Number, required: true },
    employeeId: { type: String, required: true, unique: true },
    bio: { type: String },
    photoUrl: { type: String }, // ছবির লিংক সেভ করার জন্য
    isFeatured: { type: Boolean, default: false }, // হোম পেজে ৩ জনকে দেখানোর জন্য
    // --- আজকের নতুন ফিডব্যাক ও রেটিং ফিল্ডস ---
    // ২ নং ইমেজের ৫টি পয়েন্টের ডাটা এখানে সেভ হবে
    ratings: {
        academicEngagement: { type: Number, default: 0 },
        classroomBehavior: { type: Number, default: 0 },
        resourceUtilization: { type: Number, default: 0 },
        punctuality: { type: Number, default: 0 },
        studentParticipation: { type: Number, default: 0 }
    },

    // ৩ নং ইমেজের Yes/No পারসেন্টেজের জন্য
    recommended: { type: Boolean }, 

    // 'No' বললে তার কারণ (১ নং ইমেজের মেসেজ বক্স, শুধু অ্যাডমিন দেখবে)
    whyNoMessage: { type: String },

    // ২ নং ও ৫ নং ইমেজের স্যাটিসফেকশন লেভেল
    satisfactionLevel: { type: String }
});

module.exports = mongoose.model('Teacher', teacherSchema);