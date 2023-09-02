const todoModel = require("../models/todo.model");

function createTodo(req, res, next) {
  const createdModel = todoModel.create(req.body);

  res.status(201).json(createdModel);
}

module.exports = { createTodo };
