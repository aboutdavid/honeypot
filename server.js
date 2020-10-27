const express = require("express");
const app = express();
const routes = require("./routes.js");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/:route", (req, res) => {
  console.log(routes[req.query.route][0])
  if (routes[req.query.route]) {
    res.send(routes[req.query.route][1])
    
  } else {
    res.send("Not found. Sorry :/");
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
