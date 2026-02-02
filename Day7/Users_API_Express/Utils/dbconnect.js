const mongoose = require('mongoose');
const MONGO_URL =
  'mongodb+srv://tamern0227_db_user:U0nf5mYPQKumczlj@cluster0.rkqfyte.mongodb.net/testData?retryWrites=true&w=majority';

const mongoConnect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB via Mongoose');
    return mongoose.connection;
  } catch (err) {
    console.error('Error while connecting to Mongo via Mongoose:', err);
    throw err;
  }
};

module.exports = { mongoConnect };
