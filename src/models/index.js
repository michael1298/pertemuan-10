const mongoose = require('mongoose');
const Users = require('./user');

mongoose.connect(
  'mongodb+srv://mike:mike@cluster0.nobqkwb.mongodb.net/?retryWrites=true&w=majority',
);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB Server');
});

module.exports = {
  db,
  Users,
};
