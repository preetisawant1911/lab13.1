require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3001;

// Load connection string from .env
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

app.get('/', async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    // Success response
    res.json({ message: "Successfully connected to the database!" });
  } catch (error) {
    console.error("Connection error:", error.message);

    // Error response
    res.status(500).json({ message: "Failed to connect to the database." });
  } finally {
    // Close connection
    await client.close();
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

