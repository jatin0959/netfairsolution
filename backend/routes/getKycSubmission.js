// routes/getKycSubmission.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ kycsubmission: user.kycsubmission });
  } catch (error) {
    console.error('Error fetching kycsubmission:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
