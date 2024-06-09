const express = require('express');
const multer = require('multer');
const path = require('path');
const Verification = require('../models/Verification');
const User = require('../models/User'); // Import User model
const router = express.Router();

// Set up storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Handle form submission
router.post('/submit', upload.fields([
    { name: 'panDocument' },
    { name: 'bankDocument' },
    { name: 'businessAddressProof' }
]), async (req, res) => {
    try {
        const formData = req.body;
        const files = req.files;

        const newVerification = new Verification({
            ...formData,
            panDocument: files.panDocument ? files.panDocument[0].path : '',
            bankDocument: files.bankDocument ? files.bankDocument[0].path : '',
            businessAddressProof: files.businessAddressProof ? files.businessAddressProof[0].path : ''
        });

        await newVerification.save();
        console.log(req.body.email);

        await User.findOneAndUpdate({ email: req.body.email }, { kycsubmission: true });
        
        res.status(200).send('Data saved successfully');
    } catch (err) {
        res.status(500).send('Error saving data');
    }
});

module.exports = router;
