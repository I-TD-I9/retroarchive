"use strict";
const fetch = require("node-fetch");

const RETRO_PLATFORMS = "49,79,83,26,43,24,9,8,105,11,167,107,106,74,77,27,15,17,80,23";

async function searchGames(q, platform) {
    const params = new URLSearchParams({
        key: process.env.RAWG_API_KEY,
        search: q,
        platforms: platform || RETRO_PLATFORMS,
        page_size: 30
    });
    const response = await fetch(`https://api.rawg.io/api/games?${params}`);
    if (!response.ok) throw new Error("RAWG API error");
    const data = await response.json();
    return data.results.map(g => ({
        id: String(g.id),
        name: g.name,
        image: g.background_image,
        released: g.released,
        platforms: g.platforms ? g.platforms.map(p => p.platform.name) : []
    }));
}

async function getGameById(id) {
    const params = new URLSearchParams({ key: process.env.RAWG_API_KEY });
    const response = await fetch(`https://api.rawg.io/api/games/${id}?${params}`);
    if (!response.ok) throw new Error("RAWG API error");
    const data = await response.json();
    return {
        id: String(data.id),
        name: data.name,
        image: data.background_image,
        released: data.released,
        rating: data.rating,
        description: data.description_raw,
        platforms: data.platforms ? data.platforms.map(p => p.platform.name) : [],
        genres: data.genres ? data.genres.map(g => g.name) : []
    };
}

module.exports = { searchGames, getGameById };
