const express = require("express");
const router = express.Router();
const path = require("path");

// Get /journal -> Show journal page
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "journal.html"));
});

// Post /journal -> Handle journal entry submission
router.post("/add", (req, res) => {
  const db = req.app.locals.db;
  const { title,entry } = req.body;

  if(!title || !entry ){
    return res.status(400).send("Title and Entry can't be empty");
  }
    db.collection('entries').insertOne({
      title,
      body: entry,
      date: new Date()
    }).then(() =>{
      console.log("EntryAdded");
      res.redirect("/journal");
    }).catch((err) => {
      console.error("Failed to add entry", err);
      res.status(500).send("Error adding entry");
    })
  
});

module.exports = router;  