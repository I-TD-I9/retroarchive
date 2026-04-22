"use strict";
const model = require("../models/archiveModel");

async function fetchArchive(req, res) {
    try {
        const items = await model.getArchive();
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function addToArchive(req, res) {
    const { game_id, game_name, game_image, rating, notes } = req.body;
    if (game_id && game_name) {
        try {
            const item = await model.addToArchive(
                game_id, game_name,
                game_image || null, rating || null, notes || null
            );
            res.status(201).json(item);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required fields!");
    }
}

async function updateArchiveItem(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const { rating, notes } = req.body;
            const item = await model.updateArchiveItem(
                id, rating || null, notes || null
            );
            if (item) {
                res.json(item);
            } else {
                res.status(404).send("Archive item not found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function removeFromArchive(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount = await model.deleteFromArchive(id);
            if (deletedCount > 0) {
                res.send(`Archive item with id ${id} deleted successfully.`);
            } else {
                res.status(404).send("Archive item not found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

module.exports = { fetchArchive, addToArchive, updateArchiveItem, removeFromArchive };
