const todoModel = require("../models/todo.model");

async function createTodo(req, res, next) {
  const createdModel = await todoModel.create(req.body);

  res.status(201).json(createdModel);
}

module.exports = { createTodo };
