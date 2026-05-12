require("dotenv").config();

module.exports = {
    API_URL: process.env.API_URL,
    API_SHARED_KEY: process.env.API_SHARED_KEY,
    PORT: process.env.PORT || 3000
}