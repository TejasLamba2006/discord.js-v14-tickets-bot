const config = require(`../../botconfig/config.js`);
const ee = require(`../../botconfig/embed.js`);
const settings = require(`../../botconfig/settings.js`);
const {
  onCoolDown,
  replacemsg
} = require(`../../handlers/functions`);
const Discord = require(`discord.js`);
module.exports = async (client, message) => {
  if (!message.guild || !message.channel || message.author.bot) return;
  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();
  
}

function escapeRegex(str) {
  try {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  } catch {
    return str
  }
}
