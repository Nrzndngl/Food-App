const express = require("express");
const {
  registerControllers,
  loginControllers,
} = require("../controllers/authControllers");

const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", registerControllers);

//LOGIN || POST
router.post("/login", loginControllers);

module.exports = router;
