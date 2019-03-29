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
  },
  phoneNumber: {
    type: Number,
    min: [10, 'El número debe tener al menos 10 dígitos'],
  }
}, {
  collection: 'Users',
  timestamps: true
});

module.exports = User = mongoose.model('User', UserSchema);