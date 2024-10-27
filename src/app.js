const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

//this middleware read json data convert to javascript oject and put it in req.body
app.use(express.json());

app.post("/signup", async (req, res) => {
  //Creating a new instance of the User Model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("user added succesfully...");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Your server runnning succesfully...");
    });
  })
  .catch((err) => {
    console.error("somethimg went wrong...");
  });
