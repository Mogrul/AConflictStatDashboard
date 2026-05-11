const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "../../views/index.html"));
});

router.get("/about", (request, response) => {
    response.sendFile(path.join(__dirname, "../../views/about.html"));
})

module.exports = router;