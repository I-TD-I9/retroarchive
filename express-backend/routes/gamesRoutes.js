"use strict";
const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

router.get("/search", gamesController.searchGames);
router.get("/:id", gamesController.fetchGameById);

module.exports = router;
