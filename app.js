require("dotenv").config();
const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const mongodb = require("./mongodb/mongodb.connect");

// Setup express app
const app = express();

mongodb.connect();

app.use(express.json());

app.use("/todos", todoRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.get("/", (request, response) => {
  response.json("Hello world!");
});

module.exports = app;
