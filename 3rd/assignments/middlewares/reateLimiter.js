// const request = require('supertest');
// const assert = require('assert');
const express = require("express");
const app = express();

let requestCount = 0;

let numberOfRequestsForUser = {};

setInterval(() => {
    numberOfRequestsForUser = {};
}, 1000);

function rateLimiter(req, res, next) {
    const userId = req.headers["user-id"];

    // Check if the user ID is present in the request header
    if (!userId) {
        return res.status(400).json({ error: "User ID not provided" });
    }

    // Increment the request count for the user
    numberOfRequestsForUser[userId] = (numberOfRequestsForUser[userId] || 0) + 1;

    // Check if the user has exceeded the limit (e.g., 5 requests per second)
    if (numberOfRequestsForUser[userId] > 5) {
        return res.status(404).json({ error: "Request limit exceeded for this user" });
    }

    // If the limit is not exceeded, continue with the request
    next();
}

// Apply the rate limiter middleware globally
app.use(rateLimiter);

app.get("/user", function (req, res) {
    res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
    res.status(200).json({ msg: "created dummy user" });
});

module.exports = app;
