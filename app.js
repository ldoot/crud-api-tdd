require("dotenv").config();
const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const mongodb = require("./mongodb/mongodb.connect");

// Setup express app
const app = express();

mongodb.connect();

app.use("/todos", todoRoutes);

app.get("/", (request, response) => {
  response.json("Hello world!");
});

app.listen(3000, () => {
  console.log("Server listening for requests.");
});

module.exports = app;
