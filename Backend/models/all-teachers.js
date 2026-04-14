const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    fullName: { type: String, required: [true, "Full name is required"] },
    department: { type: String, required: [true, "Department is required"] },
    district: { type: String, required: [true, "District is required"] }, // ডিস্ট্রিক্ট ফিল্টার করার জন্য জরুরি
    experience: { type: Number, required: [true, "Experience is required"] },
    employeeId: { type: String, required: [true, "Employee ID is required"], unique: true },
    bio: { type: String, required: [true, "bio is required"] },
    photoUrl: { type: String, required: [true, "Photo URL is required"] }, // ছবির লিংক সেভ করার জন্য
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
    //recommended: { type: Boolean },
    recommended: { type: Boolean, required: [true, "Recommendation is required"] }, 
    // 'No' বললে তার কারণ (১ নং ইমেজের মেসেজ বক্স, শুধু অ্যাডমিন দেখবে)
    whyNoMessage: { type: String, required: [true, "why not"] },
    // ২ নং ও ৫ নং ইমেজের স্যাটিসফেকশন লেভেল
    satisfactionLevel: { type: String,  required: [true, "satisfactionLevel"]}
},
{ timestamps: true 
});
module.exports = mongoose.model('Teacher', teacherSchema);