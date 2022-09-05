const { Schema, model } = require('mongoose');

// Create a blueprint for the reaction collection
const reactionSchema = new Schema({

});

module.exports = model('Reaction', reactionSchema);