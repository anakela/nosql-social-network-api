const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User, Thought } = require('./models');
// const Types = require('mongodb').Types;
const ObjectId = require('mongodb').ObjectId;

// Allow dotenv elements
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

// Connect to MongoDB database
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jzvhqpy.mongodb.net/nosqlSocialNetworkApi?retryWrites=true&w=majority`)
    .then(() => {
        console.log(`Successful!`);
    })
    .catch(err => console.log(err));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// USERS
// Create an API route for getting all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create an API route for getting a single user by ID
app.get('/api/users/:userId', async (req, res) => {
    try {
        const singleUser = await User.findById({
            _id: ObjectId(req.params.userId),
        });

        res.status(200).json(singleUser);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create an API route for posting new users
app.post('/api/users', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            thoughts: [req.body.thoughts],
            friends: [req.body.friends],
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create an API route for updating a user by its ID
app.put('/api/users/:userId', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { ...req.body },
            { new: true },
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create an API route for deleting a user by its ID
app.delete('/api/users/:userId', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete({
            _id: ObjectId(req.params.userId),
            // ASK ABOUT CASCADING THOUGHTS WHEN USER IS DELETED
            thoughts: req.params.thoughts,
        });

        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// FRIENDS
// Create an API route to add a new friend to a user's friend list
app.post('/api/users/:userId/friends/', async (req, res) => {
    try {
        console.log(req.params.userId);
        const newFriend = await User.findOne(req.body);
        console.log(req.body, newFriend);

        const addedFriend = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $addToSet: {
                    friends: newFriend._id,
                }
            },
            {
                new: true,
            },
        ).populate('friends');

        res.status(200).json(addedFriend);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

// Create an API route to remove a friend from a user's friend list
app.delete('/api/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const deletedFriend = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $pull: {
                    friends: req.params.friendId,
                }
            },
            {
                new: true,
            }
        ).populate('friends');
        res.status(200).json(deletedFriend);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

// THOUGHTS
// Create an API route for getting all thoughts
app.get('/api/thoughts', async (req, res) => {
    try {
        const allThoughts = await Thought.find();
        res.status(200).json(allThoughts);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create an API route for getting a thought by ID
app.get('/api/thoughts/:thoughtId', async (req, res) => {
    try {
        const oneThought = await Thought.findById({
            _id: req.params.thoughtId,
        });
        res.status(200).json(oneThought);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// SHOWING NULL BUT DOES GET CREATED
// Create an API route for posting new thoughts
app.post('/api/thoughts', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);

        const user = await User.findByIdAndUpdate(
            req.body.userId,
            {
                $addToSet: {
                    thoughts: newThought._id,
                }
            },
            {
                new: true,
            }
        ).populate('thoughts');
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create an API route for updating a thought by its ID
app.put('/api/thoughts/:thoughtId', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { ...req.body },
            { new: true },
        );

        res.status(200).json(updatedThought);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create an API route for deleting a thought by its ID
app.delete('/api/thoughts/:thoughtId', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete({
            _id: ObjectId(req.params.thoughtId)
        });

        res.status(200).json(deletedThought);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// REACTIONS
// Create an API route for posting new reactions
app.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            {
                _id: req.params.thoughtId
            },
            {
                $addToSet: {
                    reactions: req.body,
                }
            },
            {
                new: true,
            }
        ).populate('reactions');

        res.status(200).json(thought);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

// Creating an API route for deleting a reaction by ID
app.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const deletedReaction = await Thought.findOneAndUpdate(
            {
                _id: req.params.thoughtId,
            },
            {
                $pull: {
                    reactions: {
                        reactionId: req.params.reactionId,
                    },
                },
            },
            {
                new: true,
            });

        res.status(200).json(deletedReaction);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

// Confirm that the server is listening
app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}!`));