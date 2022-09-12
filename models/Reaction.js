const { Schema, Types } = require('mongoose');

// Create a blueprint for the reaction collection
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: [280],
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: (date) => {
            if (date) return date.toLocaleDateString();
        }
    }
}, {
    timestamps: true,
    toJSON: {
        getters: true,
    },
    id: false,
});

module.exports = reactionSchema;