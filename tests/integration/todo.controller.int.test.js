const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

// Used to test getTodoById
let firstTodo;

describe(endpointUrl, () => {
  it("POST " + endpointUrl, async () => {
    const res = await request(app).post(endpointUrl).send(newTodo);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe(newTodo.title);
    expect(res.body.done).toBe(newTodo.done);
  });

  it("should return code 500 on malformed POST data", async () => {
    const res = await request(app).post(endpointUrl).send({ title: "missing done property" });

    expect(res.statusCode).toBe(500);
    expect(res.body).toStrictEqual({ message: "Todo validation failed: done: Path `done` is required." });
  });

  it("GET " + endpointUrl, async () => {
    const res = await request(app).get(endpointUrl).send();

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].title).toBeDefined();
    expect(res.body[0].done).toBeDefined();
    firstTodo = res.body[0];
  });

  it("GET by id" + endpointUrl + ":todoId", async () => {
    const res = await request(app)
      .get(endpointUrl + firstTodo._id)
      .send();

    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.title).toBe(firstTodo.title);
    expect(res.body.done).toBe(firstTodo.done);
  });

  it("GET by id" + endpointUrl + ":todoId", async () => {
    const res = await request(app)
      .get(endpointUrl + firstTodo._id)
      .send();

    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.title).toBe(firstTodo.title);
    expect(res.body.done).toBe(firstTodo.done);
  });

  it("GET by todo by non existent id" + endpointUrl + ":todoId", async () => {
    const res = await request(app)
      .get(endpointUrl + "64f9d9959214a32bc5fc12fb")
      .send();

    expect(res.statusCode).toBe(404);
  });

  it("PUT " + endpointUrl, async () => {
    const testData = { title: "PUT test integration", done: true };
    const res = await request(app)
      .put(endpointUrl + "64f9e751c758eefbd0b0ba8e")
      .send(testData);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(testData.title);
    expect(res.body.done).toBe(testData.done);
  });
});
