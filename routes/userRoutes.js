const express = require("express");
const {
  getUserControllers,
  updateUserControllers,
  updatePasswordControllers,
  resetPasswordControllers,
} = require("../controllers/userControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
//GET USER || GET
router.get("/getUser", authMiddleware, getUserControllers);

// UPDATE USER || POST
router.put("/updateUser", authMiddleware, updateUserControllers);

// password update
router.post("/updatePassword", authMiddleware, updatePasswordControllers);

//RESET PASSWORD
router.post("/resetPassword", authMiddleware, resetPasswordControllers);

module.exports = router;
