module.exports = {
  "token": process.env.TOKEN,
  "dbType": "", //quick.db OR MONGO
  "MONGOtype": "", //quickmongo OR MONGOOSE
  "MongoURL": "", //if dbType = MONGO, this is required else skip
  "loadSlashsGlobal": true,
  "dirSetup": [{
    "Folder": "Info", "CmdName": "info",
    "CmdDescription": "Grant specific Information about something!"
  }]
}
