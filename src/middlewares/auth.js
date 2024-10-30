const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //getting token
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Token is Invalid!!!!");
    }

    //verifying token
    const decodedObj = await jwt.verify(token, "DEV@Tinder$798");

    //getting user data
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
};

module.exports = {
  userAuth,
};
