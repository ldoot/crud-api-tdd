const todoController = require("../../controllers/todo.controller");
const todoModel = require("../../models/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");

//mocking the create Function using jest so that we will be able to see if the function gets called during one of our tests.
todoModel.create = jest.fn();
todoModel.find = jest.fn();
todoModel.findById = jest.fn();
todoModel.findByIdAndUpdate = jest.fn();
todoModel.findByIdAndDelete = jest.fn();

// Http objects for mocking during testing.
let req, res, next;

// Used to test getTodoById
const validTodoId = "64f9d9959214a32bc5fc12fa";

//Setup for each test
beforeEach(() => {
  // Configure http request and response objects as mocks
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("todoController.updateTodo", () => {
  it("should have an updateTodo function", () => {
    expect(typeof todoController.updateTodo).toBe("function");
  });

  it("should call findByIdAndUpdate", async () => {
    req.params.todoId = validTodoId;
    req.body = newTodo;
    await todoController.updateTodo(req, res, next);
    expect(todoModel.findByIdAndUpdate).toBeCalledWith(validTodoId, newTodo, { new: true, useFindAndModify: false });
  });

  it("should return 200 and JSON body", async () => {
    req.params.todoId = validTodoId;
    req.body = newTodo;
    todoModel.findByIdAndUpdate.mockReturnValue(newTodo);
    await todoController.updateTodo(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData().title).toBe(newTodo.title);
    expect(res._getJSONData().done).toBe(newTodo.done);
    expect(res._isEndCalled()).toBe(true);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Simulated error" };
    const rejectedPromise = Promise.reject(errorMessage);

    todoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);

    req.params.todoId = validTodoId;
    req.body = newTodo;

    await todoController.updateTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });

  it("should return 404 for non existent todo id", async () => {
    todoModel.findByIdAndUpdate.mockReturnValue(null);

    req.params.todoId = validTodoId;
    req.body = newTodo;

    await todoController.updateTodo(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled).toBeTruthy();
  });
});

describe("todoController.getTodoById", () => {
  it("should have getTodoById", () => {
    expect(typeof todoController.getTodoById).toBe("function");
  });

  it("should call todoModel.findById with route parameters", async () => {
    req.params.todoId = validTodoId;
    await todoController.getTodoById(req, res, next);
    expect(todoModel.findById).toBeCalledWith(validTodoId);
  });

  it("should return JSON body and response code 200", async () => {
    req.params.todoId = validTodoId;
    todoModel.findById.mockReturnValue(newTodo);
    await todoController.getTodoById(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();

    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Simulated error" };
    const rejectedPromise = Promise.reject(errorMessage);

    todoModel.findById.mockReturnValue(rejectedPromise);
    await todoController.getTodoById(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });

  it("should return 404 when item does not exist", async () => {
    todoModel.findById.mockReturnValue(null);
    await todoController.getTodoById(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled).toBeTruthy();
  });
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

describe("todoController.deleteTodo", () => {
  it("should have deleteTodo function", () => {
    expect(typeof todoController.deleteTodo).toBe("function");
  });

  it("should call todoModel.deleteTodo", () => {
    // Configure request body as a mock newTodo

    req.params.todoId = validTodoId;

    todoController.deleteTodo(req, res, next);
    expect(todoModel.findByIdAndDelete).toBeCalledWith(validTodoId);
  });

  it("should return 200 response", async () => {
    req.params.todoId = validTodoId;
    todoModel.findByIdAndDelete.mockReturnValue(newTodo);
    await todoController.deleteTodo(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Simulated error" };
    const rejectedPromise = Promise.reject(errorMessage);

    todoModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await todoController.deleteTodo(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });

  it("should return 404 when item does not exist", async () => {
    todoModel.findByIdAndDelete.mockReturnValue(null);
    req.params.todoId = validTodoId;
    await todoController.deleteTodo(req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled).toBeTruthy();
  });
});
