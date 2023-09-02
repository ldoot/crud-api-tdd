const todoModel = require("../models/todo.model");

function createTodo(req, res, next) {
  todoModel.create(req.body);
  res.status(201).send();
}

module.exports = { createTodo };
