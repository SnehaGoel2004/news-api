require('dotenv').config();
const express = require('express');
const cors = require("cors"); // Import CORS
const connectDB = require('./config/db');
const cron = require('node-cron');
const { fetchAndSaveNews } = require('./services/newsService');
const newsRoutes = require('./routes/news');
const subscriberRoutes = require('./routes/subscribers');
const app = express();



// ✅ Enable CORS for all requests
app.use(cors({
    origin: "*",  // Allows all frontend domains (for testing)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));




connectDB();

app.use(express.json());


// ✅ Example API Endpoint
app.get("/api/News", (req, res) => {
    res.json({ message: "CORS is now enabled!" });
});

app.use('/api/news', newsRoutes);
app.use('/api/subscribers', subscriberRoutes);

// Fetch news every hour
cron.schedule('0 * * * *', fetchAndSaveNews);

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







  