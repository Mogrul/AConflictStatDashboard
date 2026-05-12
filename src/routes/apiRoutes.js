const express = require("express");
const env = require("../config/env");
const path = require("path");

const router = express.Router();

router.post("/api/playercount", async (request, response) => {
    try {
        const apiResponse = await fetch(`${env.API_URL}/stats/playercount`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": env.API_SHARED_KEY
            },
            body: JSON.stringify(request.body)
        });

        const data = await apiResponse.json();

        response.json(data);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Proxy failed" })
    }
})

router.post("/api/winrate", async (request, response) => {
    try {
        const apiResponse = await fetch(`${env.API_URL}/stats/winrate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": env.API_SHARED_KEY
            },
            body: JSON.stringify(request.body)
        });

        const data = await apiResponse.json();
        response.json(data);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Proxy failed" })
    }
})

module.exports = router;