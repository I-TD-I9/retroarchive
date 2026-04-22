"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const pool = require("./models/dbConnection");

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const gamesRoutes = require("./routes/gamesRoutes");
const archiveRoutes = require("./routes/archiveRoutes");

app.use("/api/games", gamesRoutes);
app.use("/api/archive", archiveRoutes);

// Serve built React app in production
const clientDist = path.join(__dirname, "..", "react-frontend-client", "dist");
app.use(express.static(clientDist));
app.get("*", (req, res) => res.sendFile(path.join(clientDist, "index.html")));

// Create table on startup if it doesn't exist, and migrate old schema if needed
pool.query(`
    CREATE TABLE IF NOT EXISTS archive (
        id SERIAL PRIMARY KEY,
        game_id VARCHAR(100) NOT NULL,
        game_name VARCHAR(255) NOT NULL,
        game_image VARCHAR(500),
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW()
    );
    ALTER TABLE archive DROP COLUMN IF EXISTS user_id;
    CREATE UNIQUE INDEX IF NOT EXISTS archive_game_id_idx ON archive (game_id);
`).catch(err => console.error("DB setup error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log("Server listening on port: " + PORT + "!");
});
