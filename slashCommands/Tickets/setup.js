const {
	EmbedBuilder, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType, StringSelectMenuBuilder
} = require("discord.js");
const config = require("../../botconfig/config.js");
const ee = require("../../botconfig/embed.js");
const settings = require("../../botconfig/settings.js");
const { disableButtons } = require("visa2discord")
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
				const row = new ActionRowBuilder().addComponents(
                            new ButtonBuilder().setCustomId("category").setLabel("Set Category").setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId("channel").setLabel("Set Channel").setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder().setCustomId("staff").setLabel("Set Staff").setStyle(ButtonStyle.Secondary),
							new ButtonBuilder().setCustomId("publish").setLabel("Publish Panel").setStyle(ButtonStyle.Success)
                        )
        
                const msg = await interaction.reply({
					fetchReply: true,
                    embeds: [new EmbedBuilder()
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
						.setFooter({text: ee.footertext, iconURL: ee.footericon})],
                    components: [row]
                })
				
				const mainCollector = msg.createMessageComponentCollector({
					time: 180000
				})
				mainCollector.on("end" , async (i) => {
					if (i.size === 0) {
						msg.edit({
							embeds: [new EmbedBuilder().setTitle("Setup Cancelled").setColor(ee.color).setFooter({text: ee.footertext, iconURL: ee.footericon})],
							components: disableButtons(msg)
						})
					}
				})
				mainCollector.on("collect", async (i) => {
					if (i.user.id !== interaction.user.id) {
						return i.reply({ content: `Only the user who started the setup can interact with this!`, ephemeral: true })
					}
					if (i.customId === "category") {
						i.deferUpdate()
						msg.edit({
							components: disableButtons(msg)
						})
const ask = await msg.reply({embeds: [
						new EmbedBuilder()
						.setColor(ee.color)
						.setTitle("Give the category ID where tickets will be created!")
						.setDescription(`Type \`cancel\` to cancel the setup`)
						.setImage(`https://cdn.discordapp.com/attachments/1111682190573588551/1115912779380047982/image.png`)
], ephemeral: false})
						const filter = m => m.author.id === interaction.user.id;
						const collector = interaction.channel.createMessageCollector({ filter, time: 180000 });
						collector.on('collect', async (m) => {
							if (m.content.toLowerCase() === "cancel") {
								collector.stop()
								mainCollector.stop()
								await ask.delete().catch(e => null)
								msg.edit({ components: [], embeds: [
						new EmbedBuilder()
						.setColor(ee.color)
						.setTitle("Setup Cancelled")
						.setDescription(`You cancelled the setup`)
								], ephemeral: false})
							} else {
								const channel = interaction.guild.channels.cache.get(m.content)
								if (!channel) {
									return m.reply({ content: `Invalid channel ID, please try again!` }).then(m => setTimeout(() => m.delete(), 5000)).catch(e => null)
							} 
							if (channel.type !== ChannelType.GuildCategory) {
								return m.reply({ content: `Channel is not a category` }).then(m => setTimeout(() => m.delete(), 5000)).catch(e => null)
							}
							collector.stop()
							mainCollector.resetTimer()
							await ask.delete().catch(e => null)
							await m.delete().catch(e => null)
							guildDb.categoryChannel = channel.id
							guildDb.save()
							await msg.edit({
								embeds: [new EmbedBuilder()
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
									.setFooter({text: ee.footertext, iconURL: ee.footericon})],
								components: [row] })
						}
						})
						collector.on('end', async (collected) => {
							if (collected.size === 0) {
								await ask.delete().catch(e => null)
								msg.edit({ components: [], embeds: [
									new EmbedBuilder()
									.setColor(ee.color)
									.setTitle("Setup Cancelled")
									.setDescription(`You cancelled the setup`)
											], ephemeral: false})
							}
						})
					}
					if (i.customId === "channel") {
						i.deferUpdate()
						msg.edit({
							components: disableButtons(msg)
						})
						const ask = await msg.reply({embeds: [
							new EmbedBuilder()
							.setColor(ee.color)
							.setTitle("Give the channel ID where tickets panel will be created!")
							.setDescription(`Type \`cancel\` to cancel the setup`)], ephemeral: false})
							const filter = m => m.author.id === interaction.user.id;
							const collector = interaction.channel.createMessageCollector({ filter, time: 180000 });
							collector.on('collect', async (m) => {
								if (m.content.toLowerCase() === "cancel") {
									collector.stop()
									mainCollector.stop()
									await ask.delete().catch(e => null)
									msg.edit({ components: [], embeds: [
							new EmbedBuilder()
							.setColor(ee.color)
							.setTitle("Setup Cancelled")
							.setDescription(`You cancelled the setup`)
									], ephemeral: false})
								} else {
									const channel = m.mentions.channels.first() ?? interaction.guild.channels.cache.get(m.content)
									if (!channel) {
										return m.reply({ content: `Invalid channel ID, please try again!` }).then(m => setTimeout(() => m.delete(), 5000)).catch(e => null)
								} 
								if (channel.type !== ChannelType.GuildText) {
									return m.reply({ content: `Channel is not a text channel` }).then(m => setTimeout(() => m.delete(), 5000)).catch(e => null)
								}
								collector.stop()
								mainCollector.resetTimer()
								await ask.delete().catch(e => null)
								await m.delete().catch(e => null)
								guildDb.channel = channel.id
								guildDb.save()
								await msg.edit({
									embeds: [new EmbedBuilder()
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
										.setFooter({text: ee.footertext, iconURL: ee.footericon})],
									components: [row] })
							}
							})
							collector.on('end', async (collected) => {
								if (collected.size === 0) {
									await ask.delete().catch(e => null)
									msg.edit({ components: [], embeds: [
										new EmbedBuilder()
										.setColor(ee.color)
										.setTitle("Setup Cancelled")
										.setDescription(`You cancelled the setup`)
												], ephemeral: false})
								}
							})
					}
					if (i.customId === "staff") {
						i.deferUpdate()
						msg.edit({
							components: disableButtons(msg)
						})
						const ask = await msg.reply({embeds: [
							new EmbedBuilder()
							.setColor(ee.color)
							.setTitle("Give the role ID who will be able to handle tickets!")
							.setDescription(`Type \`cancel\` to cancel the setup`)], ephemeral: false})
							const filter = m => m.author.id === interaction.user.id;
							const collector = interaction.channel.createMessageCollector({ filter, time: 180000 });
							collector.on('collect', async (m) => {
								if (m.content.toLowerCase() === "cancel") {
									collector.stop()
									mainCollector.stop()
									await ask.delete().catch(e => null)
									msg.edit({ components: [], embeds: [
							new EmbedBuilder()
							.setColor(ee.color)
							.setTitle("Setup Cancelled")
							.setDescription(`You cancelled the setup`)
									], ephemeral: false})
								} else {
									const role = m.mentions.roles.first() ?? interaction.guild.roles.cache.get(m.content)
									if (!role) {
										return m.reply({ content: `Invalid role ID, please try again!` }).then(m => setTimeout(() => m.delete(), 5000)).catch(e => null)
								} 
								if (guildDb.staffRoles.includes(role.id)) {
									collector.stop()
								mainCollector.resetTimer()
									guildDb.staffRoles.splice(guildDb.staffRoles.indexOf(role.id), 1)
									guildDb.save()
									await msg.edit({
										embeds: [new EmbedBuilder()
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
											.setFooter({text: ee.footertext, iconURL: ee.footericon})],
										components: [row] })
										await ask.delete().catch(e => null)
									return m.reply({ content: `Role removed!` }).then(m => setTimeout(() => m.delete(), 5000)).catch(e => null)
								}
								if (interaction.guild.roles.cache.get(role.id).position > interaction.guild.members.me.roles.highest.position) {
									return m.reply({ content: `My highest role is not above this role, please keep my position highest!` }).then(m => setTimeout(() => m.delete(), 5000)).catch(e => null)
								}
								collector.stop()
								mainCollector.resetTimer()
								await ask.delete().catch(e => null)
								await m.delete().catch(e => null)
								guildDb.staffRoles.push(role.id)
								guildDb.save()
								await msg.edit({
									embeds: [new EmbedBuilder()
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
										.setFooter({text: ee.footertext, iconURL: ee.footericon})],
									components: [row] })
							}
							})
							collector.on('end', async (collected) => {
								if (collected.size === 0) {
									await ask.delete().catch(e => null)
									msg.edit({ components: [], embeds: [
										new EmbedBuilder()
										.setColor(ee.color)
										.setTitle("Setup Cancelled")
										.setDescription(`You cancelled the setup`)
												], ephemeral: false})
								}
							})
					}
					if (i.customId === "publish") {
						i.deferUpdate()
						if (!guildDb.channel) {
							return i.reply({ content: `Ticket channel is not set!` }).then(m => setTimeout(() => m.delete(), 5000)).catch(e => null)
						}
						if (!guildDb.categoryChannel) {
							return i.reply({ content: `Category channel is not set!` }).then(m => setTimeout(() => m.delete(), 5000)).catch(e => null)
						}
						if (guildDb.staffRoles.length === 0) {
							return i.reply({ content: `Staff roles are not set!` }).then(m => setTimeout(() => m.delete(), 5000)).catch(e => null)
						}
						mainCollector.stop()
						const btnOrMenu = new EmbedBuilder()
						.setTitle("Ticket panel should be buttons or select menus?")
						.setColor(ee.color)
						.setDescription(`Select the buttons below`)
						.setFooter({text: ee.footertext, iconURL: ee.footericon})
						const askRow = new ActionRowBuilder().addComponents(
							new ButtonBuilder().setCustomId("button").setLabel("Buttons").setStyle(ButtonStyle.Primary),
							new ButtonBuilder().setCustomId("menu").setLabel("Select Menus").setStyle(ButtonStyle.Primary)
						)
						const askFinal = await msg.edit({
							embeds: [btnOrMenu],
							components: [askRow]
						})
						const askCollector = askFinal.createMessageComponentCollector({
							time: 180000
})
askCollector.on("collect", async (int) => {
	if (int.user.id !== interaction.user.id) {
		return int.reply({ content: `Only the user who started the setup can interact with this!`, ephemeral: true })
	}
	const channel = interaction.guild.channels.cache.get(guildDb.channel)
	if (int.customId === "button") {
		
		channel.send({
			embeds: [
				new EmbedBuilder()
				.setColor(ee.color)
				.setTitle(config.ticketembed.title)			
				.setDescription(config.ticketembed.description)
			],
			components: [
				new ActionRowBuilder().addComponents(
					new ButtonBuilder().setCustomId("general").setLabel("General").setStyle(ButtonStyle.Primary).setEmoji(config.emojis.general),
					new ButtonBuilder().setCustomId("special").setLabel("Special").setStyle(ButtonStyle.Primary).setEmoji(config.emojis.special),
					new ButtonBuilder().setCustomId("giveaway").setLabel("Giveaway").setStyle(ButtonStyle.Primary).setEmoji(config.emojis.giveaway)
				)

			]
		}).catch(e => null)
	}
	if (int.customId === "menu") {
		channel.send({
			embeds: [
				new EmbedBuilder()
				.setColor(ee.color)
				.setTitle(config.ticketembed.title)			
				.setDescription(config.ticketembed.description)
			],
			components: [
				new ActionRowBuilder().addComponents(
					new StringSelectMenuBuilder().setCustomId("ticket").setPlaceholder("Select a ticket type").addOptions([
						{
							label: "General",
							value: "general",
							description: "General ticket",
							emoji: config.emojis.general
						},
						{
							label: "Special",
							value: "special",

							description: "Special ticket",
							emoji: config.emojis.special
						},
						{
							label: "Giveaway",
							value: "giveaway",
							description: "Giveaway ticket",
							emoji: config.emojis.giveaway
						}
					])
					.setMaxValues(1)
				)

			]
		}).catch(e => null)
	}
	await msg.edit({
		components: [],
		embeds: [
			new EmbedBuilder()
			.setColor(ee.color)
			.setTitle("Setup Completed")
			.setDescription(`You have successfully setup the ticket panel`)
		]
	})
})
askCollector.on("end", async (int) => {
	if (int.size === 0) {
		await msg.edit({
			embeds: [new EmbedBuilder()
			.setColor(ee.color)
			.setTitle("Setup Cancelled")
			.setDescription(`You cancelled the setup`)],
			components: []
		})
	}
})


					}
				});
		} catch (e) {
			console.log(String(e.stack).bgRed)
		}
	}
}

