const express = require("express");

// Setup express app
const app = express();

app.get("/", (request, response) => {
  response.json("Hello world!");
});

app.listen(3000, () => {
  console.log("Server listening for requests.");
});
