const { CategoryChannel } = require('discord.js');
const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    guildId: String,
    channelId: String,
    tickets: [{
        userId: String,
        channelId: String,
        open: Boolean,
        type: String,
    }],
    CategoryChannel: String
})

module.exports = mongoose.model('ticket', ticketSchema)