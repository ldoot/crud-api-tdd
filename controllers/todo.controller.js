const todoModel = require("../models/todo.model");

async function getTodos(req, res, next) {
  try {
    const todos = await todoModel.find({});
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
}

async function createTodo(req, res, next) {
  try {
    const createdModel = await todoModel.create(req.body);

    res.status(201).json(createdModel);
  } catch (err) {
    next(err);
  }
}

module.exports = { getTodos, createTodo };
