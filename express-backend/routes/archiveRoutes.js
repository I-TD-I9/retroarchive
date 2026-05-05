"use strict";
const express = require("express");
const router = express.Router();
const archiveController = require("../controllers/archiveController");

router.get("/", archiveController.fetchArchive);
router.post("/", archiveController.addToArchive);
router.put("/:id", archiveController.updateArchiveItem);
router.delete("/:id", archiveController.removeFromArchive);

module.exports = router;
