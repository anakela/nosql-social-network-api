const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { User, Friend, Thought, Reaction } = require('./models');

const app = express();

const PORT = process.env.PORT || 3001;

// Connect to MongoDB database
mongoose.connect(DB_NAME.process.env)
    .then(() => {
        console.log(`Successfully connected!`);
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

// Create an API route for posting new thoughts


// Create an API route for getting all thoughts


// Create an API route for posting new reactions


// Creating an API route for getting all reactions


// Create an API route for posting new friends


// Create an API route for getting all friends

// Confirm that the server is listening
app.listen(PORT, () => console.log(`Now listening on ${PORT}!`));