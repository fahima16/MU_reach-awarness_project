const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    fullName: { type: String},
    department: { type: String},
    district: { type: String}, // ডিস্ট্রিক্ট ফিল্টার করার জন্য জরুরি
    //years_experience: { type: Number, default: 0},
    experience: {type: Number, default: 0},
    ex_details: {type: String},
    employeeId: { type: String, required: [true, "Employee ID is required"], unique: true },
    bio: { type: String},
    photoUrl: { type: String}, // ছবির লিংক সেভ করার জন্য
    isFeatured: { type: Boolean, default: false }, // হোম পেজে ৩ জনকে দেখানোর জন্য
    // --- আজকের নতুন ফিডব্যাক ও রেটিং ফিল্ডস ---
    // ২ নং ইমেজের ৫টি পয়েন্টের ডাটা এখানে সেভ হবে
    ratings: {
        academicEngagement: { type: Number},
        classroomBehavior: { type: Number},
        resourceUtilization: { type: Number},
        punctuality: { type: Number},
        studentParticipation: { type: Number}
    },
    // ৩ নং ইমেজের Yes/No পারসেন্টেজের জন্য
    //recommended: { type: Boolean },
    recommended: { type: Boolean}, 
    // 'No' বললে তার কারণ (১ নং ইমেজের মেসেজ বক্স, শুধু অ্যাডমিন দেখবে)
    whyNoMessage: { type: String},
    // ২ নং ও ৫ নং ইমেজের স্যাটিসফেকশন লেভেল
    satisfactionLevel: { type: String}
},
{ timestamps: true 
});
module.exports = mongoose.model('Teacher', teacherSchema);