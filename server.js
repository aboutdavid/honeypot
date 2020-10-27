const express = require("express");
const app = express();
const routes = require("./routes.js");
var fetch = require("node-fetch");
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://database.sqlite');

async function update(){
  if (!await keyv.get('hp_counter')){
    await keyv.set('hp_counter', 0);
  }
  await keyv.set('hp_counter', await keyv.get('hp_counter') + 1);
}
async function get(){
  return await keyv.get('hp_counter');
}


keyv.on('error', err => console.log('Connection Error', err));

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/shields", (req, res) => {
  res.json(`{"schemaVersion": 1,"label": "IPs caught","message": ${get()},"color": "orange"}`)
});
app.get("/:route", (req, res) => {
  if (routes[req.params.route]) {
    var ip = "8.8.8.8";
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
        }
      }
    )
      .then(res => res.text())
      .then(body => console.log(body));
    update();
  }
  res.status(404).sendFile(__dirname + "/pages/404.html");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
