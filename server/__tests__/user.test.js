const request = require("supertest");
const { app, startApp } = require("../server");
const User = require("../mongodb/models/user.model");

const { setupFilesAfterEnv } = require("../../jest.config");

const { connect, options } = require("../mongodb/db.config");
connect(process.env.mongodbURI, options);

/**
 * user with existing account for login
 */
const userOne = {
  firstName: "Jon",
  lastName: "Snow",
  email: "snow@example.com",
  password: "Somepass123",
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/auth/sign-up")
    .send({
      firstName: "Arya",
      lastName: "Stark",
      email: "stark@example.com",
      password: "Somepass123",
    })
    .expect(201);
});

test("should login existing user", async () => {
  await request(app)
    .post("/auth/log-in")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("should send error if account does not exist on login attempt", async () => {
  await request(app)
    .post("/auth/log-in")
    .send({
      email: userOne.email,
      password: "wrong password",
    })
    .expect(401);
});
