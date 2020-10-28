const express = require("express");
const app = express();
const routes = require("./routes.js");
var fetch = require("node-fetch");

app.disable("x-powered-by");

app.set("trust proxy", function(ip) {
  return (/(10\.10\.([0-9]{1,3})\.([0-9]{1,3})|::ffff:127.0.0.1)/.test(ip));
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/404.html");
});

app.get("/*", (req, res) => {
  if (routes[req.path]) {
    var ip = req.ip;
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
  }
  console.log(`I just caught a user!\nTimestamp: ${Date.now()}]\nPath: ${req.path}`);
  res.status(404).sendFile(__dirname + "/pages/404.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Honeypot is listening on: " + listener.address().port);
});
