const path = require("path");

const getJournal = (req, res) =>{
  res.sendFile(path.join(__dirname, "../views", "journal.html"));  
};

const addEntry = (req,res) =>{
  const db = req.app.locals.db; 
  const { title,entry } = req.body;

  if(!title || !entry ){
    return res.status(400).send("Title and Entry can't be empty");
  }
  db.collection("entries").
  insertOne({
    title,
    body: entry,
    date: new Date()
  }).then(()=>{
    res.redirect("/journal");
  }).catch((err) =>{
    console.log("Failed to add entry", err);  
  });
}

const getAllEntries = (req, res) =>{
  const db = req.app.locals.db;
  db.collection("entries").find().sort({date: -1}).toArray()
  .then((entries) =>{
    // send entries as JSON
    res.json(entries);
  }).catch((err) =>{
    console.log("Failed to fetch entries", err);
    res.status(500).send("Failed to fetch entries");
  })
}

module.exports = {
  getJournal,
  addEntry,
  getAllEntries
}
