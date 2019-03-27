const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email :{
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  collection: 'Users',
  timestamps: true
});

module.exports = User = mongoose.model('User', UserSchema);