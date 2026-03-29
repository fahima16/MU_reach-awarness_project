const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    name: { type: String, required: true },
    department: { type: String, required: true }, // CSE, BBA, etc.
    batch: { type: String, required: true },     // Class of 2018
    company: { type: String, required: true },
    jobTitle: { type: String, required: true },  // Software Engineer
    country: { type: String, required: true },
    linkedin: { type: String },
    photo: { type: String, default: 'default-profile.png' }, // ছবির পাথ বা URL
    coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    }
}, { timestamps: true });

module.exports = mongoose.model('Alumni', alumniSchema);