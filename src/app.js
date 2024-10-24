const express = require("express");

const app = express();

//request handler
//can take path and function as input
app.use("/test", (req, res) => {
  res.send("hello behen ke lode");
});

app.listen(3000, () => {
  console.log("Your server runnning succesfully...");
});
