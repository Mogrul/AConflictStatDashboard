const express = require("express");

const rateLimit = require("express-rate-limit");
const pageRoutes = require("./routes/pageRoutes");
const apiRoutes = require("./routes/apiRoutes");
const app = express();

const path = require("path");

app.use(express.json())
app.use(pageRoutes);
app.use(apiRoutes);
app.use(rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: "Too many requests, slow down."
}));
app.set("trust proxy", 1);
app.use(
    "/public",
    express.static(path.join(__dirname, "../public"))
);

module.exports = app;