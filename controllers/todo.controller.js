const todoModel = require("../models/todo.model");

function createTodo() {
  todoModel.create();
}

module.exports = { createTodo };
