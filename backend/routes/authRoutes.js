const express = require("express");
const router = express.Router();

const { registerUser,loginUser } = require("../controller/authController");
// regiser routes
router.post("/register", registerUser);
// login routes
router.post("/login",loginUser)
module.exports = router;