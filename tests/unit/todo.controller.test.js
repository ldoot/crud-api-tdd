const todoController = require("../../controllers/todo.controller");
const todoModel = require("../../models/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");

//mocking the create Function using jest so that we will be able to see if the function gets called during one of our tests.
todoModel.create = jest.fn();

describe("TodoController.createTodo", () => {
  it("should have a createTodo function", () => {
    expect(typeof todoController.createTodo).toBe("function");
  });

  it("should call todoModel.create", () => {
    let req, res, next;

    // Configure http request and response objects as mocks
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;

    // Configure request body as a mock newTodo
    req.body = newTodo;

    todoController.createTodo(req, res, next);
    expect(todoModel.create).toBeCalledWith(newTodo);
  });
});
