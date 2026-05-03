const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    vote: { 
        type: String, 
        enum: ['Yes', 'No'], 
        required: true 
    },
    suggestion: { 
        type: String, 
        default: "" 
    } // শুধু 'No' দিলে বা ইমপ্রুভমেন্টের জন্য মেসেজ
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);