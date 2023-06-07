const {
	EmbedBuilder, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder, ButtonStyle
} = require("discord.js");
const config = require("../../botconfig/config.js");
const ee = require("../../botconfig/embed.js");
const settings = require("../../botconfig/settings.js");
module.exports = {
	name: "setup", //the command name for the Slash Command
  category: "Tickets",
	description: "Setup the tickets panel", //the command description for Slash Command Overview
	cooldown: 1,
	memberpermissions: [PermissionFlagsBits.ManageGuild], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
	requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
	alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
	options: [],
	run: async (client, interaction, guildDb) => {
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
			const askWhattodo = new EmbedBuilder()
                .setTitle("What do you want to do?")
                .setColor(ee.color)
                .setDescription(`Select the buttons below`)
                .addFields({
                    name: "Category",
                    value: guildDb.categoryChannel ? `<#${guildDb.categoryChannel}>` : "Not set", 
                    inline: true
                }, {
                    name: "Ticket Channel",
                    value: guildDb.channel ? `<#${guildDb.channel}>` : "Not set",
                    inline: true
                }, {
                    name: "Staff Roles",
                    value: guildDb.staffRoles.length > 0 ? guildDb.staffRoles.map(role => `<@&${role}>`).join(", ") : "Not set",
                    inline: true
                })
                .setFooter({text: ee.footertext, iconURL: ee.footericon})
        
                message.reply({
                    embeds: [askWhattodo],
                    components: [
                        new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId("category").setLabel("Set Category").setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId("channel").setLabel("Set Channel").setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId("staff").setLabel("Set Staff").setStyle(ButtonStyle.Secondary)
                        )
                    ]
                })
		} catch (e) {
			console.log(String(e.stack).bgRed)
		}
	}
}

