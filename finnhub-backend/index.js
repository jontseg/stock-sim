const serverless = require('serverless-http');
const express = require('express');
const finnhub = require('finnhub');
const app = express();

// Configure Finnhub client
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

// Define a route for your Express app
app.get('/candle', (req, res) => {
    const { symbol = 'AAPL', resolution, from, to } = req.query;
    finnhubClient.stockCandles(symbol, resolution, from, to, (error, data) => {
        if (error) {
            console.error("Error fetching data from Finnhub API:", error);
            return res.status(500).json({ error: "Error fetching data from Finnhub API" });
        }
        res.json(data);
    });
});

// Export the handler for Lambda
module.exports.handler = serverless(app);
