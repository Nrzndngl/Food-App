const mongoose = require("mongoose");

//function to connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error in MongoDB connection: ${error}`);
  }
};
//export the function
module.exports = connectDB;
