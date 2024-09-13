require('dotenv').config(); // Load .env file

const express = require('express');
const finnhub = require('finnhub');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Set up Finnhub API key
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_API_KEY;
 // Use API key from .env

// Set up Finnhub client
const finnhubClient = new finnhub.DefaultApi();

// API endpoint to get stock candles data
app.get('/quote', (req, res) => {
    const symbol = req.query.symbol || 'AAPL';

    // Fetch stock data from Finnhub using a callback function
    finnhubClient.quote(symbol, (error, data, response) => {
        if (error) {
            console.error("Error fetching data from Finnhub API:", error);
            return res.status(500).json({ error: "Error fetching data from Finnhub API" });
        }
        res.json(data);  // Return the stock data in JSON format
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
