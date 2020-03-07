const express = require("express");
const router = new express.Router();
const {
  signUp,
  login,
  getUsers,
  auth,
  authOwnProfile,
  logout,
  logOutAll,
  deleteAccount,
  updateAccount
} = require("../controllers/user/user.auth");

router.post("/auth/sign-up", signUp);
router.post("/auth/log-in", login);
router.post("/auth/log-out", auth, logout);
router.post("/auth/log-out-all", auth, logOutAll);

router.delete("/auth/me", auth, deleteAccount);
router.patch("/auth/me", auth, updateAccount);

router.get("/auth/get-users", auth, getUsers);
router.get("/auth/me", auth, authOwnProfile);

module.exports = router;
