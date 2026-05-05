//server.js
"use strict";
const express = require("express");
const app = express();
app.set('trust proxy', 1);

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require('dotenv').config();

const session = require('express-session');
const passport = require('passport');
require('./auth/passport');
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


const cors = require('cors');
app.use(
    cors({
        origin: process.env.CLIENT_BASE_URL, // Vite frontend URL
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
    })
);

const path = require("path");

const gamesRoutes = require('./routes/gamesRoutes');
const archiveRoutes = require('./routes/archiveRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/games', gamesRoutes);
app.use('/api/archive', archiveRoutes);
app.use('/users', userRoutes);
app.use('/auth', require('./auth/authRoute'));

const clientDist = path.join(__dirname, "..", "react-frontend-client", "dist");
app.use(express.static(clientDist));
app.get("*", (req, res) => res.sendFile(path.join(clientDist, "index.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});
