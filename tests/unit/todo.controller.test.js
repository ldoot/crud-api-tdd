const todoController = require("../../controllers/todo.controller");
const todoModel = require("../../models/todo.model");

//mocking the create Function using jest so that we will be able to see if the function gets called during one of our tests.
todoModel.create = jest.fn();

describe("TodoController.createTodo", () => {
  it("should have a createTodo function", () => {
    expect(typeof todoController.createTodo).toBe("function");
  });

  it("should call todoModel.create", () => {
    todoController.createTodo();
    expect(todoModel.create).toBeCalled();
  });
});
