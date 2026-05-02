const express = require('express');
const router = express.Router();
const Reach = require('../models/Reach');

// ১. Click hole data save korbe
router.post('/click', async (req, res) => {
    const { districtName } = req.body;
    const currentMonth = new Date().toLocaleString('default', { month: 'short' }); // e.g., 'Apr'

    const newClick = new Reach({
        district: districtName,
        month: currentMonth
    });
    await newClick.save();
    res.json({ message: "Success" });
});

// ২. Charts-er jonnyo data pathabe
router.get('/all-stats', async (req, res) => {
    const barData = await Reach.aggregate([
        { $group: { _id: "$district", total: { $sum: 1 } } }
    ]);
    const lineData = await Reach.aggregate([
        { $group: { _id: "$month", total: { $sum: 1 } } }
    ]);
    res.json({ barData, lineData });
});

module.exports = router;