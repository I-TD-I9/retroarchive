"use strict";
const express = require("express");
const router = express.Router();
const archiveController = require("../controllers/archiveController");
const cors = require("cors");

const corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
};

router.use(cors(corsOptions));

router.get("/", archiveController.fetchArchive);
router.post("/", archiveController.addToArchive);
router.put("/:id", archiveController.updateArchiveItem);
router.delete("/:id", archiveController.removeFromArchive);

module.exports = router;
