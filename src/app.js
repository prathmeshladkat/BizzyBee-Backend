const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

//this middleware read json data convert to javascript oject and put it in req.body
app.use(express.json());

//Get user by email id
app.get("/user", async (req, res) => {
  const UserEmail = req.body.emailId;

  try {
    console.log(UserEmail);
    const users = await User.findOne({ emailId: UserEmail });
    if (!users) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }

    // try {
    //   const Users = await User.find({ emailId: UserEmail });
    //   if (Users.lenght === 0) {
    //     res.status(404).send("User not found");
    //   } else {
    //     res.send(Users);
    //   }
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

//API for getting all documents
//Use model.find() with empty filter to get all feed
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

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

//delete user api
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User got deleted!");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

//patch api
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data);
    console.log(user);
    res.send("user updated succesefully");
  } catch (err) {
    res.status(400).send("something went wrong");
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
