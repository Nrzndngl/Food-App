const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//REGISTER
const registerControllers = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    // validation
    if (!userName || !email || !password || !phone || !address || !answer) {
      return res
        .status(500)
        .send({ message: "Please fill all the fields", sucess: false });
    }
    //check user already exist
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res
        .status(500)
        .send({ message: "Email already exist", sucess: false });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //create  new user
    const user = await userModel.create({
      userName,
      email,
      password: hashPassword,
      phone,
      address,
      answer,
    });
    res
      .status(201)
      .send({ message: "User registered successfully", sucess: true, user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error in register", sucess: false, error });
  }
};

//LOGIN
const loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res
        .status(500)
        .send({ message: "Please fill all the fields", sucess: false });
    }
    //check user already exist
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found", sucess: false });
    }
    //check password | compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(500)
        .send({ message: "Invalid credentials", sucess: false });
    }
    //create token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      message: "User logged in successfully",
      sucess: true,
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in login", sucess: false, error });
  }
};

module.exports = { registerControllers, loginControllers };
