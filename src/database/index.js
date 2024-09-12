const mongoose = require('mongoose');
require('dotenv').config();

class Database {
    constructor() {

        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
          throw new Error('The MONGODB_URI environment variable is not configured.');
        }

        mongoose.connect(mongoUri);
        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
            console.log('Connected to the MongoDB database');
          });
    };
};

module.exports = new Database();