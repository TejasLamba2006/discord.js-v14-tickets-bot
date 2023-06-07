module.exports = {
  "token": process.env.TOKEN,
  "dbType": "MONGO", //MONGO only supported
  "MONGOtype": "MONGOOSE", //MONGOOSE only supported
  "MongoURL": "mongodb+srv://xd666:naveen123@cluster.gbcmjjt.mongodb.net/?retryWrites=true&w=majority", //this is required
  "loadSlashsGlobal": true,
  "ExpressServer": true, //If you wanted to make the website run or not
  "Port": 3000, //Which port website gonna be hosted
  "dirSetup": [{
    "Folder": "Info", "CmdName": "info",
    "CmdDescription": "Grant specific Information about something!"
  },{
    "Folder": "Tickets", "CmdName": "tickets",
    "CmdDescription": "Manage ticketing system on your server!"
  }],
  "emojis": {
    "giveaway": "🎉",
    "special": "🔴",
    "general": "870914038933098517"
},
"ticketembed": {
"title": "Tickets",
"description": "To create a ticket, click the button that suits your request!",
}
}
