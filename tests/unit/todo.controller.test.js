const todoController = require("../../controllers/todo.controller");
const todoModel = require("../../models/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");

//mocking the create Function using jest so that we will be able to see if the function gets called during one of our tests.
todoModel.create = jest.fn();
todoModel.find = jest.fn();

// Http objects for mocking during testing.
let req, res, next;

//Setup for each test
beforeEach(() => {
  // Configure http request and response objects as mocks
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("todoController.getTodos", () => {
  it("should have a createTodo function", () => {
    expect(typeof todoController.getTodos).toBe("function");
  });

  it("should call todoModel.find({})", async () => {
    await todoController.getTodos(req, res, next);
    expect(todoModel.find).toBeCalledWith({});
  });

  it("should return status code 200 and all todos", async () => {
    todoModel.find.mockReturnValue(allTodos);

    await todoController.getTodos(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allTodos);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Simulated error" };
    const rejectedPromise = Promise.reject(errorMessage);

    todoModel.find.mockReturnValue(rejectedPromise);
    await todoController.getTodos(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
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

  it("should handle errors", async () => {
    const errorMessage = { message: "Simulated error" };
    const rejectedPromise = Promise.reject(errorMessage);

    todoModel.create.mockReturnValue(rejectedPromise);
    await todoController.createTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
