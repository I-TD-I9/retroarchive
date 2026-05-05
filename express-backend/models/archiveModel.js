"use strict";
const pool = require("./dbConnection");

async function getArchive(userId) {
    let queryText = "SELECT * FROM archive WHERE user_id = $1 ORDER BY created_at DESC";
    let values = [userId];
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function addToArchive(userId, gameId, gameName, gameImage, rating, notes) {
    let queryText = `
        INSERT INTO archive (user_id, game_id, game_name, game_image, rating, notes)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (user_id, game_id) DO UPDATE SET rating = $5, notes = $6
        RETURNING *`;
    let values = [userId, gameId, gameName, gameImage, rating, notes];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function updateArchiveItem(userId, id, rating, notes) {
    let queryText = "UPDATE archive SET rating = $1, notes = $2 WHERE id = $3 AND user_id = $4 RETURNING *";
    let values = [rating, notes, id, userId];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function deleteFromArchive(userId, id) {
    let queryText = "DELETE FROM archive WHERE id = $1 AND user_id = $2";
    let values = [id, userId];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

module.exports = { getArchive, addToArchive, updateArchiveItem, deleteFromArchive };
