const express = require("express");
const session = require("express-session");
const { MongoClient } = require("mongodb");
const journalRoutes = require("./routes/journalRoutes");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const app = express();
const client = new MongoClient(uri);

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {secure : false}
}));
// middleware, routes, etc.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/test-session", (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }
  res.send(`Session working! You visited ${req.session.views} times`);
});
app.use(express.static(path.join(__dirname, "public")));

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");

    // attach db to app.locals so routes can access it:
    app.locals.db = client.db("dailyjournal");

    // Routes
    app.get(["/", "/home"], (req, res) => {
      res.sendFile(path.join(__dirname, "views", "home.html"));
    });
    app.use("/journal", journalRoutes);
    app.use("/user", userRoutes);

    // Not Found page
    app.use((req, res) => {
      res.status(404).sendFile(path.join(__dirname, "views", "notfound.html"));
    });
    // start server after DB connection
    app.listen(process.env.PORT, () =>
      console.log(`Server running on ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
