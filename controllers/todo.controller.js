const todoModel = require("../models/todo.model");

async function createTodo(req, res, next) {
  try {
    const createdModel = await todoModel.create(req.body);

    res.status(201).json(createdModel);
  } catch (err) {
    next(err);
  }
}

module.exports = { createTodo };
