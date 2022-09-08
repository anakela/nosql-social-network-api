const { Schema, model } = require('mongoose');

// Create a blueprint for the user collection
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please create a username.'],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: [validateEmail, "Please use a valid email address."],
        // Regex from regexr.com: https://regexr.com/2rhq7
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, "Please enter a valid email address."],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
            default: [],
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: [],
        }
    ],

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});

// Create a virtual called friendCount that retrieves the length of a user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
    return `${this.friends.length}`;
});

// Create and export the collection so that it can be used in other files.
module.exports = model('User', userSchema);