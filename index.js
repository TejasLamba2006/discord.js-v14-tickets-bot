require('dotenv').config();
const Discord = require("discord.js");
const config = require(`./botconfig/config.js`);
const settings = require(`./botconfig/settings.js`);
const colors = require("colors");
const client = new Discord.Client({
  fetchAllMembers: false,
  shards: "auto",
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  failIfNotExists: false,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
  presence: {
    activity: {
      name: `+help | Shadow Studios`,
      type: "PLAYING",
    },
    status: "online"
  }
});
//DataBase stuff
if (config.dbType === "MONGO" && config.MONGOtype === "MONGOOSE") {
    const connect = require("./database/connect.js");
    connect(config);
  } else {
    console.log('Invalid DataBase types, only MONGOOSE Accepted')
    process.exit(1)
  }
//Define some Global Collections
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = require("fs").readdirSync(`./slashCommands`);
client.allEmojis = require("./botconfig/emojis.js");
client.maps = new Map();

client.setMaxListeners(100); require('events').defaultMaxListeners = 100;


//Require the Handlers Add the antiCrash file too, if its enabled
["events", "slashCommands", settings.antiCrash ? "antiCrash" : null]
  .filter(Boolean)
  .forEach(h => {
    require(`./handlers/${h}`)(client);
  })
//Start the Bot
client.login(config.token)

//dont remove or edit this line
console.log('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='.red)
  console.log(`Made by visa2code#1747`.cyan)
  console.log(`Credits`.yellow, `| Visa2Code`.cyan, `| https://discord.gg/xzzF9ghUwP`.yellow)
  console.log(`Join Above for Support!`)
  console.log('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='.red)
  //til here dont touch above anything
if (config.ExpressServer) {
const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send({
  Working: "Visa2Code's Ticket Bot is Working!"
  })
})
app.listen(config.Port, () => {
  console.log(`Web Server Started on Port ${config.Port}`.green)
})
}

