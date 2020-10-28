const webhook = require("webhook-discord");

function send(date, path, desc, ip){
const Hook = new webhook.Webhook("https://discord.com/api/webhooks/771035146115481630/DY6_A9MS0lgNsBMrMkauynW9OaUYIwofSqVA4SSVB2Ly9IBlbeNlxyIc7-CmFrz-fpIs");
 
const msg = new webhook.MessageBuilder()
                .setName("🍯 Honeypot")
                .setColor("#00fa9a")
                .setText("This is my webhook!");
Hook.send(msg); 
}
module.exports = {send}
send();