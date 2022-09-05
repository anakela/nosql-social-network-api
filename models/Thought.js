const { Schema, model } = require('mongoose');

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
        
    }
});

module.exports = model('Thought', thoughtSchema);