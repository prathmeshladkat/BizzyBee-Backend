const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://PrathmeshLadkat:CS8aSruEaTdRsoT5@devtinder.yt2de.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
