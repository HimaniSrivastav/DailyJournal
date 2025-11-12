const express = require("express");
const router = express.Router();
const path = require("path");
const { getJournal, addEntry, getAllEntries } = require("../controllers/journalController");

// Get /journal -> Show journal page
router.get("/", getJournal);
router.get("/all", getAllEntries);

// Post /journal -> Handle journal entry submission
router.post("/add", addEntry);

module.exports = router;  