// User model: defines the shape of a user document in MongoDB
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number },
});

// Export the model so server.js can use it
module.exports = mongoose.model('User', userSchema);
