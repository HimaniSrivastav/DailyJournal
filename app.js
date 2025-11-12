const express = require("express");
const { MongoClient } = require("mongodb");
const journalRoutes = require("./routes/journalRoutes");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const app = express();
const client = new MongoClient(uri);

// middleware, routes, etc.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
