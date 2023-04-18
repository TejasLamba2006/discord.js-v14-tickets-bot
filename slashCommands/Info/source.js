const {
  EmbedBuilder
} = require("discord.js");
const config = require("../../botconfig/config.js");
var ee = require("../../botconfig/embed.js");
const settings = require("../../botconfig/settings.js");
module.exports = {
  name: "source", //the command name for execution & for helpcmd [OPTIONAL]
  category: "Info",
  cooldown: 5, //the command cooldown for execution & for helpcmd [OPTIONAL]
  description: "Sends you Source Code Information", //the command description for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, interaction) => {
    try {
      //things u can directly access in an interaction!
      const {
        member,
        channelId,
        guildId,
        applicationId,
        commandName,
        deferred,
        replied,
        ephemeral,
        options,
        id,
        createdTimestamp
      } = interaction;
      const {
        guild
      } = member;
      interaction.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder().setColor(ee.color)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon})
          .setDescription(`**WHEN YOU USE THE SOURCE CODE, __GIVE CREDITS__!** :heart:\n\n[Link to Source](https://github.com/The-Rainbow-Studios/discord.js-v14-handler)\n\n[Youtube Tutorial]()`)
        ]
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
    }
  }
}

