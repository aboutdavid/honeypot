const webhook = require("webhook-discord");

function send(date, path, desc, ip) {
  const Hook = new webhook.Webhook(
    process.env.DISCORD_WEBHOOK_URL
  );

  const msg = new webhook.MessageBuilder()
    .setName("🍯 Honeypot")
    .setAvatar("https://cdn.glitch.com/537cbe72-dd73-4c34-85f2-17ded30cfc72%2Fhoney.png?v=1603902491080")
    .setColor("#00fa9a")
    .setAuthor("🍯 Honeypot", "https://cdn.glitch.com/537cbe72-dd73-4c34-85f2-17ded30cfc72%2Fhoney.png?v=1603902491080", "https://github.com/aboutdavid/honeypot")
    .addField("IP address:", ip, false)
    .addField("Trap URL:", path, false)
    .addField("Description of trap:", desc, false)
    .setFooter(`Attacked recorded on: ${date}`, null);
  Hook.send(msg);
}
module.exports = { send };

