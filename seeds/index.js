const { User, Thought, Reaction } = require('../models');
const users = require('./users');
const thoughts = require('./thoughts');
// const reactions = require('./reactions');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const seeder = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jzvhqpy.mongodb.net/nosqlSocialNetworkApi?retryWrites=true&w=majority`);

    await User.deleteMany();
    await Thought.deleteMany();
    // await Reaction.deleteMany();

    const newUsers = await User.insertMany(users);

    console.log(JSON.stringify(newUsers, null, 2));

    thoughts.forEach((thought, index) => {
        if (index === 0) {
            thought.userId = newUsers[0]._id;
        }

        if (index === 1) {
            thought.userId = newUsers[1]._id;
        }

        if (index === 2) {
            thought.userId = newUsers[2]._id;
        }
    });

    await Thought.insertMany(thoughts);

    process.exit(0);
};

seeder();