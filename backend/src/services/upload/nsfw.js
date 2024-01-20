
const axios = require("axios");
const RequestModel = require("../utils/RateLimiter.model"); // Make sure to import the Redis client library
const maxRequestAgeMs = 60 * 1000;
const apiKeys = ['8edb80b975mshdfc7fe6c3dca073p117fa8jsnb1d2abb8bc99','82d5c6e9b0msh0bb6e3e8fdb490dp160f2fjsn1be0f0f4fc0f',]
let currentKeyIndex = 0;

const rateLimit = {
    windowMs: 60 * 1000, // 60 seconds
    maxRequests: 20, // Maximum requests within the window
};
async function saveRequest(apiKey) {
    const timestamp = Date.now();
    const request = await RequestModel.create({ apiKey, timestamp });
    await request
}
async function shouldSkipApiKey(apiKey) {
    const timestamp = Date.now();
    const windowStart = timestamp - rateLimit.windowMs;

    const requestCount = await RequestModel.countDocuments({
        apiKey,
        timestamp: { $gte: windowStart },
    });

    return requestCount >= 1;
}


async function IsNSFW(image) {
    await cleanupOldRequests();

    for (let i = 0; i < apiKeys.length; i++) {
        const apiKey = apiKeys[currentKeyIndex];

        if (await shouldSkipApiKey(apiKey)) {
            console.log(`Skipping API key ${apiKey} due to rate limit.`);
            currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length; // Rotate to the next key
            continue;
        }

        try {
            const response = await sendAPIRequest(apiKey, image);
            await saveRequest(apiKey); // Store the request in the database
            return response.data;
        } catch (error) {
            console.error(`API Request Error for key ${apiKey}:`, error);
        }

        currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length; // Rotate to the next key
    }

    console.log('All API keys have reached their rate limits.');
}



async function sendAPIRequest(apiKey, image) {
    const options = {
        method: 'POST',
        url: 'https://nsfw-images-detection-and-classification.p.rapidapi.com/adult-content',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'nsfw-images-detection-and-classification.p.rapidapi.com',
        },
        data: {
            url: image,
        },
    };

    return axios.request(options);
}
async function cleanupOldRequests() {
    const cutoffTimestamp = Date.now() - maxRequestAgeMs;

    try {
        await RequestModel.deleteMany({ timestamp: { $lt: cutoffTimestamp } });
        console.log('Old requests removed from the database.');
    } catch (error) {
        console.error('Error cleaning up old requests:', error);
    }
}


module.exports = {
    IsNSFW
}
