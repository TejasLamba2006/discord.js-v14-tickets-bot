const {
  EmbedBuilder
} = require("discord.js");
const config = require("../../botconfig/config.js");
const ee = require("../../botconfig/embed.js");
const settings = require("../../botconfig/settings.js");
const websiteSettings = require("../../dashboard/settings.js");
module.exports = {
  name: "help", //the command name for execution & for helpcmd [OPTIONAL]

  category: "Info",
  usage: "help [cmdname]",
  aliases: ["h", "halp", "helpme", "hilfe"],

  cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
  description: "Returns all Commmands, or one specific command", //the command description for helpcmd [OPTIONAL]
  memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
  requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
  alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
  run: async (client, message, args) => {
    try {
      let prefix = "/"
      if (args[0] && args[0].length > 0) {
        const embed = new EmbedBuilder();
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args.toLowerCase()));
        if (!cmd) {
          return message.reply({
            embeds: [embed.setColor(ee.wrongcolor).setDescription(`No Information found for command **${args.toLowerCase()}**`)]
          });
        }
        if (cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
        if (cmd.description) embed.addFields({name: "**Description**", value:`\`${cmd.description}\``});
        if (cmd.aliases) embed.addField({name: "**Aliases**", value: `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``});
        if (cmd.cooldown) embed.addField({name:"**Cooldown**", value: `\`${cmd.cooldown} Seconds\``});
        else embed.addField({name: "**Cooldown**", value: `\`${settings.default_cooldown_in_sec} Second\``});
        if (cmd.usage) {
          embed.addField({name: "**Usage**", value:`\`${prefix}${cmd.usage}\``});
          embed.setFooter({text: "Syntax: <> = required, [] = optional"});
        }
        return message.reply({
          embeds: [embed.setColor(ee.color)]
        });
      } else {
        const embed = new EmbedBuilder()
          .setColor(ee.color)
          .setThumbnail(ee.footericon)
          .setTitle("HELP MENU 🔰 Commands")
          .setDescription(`**[Invite me with __Slash Commands__ Permissions](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands), cause all of my Commands are available as Slash Commands too!**`)
          .setFooter({text: `To see Command Description & Information, type: ${prefix}help [CMD NAME]`, iconURL: ee.footericon});
        const commands = (category) => {
          return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
        };
        try {
          for (let i = 0; i < client.categories.length; i += 1) {
            const current = client.categories[i];
            const items = commands(current);
            embed.addField({name: `**${current.toUpperCase()} [${items.length}]**`, value: `> ${items.join(", ")}`});
          }
        } catch (e) {
          console.log(String(e.stack).red);
        }
        message.reply({
          embeds: [embed]
        });
      }
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.reply({
        embeds: [new EmbedBuilder()
          .setColor(ee.wrongcolor)
          .setFooter({text: ee.footertext, iconURL: ee.footericon})
          .setTitle(`${client.allEmojis.x} ERROR | An error occurred`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
        ]
      });
    }
  }
}

