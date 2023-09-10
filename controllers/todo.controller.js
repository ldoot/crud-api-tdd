const todoModel = require("../models/todo.model");

async function updateTodo(req, res, next) {
  try {
    const result = await todoModel.findByIdAndUpdate(req.params.todoId, req.body, { new: true, useFindAndModify: false });

    // If id was not found.
    if (!result) {
      res.status(404);
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
}

async function getTodoById(req, res, next) {
  try {
    const todo = await todoModel.findById(req.params.todoId);

    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
}

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

async function deleteTodo(req, res, next) {
  try {
    console.log("todo id is ", req.params.todoId);
    const result = await todoModel.findByIdAndDelete(req.params.todoId);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { getTodoById, getTodos, createTodo, updateTodo, deleteTodo };
