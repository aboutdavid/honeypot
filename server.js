const express = require("express");
const app = express();
const routes = require("./routes.js");
var fetch = require("node-fetch");

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/404.html");
});

app.get("/*", (req, res) => {
  if (routes[req.path]) {
    var ip = "8.8.8.1";
    console.log(ip);
    fetch(
      `https://api.abuseipdb.com/api/v2/report?categories=${
        routes[req.path][0]
      }&ip=${ip}&comment=${routes[req.path][1]}`,
      {
        method: "POST",
        headers: {
          Key: process.env.ABUSEIPDB_API_KEY,
          Accept: "application/json"
        }
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
