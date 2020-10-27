const express = require("express");
const app = express();
const routes = require("./routes.js");
var fetch = require("node-fetch");

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/:route", (req, res) => {
  if (routes[req.params.route]) {
    var ip = "10.0.0.1";
    console.log(ip);
    fetch(
      `https://api.abuseipdb.com/api/v2/report?categories=${
        routes[req.params.route][0]
      }&ip=${ip}&comment=${routes[req.params.route][1]}`,
      {
        method: "POST",
        headers: {
          Key: process.env.ABUSEIPDB_API_KEY,
          Accept: "application/json"
        },
        body: ""
      }
    )
      .then(res => res.text())
      .then(body => console.log(body));
  }
  res.status(404).sendFile(__dirname + "/pages/404.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
