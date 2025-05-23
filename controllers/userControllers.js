const userModel = require("../models/userModel");

//GET USER INFO
const getUserControllers = async (req, res) => {
  try {
    //find user
    const user = await userModel.findOne({ _id: req.body.id });
    // validation
    if (!user) {
      return res.status(404).send({ message: "User not found", sucess: false });
    }
    // hide password
    user.password = undefined;
    //response
    res.status(200).send({ user, message: "User found", sucess: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong", sucess: false, error });
  }
};

//UPDATE USER
const updateUserControllers = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    // validation
    if (!user) {
      return res.status(404).send({ message: "User not found", sucess: false });
    }
    //update user
    const { userName, phone, address } = req.body;
    if (userName) user.userName = userName;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    //save
    await user.save();
    //response
    res.status(200).send({ message: "User updated", sucess: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong", sucess: false, error });
  }
};

// UPDATE USER PASSWORR
const updatePasswordControllers = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New PasswOrd",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};

// RESET PASSWORd
const resetPasswordControllers = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Privide All Fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found or invlaid answer",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in PASSWORD RESET API",
      error,
    });
  }
};

// DLEETE PROFILE ACCOUNT
const deleteProfileControllers = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Delete Profile API",
      error,
    });
  }
};

module.exports = {
  getUserControllers,
  updateUserControllers,
  updatePasswordControllers,
  resetPasswordControllers,
  deleteProfileControllers,
};
