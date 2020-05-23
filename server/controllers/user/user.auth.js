const User = require("../../mongodb/models/user.model");
const { jwtKey } = require("../../config/dev").secrets;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  signUp: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    let credentials = {
      firstName,
      lastName,
      email,
      password,
    };

    User.findOne({ email }, async (err, user) => {
      try {
        if (user) {
          res.send({ error: "Account already exists" }).status(401);
        } else {
          const newUser = new User(credentials);
          await newUser.save();
          const token = await newUser.generateJwt();
          res.send({ newUser, token }).status(201);
        }
      } catch (err) {
        res.status(500).send({ error: "Could not log request" });
      }
    });
  },

  auth: async (req, res, next) => {
    try {
      const token = req.cookies["auth_token"];
      if (!token) return;
      const decoded = jwt.verify(token, jwtKey);
      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });
      if (!user) {
        res.status(404).send({ error: "Cannot authenticate user" });
      }
      req.user = user;
      req.token = token;
      next();
    } catch (err) {
      res
        .status(401)
        .send({ error: "Something went wront during authentication" });
    }
  },

  authOwnProfile: async (req, res) => {
    res.send(req.user);
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email });

    try {
      if (!user) {
        res.status(401).send({ error: "Account does not exist" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(500).send({ error: "Email and/or password is incorrect" });
      } else {
        const token = await user.generateJwt();
        res.cookie("auth_token", token);
        res.status(200).send({ user, token });
      }
    } catch (error) {
      res.status(500).send({ error: "Something went wrong during login" });
    }
  },

  logout: async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(
        (token) => token.token !== req.token
      );
      await req.user.save();
      res.status(200).send();
    } catch (error) {
      res.status(500).send({ error: "Error during logout" });
    }
  },

  logOutAll: async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.status(200).send({ message: "User is logged out of all devices" });
    } catch (err) {
      res.status(500).send({ message: "Error duing logout" });
    }
  },
};
