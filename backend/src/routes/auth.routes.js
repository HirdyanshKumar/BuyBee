const express = require("express");
const {
  signup,
  login,
  logout
} = require("../controllers/auth.controller");
const { verifyAuth } = require("../middlewares/auth.middleware");


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyAuth, logout);


module.exports = router;
