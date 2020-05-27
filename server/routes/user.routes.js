const express = require("express");
const router = new express.Router();
const {
  signUp,
  login,
  auth,
  authOwnProfile,
  logout,
  logOutAll,
} = require("../controllers/user/user.auth");

router.post("/auth/sign-up", signUp);
router.post("/auth/log-in", login);
router.post("/auth/log-out", auth, logout);
router.post("/auth/log-out-all", auth, logOutAll);

router.get("/auth/me", auth, authOwnProfile);

module.exports = router;
 