const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get latest news
/*  router.get('/latest', async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 }).limit(10);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get past news with pagination
router.get('/past', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const news = await News.find()
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await News.countDocuments();

    res.json({
      news,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;*/



// routes/news.js


// POST route to save news
router.post('/', async (req, res) => {
  try {
    const { title, description, url, publishedAt, source } = req.body;
    const newsArticle = await News.findOneAndUpdate(
      { url },
      { title, description, publishedAt, source },
      { upsert: true, new: true }
    );
    res.status(201).json(newsArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;