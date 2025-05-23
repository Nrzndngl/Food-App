const mongoose = require("mongoose");

//schemas
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    userType: {
      type: String,
      required: [true, "Please provide a user type"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    },
    answer: {
      type: String,
      required: [true, "Please provide an answer"],
    },
  },
  {
    timestamps: true,
  }
);

//export the model
module.exports = mongoose.model("User", userSchema);
