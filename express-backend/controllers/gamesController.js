"use strict";
const fetch = require("node-fetch");

// Retro platform IDs from RAWG:
const RETRO_PLATFORMS = "49,79,83,26,43,24,9,8,105,11,167,107,106,74,77,27,15,17,80,23";

async function searchGames(req, res) {
    const { q } = req.query;
    if (q) {
        try {
            const params = new URLSearchParams({
                key: process.env.RAWG_API_KEY,
                search: q,
                platforms: RETRO_PLATFORMS,
                page_size: 30
            });
            const response = await fetch(`https://api.rawg.io/api/games?${params}`);
            if (!response.ok) throw new Error("RAWG API error");
            const data = await response.json();
            const games = data.results.map(g => ({
                id: String(g.id),
                name: g.name,
                image: g.background_image,
                released: g.released,
                platforms: g.platforms ? g.platforms.map(p => p.platform.name) : []
            }));
            res.json(games);
        } catch (err) {
            console.error(err);
            res.status(502).send("Failed to fetch from RAWG");
        }
    } else {
        res.status(400).send("Missing required query param!");
    }
}

module.exports = { searchGames };
