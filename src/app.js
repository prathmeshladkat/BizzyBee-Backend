const cookieParser = require("cookie-parser");
const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const cors = require("cors");
require("dotenv").config; // Load .env variables
const http = require("http");

//this middleware read json data convert to javascript oject and put it in req.body
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "http://13.49.223.147", // ✅ Add your EC2 frontend URL
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser()); //middleware to read cookie

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user.js");
const { Socket } = require("socket.io");
const initializeSocket = require("./utils/socket.js");
const chatRouter = require("./routes/chat.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.log("ERROR : " + err.message);
    console.error("Database cannot be connected!!");
  });
