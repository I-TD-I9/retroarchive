"use strict";
const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");
const cors = require("cors");

const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};

router.use(cors(corsOptions));

router.get("/search", gamesController.searchGames);

module.exports = router;
