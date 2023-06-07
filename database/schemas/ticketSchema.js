const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    guild: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guild',
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel',
    },
    tickets: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel',
        },
        isOpen: Boolean,
        type: String,
    }],
    categoryChannel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryChannel',
    },
    staffRoles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    }],
});

module.exports = mongoose.model('Ticket', ticketSchema);
