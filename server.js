const express = require("express");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();

app.set("trust proxy", 1);

app.use(rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: "Too many requests, slow down."
}))

app.use("/static", express.static(path.join(__dirname, "static")))

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(8080, () => console.log("App available on http://localhost:8080"))