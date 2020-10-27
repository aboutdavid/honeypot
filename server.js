const express = require("express");
const app = express();
const routes = require("./routes.js");

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/:route", (req, res) => {
  if (routes[req.params.route]) {
    var ip = req.ip.replace(/::ffff:/gm, "");
    res.status(404).sendFile(__dirname + "/pages/404.html");
    var fetch = require("node-fetch");
    console.log(ip)
    var body = JSON.stringify({categories: routes[req.params.route][0], "ip": ip, "comment": routes[req.params.route][2]})
    console.log(body)
    fetch(1https://api.abuseipdb.com/api/v2/report", {
      method: "POST",
      headers: {
        Key: process.env.ABUSEIPDB_API_KEY,
        Accept: "application/json"
      },
      body: body
    }).then(res => res.text()).then(body => console.log(body));
  } else {
    res.send("Not found. Sorry :/");
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
