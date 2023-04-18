const {
    EmbedBuilder
} = require("discord.js");
const Discord = require("discord.js");
const config = require("../../botconfig/config.js");
var ee = require("../../botconfig/embed.js");
const settings = require("../../botconfig/settings.js");
let cpuStat = require("cpu-stat");
let os = require("os");
module.exports = {

    name: "botinfo", //the command name for execution & for helpcmd [OPTIONAL]
    category: "Info",
    cooldown: 1, //the command cooldown for execution & for helpcmd [OPTIONAL]
    description: "Shows Bot Information", //the command description for helpcmd [OPTIONAL]
    memberpermissions: [], //Only allow members with specific Permissions to execute a Commmand [OPTIONAL]
    requiredroles: [], //Only allow specific Users with a Role to execute a Command [OPTIONAL]
    alloweduserids: [], //Only allow specific Users to execute a Command [OPTIONAL]
    run: async (client, interaction) => {
        try {

            cpuStat.usagePercent(function (e, percent, seconds) {
                try {
                    if (e) return console.log(String(e.stack).red);

                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].members.me.voice.channel) connectedchannelsamount += 1;
                    }
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

                    const botinfo = new EmbedBuilder()
                        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
                        .setTitle("__**Stats:**__")
                        .setColor(ee.color)
                        .addFields({ 
                            name: '⏳ Memory Usage', 
                            value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``,
                            inline: true 
                        },
                        { 
                            name: '⌚️ Uptime', 
                            value: `${duration(client.uptime).map(i => `\`${i}\``).join(', ')}`,
                            inline: true 
                        },
                        { 
                            name: '\u200b', 
                            value: '\u200b', 
                            inline: true 
                        },
                        { 
                            name: '📁 Users', 
                            value: `\`Total: ${client.users.cache.size} Users\``, 
                            inline: true 
                        },
                        { 
                            name: '📁 Servers', 
                            value: `\`Total: ${client.guilds.cache.size} Servers\``,
                            inline: true 
                        },
                        { 
                            name: '\u200b', 
                            value: '\u200b', 
                            inline: true 
                        },
                        { 
                            name: '📁 Voice-Channels', 
                            value: `\`${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\``, 
                            inline: true 
                        },
                        { 
                            name: '🔊 Connections', 
                            value: `\`${connectedchannelsamount} Connections\``, 
                            inline: true 
                        },
                        { 
                            name: '\u200b', 
                            value: '\u200b', 
                            inline: true 
                        },
                        { 
                            name: '👾 Discord.js', 
                            value: `\`v${Discord.version}\``, 
                            inline: true 
                        },
                        { 
                            name: '🤖 Node', 
                            value: `\`${process.version}\``, 
                            inline: true 
                        },
                        { 
                            name: '\u200b', 
                            value: '\u200b', 
                            inline: true 
                        },
                        { 
                            name: '🤖 CPU', 
                            value: `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``, 
                            inline: false 
                        },
                        { 
                            name: '🤖 CPU usage', 
                            value: `\`${percent.toFixed(2)}%\``, 
                            inline: true 
                        },
                        { 
                            name: '🤖 Arch', 
                            value: `\`${os.arch()}\``, 
                            inline: true 
                        },
                        { 
                            name: '\u200b', 
                            value: '\u200b', 
                            inline: true 
                        },
                        { 
                            name: '💻 Platform', 
                            value: `\`\`${os.platform()}\`\``, 
                            inline: true 
                        },
                        { 
                            name: 'API Latency', 
                            value: `\`${client.ws.ping}ms\``, 
                            inline: true 
                        })
                        .setFooter({text: "Coded by: Tejas Lamba#1924", iconURL: "https://cdn.discordapp.com/avatars/502406420453654529/d6d53ede023831dc96694de6c3de8c23.png?size=512"});
                    interaction.reply({
                        embeds: [botinfo]
                    });

                } catch (e) {
                    console.log(e)
                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].members.me.voice.channel) connectedchannelsamount += 1;
                    }
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                    const botinfo = new EmbedBuilder()
                        .setAuthor({text: client.user.username, iconURL: client.user.displayAvatarURL()})
                        .setTitle("__**Stats:**__")
                        .setColor(ee.color)
                        .addFields({
                            name: "⏳ Memory Usage",
                            value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``,
                            inline: true
                          },
                          {
                            name: "⌚️ Uptime",
                            value: `${duration(client.uptime).map(i=>`\`${i}\``).join(", ")}`,
                            inline: true   
                          },
                          {
                            name: "\u200b",
                            value: "\u200b",
                            inline: true
                          },
                          {
                            name: "📁 Users",
                            value: `\`Total: ${client.users.cache.size} Users\``,
                            inline: true
                          },
                          {
                            name: "📁 Servers",
                            value: `\`Total: ${client.guilds.cache.size} Servers\``,
                            inline: true
                          },
                          {
                            name: "\u200b",
                            value: "\u200b",
                            inline: true
                          },
                          {
                            name: "📁 Voice-Channels",
                            value: `\`${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\``,
                            inline: true
                          },
                          {
                            name: "🔊 Connections",
                            value: `\`${connectedchannelsamount} Connections\``,
                            inline: true
                          },
                          {
                            name: "\u200b",
                            value: "\u200b",
                            inline: true
                          },
                          {
                            name: "👾 Discord.js",
                            value: `\`v${Discord.version}\``,
                            inline: true
                          },
                          {
                            name: "🤖 Node",
                            value: `\`${process.version}\``,
                            inline: true
                          },
                          {
                            name: "\u200b",
                            value: "\u200b",
                            inline: true
                          },
                          {
                            name: "🤖 CPU",
                            value: `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``
                          },
                          {
                            name: "🤖 CPU usage",
                            value: `\`${percent.toFixed(2)}%\``,
                            inline: true
                          },
                          {
                            name: "🤖 Arch",
                            value: `\`${os.arch()}\``,
                            inline: true
                          },
                          {
                            name: "\u200b",
                            value: "\u200b",
                            inline: true
                          },
                          {
                            name: "💻 Platform",
                            value: `\`\`${os.platform()}\`\``,
                            inline: true
                          },
                          {
                            name: "API Latency",
                            value: `\`${client.ws.ping}ms\``,
                            inline: true
                          })
                        .setFooter({text: "Coded by: Tejas Lamba#1924", iconURL: "https://cdn.discordapp.com/avatars/502406420453654529/d6d53ede023831dc96694de6c3de8c23.png?size=512"});
                        interaction.reply({
                        embeds: [botinfo]
                    });
                }
            })

            function duration(duration, useMilli = false) {
                let remain = duration;
                let days = Math.floor(remain / (1000 * 60 * 60 * 24));
                remain = remain % (1000 * 60 * 60 * 24);
                let hours = Math.floor(remain / (1000 * 60 * 60));
                remain = remain % (1000 * 60 * 60);
                let minutes = Math.floor(remain / (1000 * 60));
                remain = remain % (1000 * 60);
                let seconds = Math.floor(remain / (1000));
                remain = remain % (1000);
                let milliseconds = remain;
                let time = {
                    days,
                    hours,
                    minutes,
                    seconds,
                    milliseconds
                };
                let parts = []
                if (time.days) {
                    let ret = time.days + ' Day'
                    if (time.days !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)
                }
                if (time.hours) {
                    let ret = time.hours + ' Hr'
                    if (time.hours !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)
                }
                if (time.minutes) {
                    let ret = time.minutes + ' Min'
                    if (time.minutes !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)

                }
                if (time.seconds) {
                    let ret = time.seconds + ' Sec'
                    if (time.seconds !== 1) {
                        ret += 's'
                    }
                    parts.push(ret)
                }
                if (useMilli && time.milliseconds) {
                    let ret = time.milliseconds + ' ms'
                    parts.push(ret)
                }
                if (parts.length === 0) {
                    return ['instantly']
                } else {
                    return parts
                }
            }
            return;
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    }
}
