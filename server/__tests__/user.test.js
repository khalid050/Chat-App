const request = require("supertest");
const { app, startApp } = require("../server");
const User = require("../mongodb/models/user.model");
const jwt = require("jsonwebtoken");
const { setupFilesAfterEnv } = require("../../jest.config");
const mongoose = require("mongoose");
const { connect, options } = require("../mongodb/db.config");
connect(process.env.mongodbURI, options);

/**
 * user with existing account for login
 */
const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  firstName: "Jon",
  lastName: "Snow",
  email: "snow@example.com",
  password: "Somepass123",
  tokens: [
    {
      token: jwt.sign({ id: userOneId }, process.env.jwtKey),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/auth/sign-up")
    .send({
      firstName: "Arya",
      lastName: "Stark",
      email: "stark@example.com",
      password: "Somepass123",
    })
    .expect(201);

  const user = await User.findById(response.body.newUser._id);
  expect(user).not.toBeNull();
  expect(response.body).toMatchObject({
    newUser: {
      firstName: "Arya",
      lastName: "Stark",
    },
  });
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
