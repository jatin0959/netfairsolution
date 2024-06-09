const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// POST route to save comment to the database
router.post('/', async (req, res) => {
  const { name, email, website, comment } = req.body;

  try {
    // Create a new comment document
    const newComment = new Comment({ name, email, website, comment });
    await newComment.save();

    res.status(201).json({ message: 'Comment saved successfully' });
  } catch (error) {
    console.error('Error saving comment:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
