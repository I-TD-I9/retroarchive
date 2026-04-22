"use strict";
const pool = require("./dbConnection");

async function getArchive() {
    let queryText = "SELECT * FROM archive ORDER BY created_at DESC";
    const result = await pool.query(queryText);
    return result.rows;
}

async function addToArchive(gameId, gameName, gameImage, rating, notes) {
    let queryText = `
        INSERT INTO archive (game_id, game_name, game_image, rating, notes)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (game_id) DO UPDATE SET rating = $4, notes = $5
        RETURNING *`;
    let values = [gameId, gameName, gameImage, rating, notes];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function updateArchiveItem(id, rating, notes) {
    let queryText = "UPDATE archive SET rating = $1, notes = $2 WHERE id = $3 RETURNING *";
    let values = [rating, notes, id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function deleteFromArchive(id) {
    let queryText = "DELETE FROM archive WHERE id = $1";
    let values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

module.exports = { getArchive, addToArchive, updateArchiveItem, deleteFromArchive };
