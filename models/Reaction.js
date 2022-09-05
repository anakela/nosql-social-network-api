const ObjectId = require('mongodb').ObjectId;
const { Schema } = require('mongoose');

// Create a blueprint for the reaction collection
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new ObjectId,
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
});

module.exports = reactionSchema;