const express = require("express");
const {
  signup,
  login,
  logout
} = require("../controllers/auth.controller");
const { verifyAuth } = require("../middlewares/auth.middleware");


const router = express.Router();

router.post("/signup", authRateLimiter, signup);
router.post("/login", authRateLimiter, login);
router.post("/logout", verifyAuth, logout);


module.exports = router;
