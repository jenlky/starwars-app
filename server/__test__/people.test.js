const app = require("../src/app");
const request = require("supertest");

describe("People routes", () => {
  it("/GET should return the person data", async () => {
    const response = await request(app).get("/api/people/?name=luke");
    const data = JSON.parse(response.text)[0];

    expect(response.status).toBe(200);
    expect(data.name).toBe("Luke Skywalker");
    expect(data.height).toBe("172");
    expect(data.mass).toBe("77");
  });
});
