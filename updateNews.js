/*const axios = require('axios');
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://snehagoel:goel.SNEHA01@cluster0.lwlbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

async function fetchAndUpdateNews() {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=deb918d0547b4a479442c7c9824e04c2'); // Replace with your API key
    const articles = response.data.articles;
    console.log(`Fetched ${articles.length} articles.`);

    await client.connect();
    const database = client.db('test'); // Replace with your database name
    const collection = database.collection('news'); // Replace with your collection name

    for (const article of articles) {
      await collection.updateOne(
        { url: article.url }, // Unique identifier
        { $set: article }, // Update the article
        { upsert: true } // Insert if it doesn't exist
      );
    }
    console.log("News articles updated in the database.");
  } catch (error) {
    console.error('Error fetching or updating news:', error);
  } finally {
    await client.close();
  }
}

// Schedule the function to run at regular intervals
setInterval(fetchAndUpdateNews, 3600000); // Every hour*/