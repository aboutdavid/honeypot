const express = require("express");
const app = express();
const routes = require("./routes.js");
var fetch = require("node-fetch");
var config = require("./config.js");

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/404.html");
  console.log(req.headers["x-forwarded-for"]);
});

app.get("/*", (req, res) => {
  if (routes[req.path]) {
    var ip = "";
    if (config.usingGlitch === true) {
      ip = req.headers["x-forwarded-for"].split(",")[0];
    } else {
      ip = req.ip;
    }
    if (config.whitelistedIPs.includes(ip)){
      res.status(404).sendFile(__dirname + "/pages/404.html");
      return;
    }
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
    );
  }
  console.log(
    `I just caught a user!\nTimestamp: ${Date.now()}\nPath: ${req.path}`
  );
  res.status(404).sendFile(__dirname + "/pages/404.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Honeypot is listening on: " + listener.address().port);
});
