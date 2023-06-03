const express = require("express");
const router = express.Router();

//controller functions
const {
  findUser,
  loginUser,
  signupUser,
} = require("../controllers/userController");

//find user route
router.post("/finduser", findUser);

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

module.exports = router;
