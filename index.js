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
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMessages
  ],
  presence: {
    activity: {
      name: `+help | Rainbow Studios`,
      type: "PLAYING",
    },
    status: "online"
  }
});
//DataBase stuff
if (config.dbType === "quick.db") {
  const { QuickDB } = require("quick.db");
  const db = new QuickDB();
  client.db = db
} else if (config.dbType === "MONGO") {
  if (config.MONGOtype === "quickmongo") {
    const { Database } = require('quickmongo')
    const db = new Database(config.MongoURL);
    main().catch(err => console.log(err));
    db.on("ready", () => {
      console.log("MongoDB connected!");
    });
    async function main() {
      await db.connect();
    }
client.db = db
  } else if (config.MONGOtype === "MONGOOSE") {
    const mongoose = require('mongoose');

    main().catch(err => console.log(err));

    async function main() {
      await mongoose.connect(config.MongoURL);
    }
    return new Promise((res) => {
      mongo.connection.once("connected", () => {
        console.log("MongoDB connected!");
        res();
      });
    });
  } else {
    console.log('Invalid MongoType, only quickmongo and MONGOOSE Accepted')
    process.exit(1)
  }
} else {
  console.log('Invalid dbType OR No dbType given, Running without DataBase')
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
//End of the File

