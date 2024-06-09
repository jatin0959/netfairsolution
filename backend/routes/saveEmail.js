// routes/saveEmail.js

const express = require("express");
const router = express.Router();
const Email = require("../models/Email");

// POST route to save email to the database
router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if email already exists
    const existingEmail = await Email.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new email document
    const newEmail = new Email({ email });
    await newEmail.save();

    res.status(201).json({ message: "Email saved successfully" });
  } catch (error) {
    console.error("Error saving email:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
