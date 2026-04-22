"use strict";
const pool = require("./dbConnection");

async function getUserByEmail(email) {
    let queryText = "SELECT * FROM users WHERE email = $1";
    let values = [email];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function addUser(username, email, passwordHash) {
    let queryText = "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username";
    let values = [username, email, passwordHash];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = { getUserByEmail, addUser };
