const mongoose = require('mongoose');

const reachSchema = new mongoose.Schema({
    district: { type: String, required: true },
    count: { type: Number, default: 1 },
    month: { type: String, required: true }, // Eikhane 'Jan', 'Feb' egulo thakbe
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reach', reachSchema);