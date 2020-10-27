const express = require("express");
const app = express();
const routes = require("./routes.js");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/:route", (req, res) => {
  if (routes[req.params.route]) {
    res.status(404).sendFile(__dirname + "/pages/404.html")
    console.log(req.ip.replace(/::ffff:/gm, ""))
  } else {
    res.send("Not found. Sorry :/");
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
