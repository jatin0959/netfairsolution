const express = require('express');
const router = express.Router();
const ContactUs = require('../models/ContactUs');

// Route to save Contact Us form data
router.post('/', async (req, res) => {
  try {
    console.log('inside post')
    const { fullName, email, phoneNumber, inquiryAbout, message } = req.body;
    
    // Create new Contact Us document
    const contactUsEntry = new ContactUs({
      fullName,
      email,
      phoneNumber,
      inquiryAbout,
      message
    });

    // Save the Contact Us entry to MongoDB
    await contactUsEntry.save();

    res.status(201).json({ message: 'Contact Us form data saved successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
