"use strict";
const model = require("../models/gamesModel");

async function searchGames(req, res) {
    const { q, platform } = req.query;
    if (q) {
        try {
            const games = await model.searchGames(q, platform);
            res.json(games);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required query param!");
    }
}

async function fetchGameById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const game = await model.getGameById(id);
            res.json(game);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

module.exports = { searchGames, fetchGameById };
