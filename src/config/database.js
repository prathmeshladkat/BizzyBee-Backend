const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  await mongoose.connect(
    process.env.MONGO_URI
    //"mongodb+srv://PrathmeshLadkat:CS8aSruEaTdRsoT5@devtinder
  );
};

module.exports = connectDB;
