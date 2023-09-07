const todoController = require("../../controllers/todo.controller");
const todoModel = require("../../models/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");

//mocking the create Function using jest so that we will be able to see if the function gets called during one of our tests.
todoModel.create = jest.fn();

// Http objects for mocking during testing.
let req, res, next;

//Setup for each test
beforeEach(() => {
  // Configure http request and response objects as mocks
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("TodoController.createTodo", () => {
  beforeEach(() => {
    req.body = newTodo;
  });

  it("should have a createTodo function", () => {
    expect(typeof todoController.createTodo).toBe("function");
  });

  it("should call todoModel.create", () => {
    // Configure request body as a mock newTodo

    todoController.createTodo(req, res, next);
    expect(todoModel.create).toBeCalledWith(newTodo);
  });

  it("should return 201 response", async () => {
    await todoController.createTodo(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return JSON response body", async () => {
    todoModel.create.mockReturnValue(newTodo);

    await todoController.createTodo(req, res, next);

    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
});
