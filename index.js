const Discord = require("discord.js");
const config = require(`./botconfig/config.js`);
const settings = require(`./botconfig/settings.js`);
const colors = require("colors");
const Enmap = require("enmap");
const client = new Discord.Client({
    fetchAllMembers: false,
    //restTimeOffset: 0,
    //restWsBridgetimeout: 100,
    shards: "auto",
    //shardCount: 5,
    allowedMentions: {
      parse: [ ],
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


//Define some Global Collections
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = require("fs").readdirSync(`./commands`);
client.allEmojis = require("./botconfig/emojis.js");
client.maps = new Map();

client.setMaxListeners(100); require('events').defaultMaxListeners = 100;

client.settings = new Enmap({ name: "settings",dataDir: "./databases/settings"});
client.infos = new Enmap({ name: "infos", dataDir: "./databases/infos"});

//Require the Handlers                  Add the antiCrash file too, if its enabled
["events", "commands", "slashCommands", settings.antiCrash ? "antiCrash" : null]
    .filter(Boolean)
    .forEach(h => {
        require(`./handlers/${h}`)(client);
    })
//Start the Bot
client.login(config.token) 
