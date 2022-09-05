const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User, Thought, Reaction } = require('./models');
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
        });
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Create an API route for posting new thoughts


// Create an API route for getting all thoughts


// Create an API route for posting new reactions


// Creating an API route for getting all reactions


// Confirm that the server is listening
app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}!`));