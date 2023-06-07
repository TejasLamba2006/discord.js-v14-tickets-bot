const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    guild: {
        type: mongoose.Schema.Types.String,
        ref: 'Guild',
    },
    channel: {
        type: mongoose.Schema.Types.String,
        ref: 'Channel',
    },
    tickets: [{
        user: {
            type: mongoose.Schema.Types.String,
            ref: 'User',
        },
        channel: {
            type: mongoose.Schema.Types.String,
            ref: 'Channel',
        },
        isOpen: Boolean,
    }],
    categoryChannel: {
        type: mongoose.Schema.Types.String,
        ref: 'CategoryChannel',
    },
    staffRoles: [{
        type: mongoose.Schema.Types.String,
        ref: 'Role',
    }],
});

module.exports = mongoose.model('Ticket', ticketSchema);
