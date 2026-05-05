"use strict";
const model = require("../models/archiveModel");

async function fetchArchive(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    try {
        const items = await model.getArchive(req.user.id);
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function addToArchive(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    const { game_id, game_name, game_image, rating, notes } = req.body;
    if (game_id && game_name) {
        try {
            const item = await model.addToArchive(
                req.user.id, game_id, game_name,
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
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    const id = req.params.id;
    if (id) {
        try {
            const { rating, notes } = req.body;
            const item = await model.updateArchiveItem(
                req.user.id, id, rating || null, notes || null
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
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount = await model.deleteFromArchive(req.user.id, id);
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
