const dotenv = require("dotenv"); // Load .env variables
const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const cors = require("cors");

dotenv.config();

//this middleware read json data convert to javascript oject and put it in req.body
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); //middleware to read cookie

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.log("ERROR : " + err.message);
    console.error("Database cannot be connected!!");
  });
