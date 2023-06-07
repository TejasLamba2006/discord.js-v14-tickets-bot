//Import Modules
const config = require(`../../botconfig/config.js`);
const ee = require(`../../botconfig/embed.js`);
const settings = require(`../../botconfig/settings.js`);
const {
  onCoolDown,
  replacemsg
} = require("../../handlers/functions");
const Discord = require("discord.js");
let prefix = '/';
const ticketSchema = require("../../database/schemas/ticketSchema.js");
module.exports = async (client, interaction) => {
  let guildDb = await ticketSchema.findOne({
    guild: interaction.guild.id
  });
  if (!guildDb) guildDb = await ticketSchema.create({
    guild: interaction.guild.id,
  });
 if (interaction.isButton() || interaction.isStringSelectMenu()) {
const cat = interaction.guild.channels.cache.get(guildDb.categoryChannel);
if (!cat) return;
if (interaction.customId === 'general' || (interaction.customId === "ticket" && interaction.values[0] === 'general')) {
  await interaction.deferReply({ ephemeral: true });
const ticket = guildDb.tickets.find((x) => x.user === interaction.user.id);
if (ticket) return interaction.followUp({ content: `You already have a ticket: <#${ticket.channel}>`, ephemeral: true });
interaction.guild.channels.create({
  name: `general-${interaction.user.username}`, type: Discord.ChannelType.GuildText,
  permissionOverwrites: [
    {
      id: interaction.guild.roles.everyone,
      deny: [Discord.PermissionFlagsBits.ViewChannel],
    },
    {
      id: interaction.member.id,
      allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ReadMessageHistory, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions, Discord.PermissionFlagsBits.UseExternalEmojis],
    },
  ], parent: cat.id, position: 1, topic: `${interaction.member.id}`, reason: "All rights reserved to Visa2Code"
}).then(async channel => {
  guildDb.tickets.push({
    user: interaction.user.id,
    channel: channel.id,
    isOpen: true
  });
  await guildDb.save();
  guildDb.staffRoles.forEach(async (role) => {
    const r = interaction.guild.roles.cache.get(role);
    if (!r) return;
    channel.permissionOverwrites.create(r, {
      'SendMessages': true,
      'EmbedLinks': true,
      'AttachFiles': true,
    });
  });
  await interaction.followUp({ content: `**Your ticket has been successfully opened** <#${channel.id}>`, ephemeral: true})
  channel.send({ content: `Welcome <@!${interaction.member.user.id}>`,  embeds: [
    new Discord.EmbedBuilder()
    .setColor(ee.color)
    .setFooter({ text: ee.footertext, iconURL: ee.footericon})
    .setTitle(`Welcome to your ticket`)
    .setDescription(`Please describe your problem in detail and wait for a staff member to help you.`)
    
  ], components: [new Discord.ActionRowBuilder().addComponents(
    new Discord.ButtonBuilder().setCustomId('close').setLabel('Close').setStyle(Discord.ButtonStyle.Danger),
  )] }).then(msg => {
    msg.pin()
  })
})
}
if (interaction.customId === 'giveaway' || (interaction.customId === "ticket" && interaction.values[0] === 'giveaway')) {
  await interaction.deferReply({ ephemeral: true });
  const ticket = guildDb.tickets.find((x) => x.user === interaction.user.id);
  if (ticket) return interaction.followUp({ content: `You already have a ticket: <#${ticket.channel}>`, ephemeral: true });
  interaction.guild.channels.create({
    name: `giveaway-${interaction.user.username}`, type: Discord.ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.roles.everyone,
        deny: [Discord.PermissionFlagsBits.ViewChannel],
      },
      {
        id: interaction.member.id,
        allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ReadMessageHistory, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions, Discord.PermissionFlagsBits.UseExternalEmojis],
      },
    ], parent: cat.id, position: 1, topic: `${interaction.member.id}`, reason: "All rights reserved to Visa2Code"
  }).then(async channel => {
    guildDb.tickets.push({
      user: interaction.user.id,
      channel: channel.id,
      isOpen: true
    });
    await guildDb.save();
    guildDb.staffRoles.forEach(async (role) => {
      const r = interaction.guild.roles.cache.get(role);
      if (!r) return;
      channel.permissionOverwrites.create(r, {
        'SendMessages': true,
        'EmbedLinks': true,
        'AttachFiles': true,
      });
    });
    await interaction.followUp({ content: `**Your ticket has been successfully opened** <#${channel.id}>`, ephemeral: true})
    channel.send({ content: `Welcome <@!${interaction.member.user.id}>`,  embeds: [
      new Discord.EmbedBuilder()
      .setColor(ee.color)
      .setFooter({ text: ee.footertext, iconURL: ee.footericon})
      .setTitle(`Welcome to your ticket`)
      .setDescription(`Please describe your problem in detail and wait for a staff member to help you.`)
      
    ], components: [new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder().setCustomId('close').setLabel('Close').setStyle(Discord.ButtonStyle.Danger),
    )] }).then(msg => {
      msg.pin()
    })
  })
}
if (interaction.customId === 'special' || (interaction.customId === "ticket" && interaction.values[0] === 'special')) {
  await interaction.deferReply({ ephemeral: true });
  const ticket = guildDb.tickets.find((x) => x.user === interaction.user.id);
  if (ticket) return interaction.followUp({ content: `You already have a ticket: <#${ticket.channel}>`, ephemeral: true });
  interaction.guild.channels.create({
    name: `special-${interaction.user.username}`, type: Discord.ChannelType.GuildText,
    permissionOverwrites: [
      {
        id: interaction.guild.roles.everyone,
        deny: [Discord.PermissionFlagsBits.ViewChannel],
      },
      {
        id: interaction.member.id,
        allow: [Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ReadMessageHistory, Discord.PermissionFlagsBits.AttachFiles, Discord.PermissionFlagsBits.EmbedLinks, Discord.PermissionFlagsBits.AddReactions, Discord.PermissionFlagsBits.UseExternalEmojis],
      },
    ], parent: cat.id, position: 1, topic: `${interaction.member.id}`, reason: "All rights reserved to Visa2Code"
  }).then(async channel => {
    guildDb.tickets.push({
      user: interaction.user.id,
      channel: channel.id,
      isOpen: true
    });
    await guildDb.save();
    guildDb.staffRoles.forEach(async (role) => {
      const r = interaction.guild.roles.cache.get(role);
      if (!r) return;
      channel.permissionOverwrites.create(r, {
        'SendMessages': true,
        'EmbedLinks': true,
        'AttachFiles': true,
      });
    });
    await interaction.followUp({ content: `**Your ticket has been successfully opened** <#${channel.id}>`, ephemeral: true})
    channel.send({ content: `Welcome <@!${interaction.member.user.id}>`,  embeds: [
      new Discord.EmbedBuilder()
      .setColor(ee.color)
      .setFooter({ text: ee.footertext, iconURL: ee.footericon})
      .setTitle(`Welcome to your ticket`)
      .setDescription(`Please describe your problem in detail and wait for a staff member to help you.`)
      
    ], components: [new Discord.ActionRowBuilder().addComponents(
      new Discord.ButtonBuilder().setCustomId('close').setLabel('Close').setStyle(Discord.ButtonStyle.Danger),
    )] }).then(msg => {
      msg.pin()
    })
  })
}
if (interaction.customId === "close") {
  await interaction.deferReply({ ephemeral: true });
  const ticket = guildDb.tickets.find((x) => x.channel === interaction.channel.id);
  if (!ticket) return interaction.followUp({ content: `This is not a ticket channel`, ephemeral: true });
  interaction.channel.delete();
  guildDb.tickets = guildDb.tickets.filter((x) => x.channel !== interaction.channel.id);
  await guildDb.save();
}
 }
	// do autocomplete handling
  const CategoryName = interaction.commandName;
  let command = false;
  try {
    if (client.slashCommands.has(CategoryName + interaction.options.getSubcommand())) {
      command = client.slashCommands.get(CategoryName + interaction.options.getSubcommand());
    }
  } catch {
    if (client.slashCommands.has("normal" + CategoryName)) {
      command = client.slashCommands.get("normal" + CategoryName);
    }
  }
  if (command) {

    if (onCoolDown(interaction, command)) {
      return interaction.reply({
        ephemeral: true,
        embeds: [new Discord.EmbedBuilder()
          .setColor(ee.wrongcolor)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon})
          .setTitle(replacemsg(settings.messages.cooldown, {
            prefix: prefix,
            command: command,
            timeLeft: onCoolDown(interaction, command)
          }))
        ]
      });
    }
    //if Command has specific permission return error
    if (command.memberpermissions && command.memberpermissions.length > 0 && !interaction.member.permissions.has(command.memberpermissions)) {
      return interaction.reply({
        ephemeral: true,
        embeds: [new Discord.EmbedBuilder()
          .setColor(ee.wrongcolor)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon})
          .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
          .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.memberpermissions, {
            command: command,
            prefix: prefix
          }))
        ]
      });
    }
    //if Command has specific needed roles return error
    if (command.requiredroles && command.requiredroles.length > 0 && interaction.member.roles.cache.size > 0 && !interaction.member.roles.cache.some(r => command.requiredroles.includes(r.id))) {
      return interaction.reply({
        ephemeral: true,
        embeds: [new Discord.EmbedBuilder()
          .setColor(ee.wrongcolor)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon})
          .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
          .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.requiredroles, {
            command: command,
            prefix: prefix
          }))
        ]
      })
    }
    //if Command has specific users return error
    if (command.alloweduserids && command.alloweduserids.length > 0 && !command.alloweduserids.includes(interaction.member.id)) {
      return message.channel.send({
        ephemeral: true,
        embeds: [new Discord.EmbedBuilder()
          .setColor(ee.wrongcolor)
          .setFooter({ text: ee.footertext, iconURL: ee.footericon})
          .setTitle(replacemsg(settings.messages.notallowed_to_exec_cmd.title))
          .setDescription(replacemsg(settings.messages.notallowed_to_exec_cmd.description.alloweduserids, {
            command: command,
            prefix: prefix
          }))
        ]
      });
    }
    //execute the Command
    command.run(client, interaction, guildDb)
  }
}

