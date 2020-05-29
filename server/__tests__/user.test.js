const request = require("supertest");
const { app, startApp } = require("../server");

const { setupFilesAfterEnv } = require("../../jest.config");

startApp();

test("Should signup a new user", async () => {
  await request(app)
    .post("/auth/sign-up")
    .send({
      firstName: "Jon",
      lastName: "Snow",
      email: "snow1@example.com",
      password: "Somepass123",
    })
    .expect(201);
});
