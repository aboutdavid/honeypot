const express = require("express");
const app = express();
const routes = require("./routes.js");
var fetch = require("node-fetch");
var config = require("./config.js");

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/404.html");
});

app.get("/*", (req, res) => {
  if (routes[req.originalUrl]) {
    var ip = "";
    if (config.usingGlitch === true) {
      ip = req.headers["x-forwarded-for"].split(",")[0];
    } else {
      ip = req.ip;
    }
    if (config.whitelistedIPs.includes(ip)) {
      res.status(200).send("OK!");
      return;
    }
    fetch(
      `https://api.abuseipdb.com/api/v2/report?categories=${
        routes[req.originalUrl][0]
      }&ip=${ip}&comment=${config.prefix}${routes[req.originalUrl][1]}`,
      {
        method: "POST",
        headers: {
          Key: process.env.ABUSEIPDB_API_KEY,
          Accept: "application/json"
        }
      }
    );
    console.log(
      `I just caught a user!\nTimestamp: ${Date.now()}\nPath: ${
        req.originalUrl
      }\nDescription: ${routes[req.originalUrl][1]}`
    );
    if (config.webhookEnabled == true) {
      require("./webhooks.js").send(
        new Date().toString(),
        req.originalUrl,
        routes[req.originalUrl][1],
        ip
      );
    }
  }

  res.status(200).send("OK!");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Honeypot is listening on port: " + listener.address().port);
});
