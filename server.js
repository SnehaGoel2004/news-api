require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cron = require('node-cron');
const { fetchAndSaveNews } = require('./services/newsService');
const newsRoutes = require('./routes/news');
const subscriberRoutes = require('./routes/subscribers');

const app = express();

connectDB();

app.use(express.json());

app.use('/api/news', newsRoutes);
app.use('/api/subscribers', subscriberRoutes);

// Fetch news every hour
cron.schedule('0 * * * *', fetchAndSaveNews);

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







  