const axios = require('axios');
const News = require('../models/News');
const Subscriber = require('../models/Subscriber');
const admin = require('../config/firebase');

const fetchAndSaveNews = async () => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
    const articles = response.data.articles;

    for (let article of articles) {
      await News.findOneAndUpdate(
        { url: article.url },
        {
          title: article.title,
          description: article.description,
          url: article.url,
          publishedAt: article.publishedAt,
          source: article.source.name
        },
        { upsert: true, new: true }
      );
    }

    console.log(`${savedArticles.length}News articles updated`);
    await sendNotifications('New articles available!', 'Check out the latest news.');
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

const sendNotifications = async (title, body) => {
  const subscribers = await Subscriber.find();
  const messages = subscribers.map(sub => ({
    notification: { title, body },
    token: sub.fcmToken
  }));

  try {
    await admin.messaging().sendMulticast(messages);
    console.log('Notifications sent successfully');
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
};

module.exports = { fetchAndSaveNews };