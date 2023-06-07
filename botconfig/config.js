module.exports = {
  "token": process.env.TOKEN,
  "dbType": "MONGO", //MONGO only supported
  "MONGOtype": "MONGOOSE", //MONGOOSE only supported
  "MongoURL": "", //this is required
  "loadSlashsGlobal": true,
  "dirSetup": [{
    "Folder": "Info", "CmdName": "info",
    "CmdDescription": "Grant specific Information about something!"
  }]
}
