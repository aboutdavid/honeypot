const webhook = require("webhook-discord");

function send(date, path, desc, ip) {
  const Hook = new webhook.Webhook(
    process.env.DISCORD_WEBHOOK_URL
  );

  const msg = new webhook.MessageBuilder()
    .setName("🍯 Honeypot")
    .setColor("#00fa9a")
    .setAuthor("🍯 Honeypot", null, "https://github.com/aboutdavid/honeypot")
    .addField("IP address:", ip, false)
    .addField("Trap URL:", path, false)
    .addField("Description of trap:", desc, false)
    .setFooter(`Attacked recorded on: ${date}`, null);
  Hook.send(msg);
}
module.exports = { send };

