const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Create a blueprint for the thought collection
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: [1],
        maxLength: [128],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (date) => {
            if (date) return date.toLocaleDateString();
        }
    },
    username: {
        type: Schema.Types.String,
        required: true,
        ref: 'User',
    },
    reactions: [ reactionSchema ],
}, {
    timestamps: true,
});

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return `reactionCount: ${this.reactions.length}`;
});

module.exports = model('Thought', thoughtSchema);