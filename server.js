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
    methods: ["GET", "POST" , "PUT" , "DELETE"],
    allowedHeaders: ["Content-Type","Authorization"],
}));




connectDB();

app.use(express.json());


// ✅ Example API Endpoint
app.get("/api/news", (req, res) => {
    res.json({ message: "CORS is now enabled!" });
});

app.use('/api/news', newsRoutes);
app.use('/api/subscribers', subscriberRoutes);

// Fetch news every hour
cron.schedule('0 * * * *', fetchAndSaveNews);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







  