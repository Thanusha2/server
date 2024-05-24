const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define Schema
const dataSchema = new mongoose.Schema({
    // Define your schema fields here
    // Example:
    name: String,
    age: Number,
});

const Data = mongoose.model('Data', dataSchema);

// Define API Endpoint
app.get('/initialize-database', async (req, res) => {
    try {
        // Fetch data from third-party API
        const response = await axios.get('https://api.example.com/data');

        // Extract data from response
        const seedData = response.data;

        // Insert seed data into the database
        await Data.insertMany(seedData);

        res.send('Database initialized with seed data');
    } catch (error) {
        console.error('Error initializing database:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
