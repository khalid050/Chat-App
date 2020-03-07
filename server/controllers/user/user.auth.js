const User = require("../../mongodb/models/user.model");
const { jwtKey, jwtExp } = require("../../config/dev").secrets;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  signUp: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    let credentials = {
      firstName,
      lastName,
      email,
      password
    };

    User.findOne({ email }, async (err, user) => {
      try {
        if (user) {
          res.send({ status: "Account already exists" }).status(401);
        } else {
          const newUser = new User(credentials);
          await newUser.save();
          const token = await newUser.generateJwt();
          res.cookie("auth_token", token);
          res.send({ newUser, token }).status(201);
        }
      } catch (err) {
        res.status(500).send({ status: "Could not log request" });
      }
    });
  },

  auth: async (req, res, next) => {
    try {
      const token = req.cookies["auth_token"];
      const decoded = jwt.verify(token, jwtKey);
      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token
      });
      if (!user) {
        throw new Error();
      }
      req.user = user;
      req.token = token;
      next();
    } catch (err) {
      res.status(401).send({ error: "Cannot authenticate" });
    }
  },

  authOwnProfile: async (req, res) => {
    res.send(req.user);
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (err) {
      res.status(500).send("Cannot get users");
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    try {
      if (!user) {
        throw new Error("Unable to login");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Unable to login");
      } else {
        const token = await user.generateJwt();
        res.cookie("auth_token", token);
        res.status(200).send({ user, token });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("Unable to login");
    }
  },

  logout: async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter(
        token => token.token !== req.token
      );
      await req.user.save();
      res.status(200).send();
    } catch (error) {
      res.status(500).send();
    }
  },

  logOutAll: async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.status(200).send();
    } catch (err) {
      res.status(500).send();
    }
  },
  deleteAccount: async (req, res) => {
    try {
      await req.user.remove();
      res.send(req.user);
    } catch (err) {
      res.status(500).send();
    }
  },

  updateAccount: async (req, res) => {
    try {
    } catch (err) {}
  }
};
