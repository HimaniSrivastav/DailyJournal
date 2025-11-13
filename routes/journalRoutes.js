const express = require("express");
const router = express.Router();
const path = require("path");
const { getJournal, addEntry, getAllEntries } = require("../controllers/journalController");
const { ensureLoggedIn } = require("../middleware/authMiddleware").ensureLoggedIn;

// Get /journal -> Show journal page
router.get("/", ensureLoggedIn, getJournal);
router.get("/all", ensureLoggedIn, getAllEntries);

// Post /journal -> Handle journal entry submission
router.post("/add", ensureLoggedIn, addEntry);

module.exports = router;  