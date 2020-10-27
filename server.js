const express = require("express");
const app = express();
const routes = require("./routes.js");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/:route", (req, res) => {
  if (routes[req.params.route]) {
    res.send("").status(500)
  } else {
    res.send("Not found. Sorry :/");
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
