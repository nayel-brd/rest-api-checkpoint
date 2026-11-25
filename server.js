// Load environment variables from config/.env
require('dotenv').config({ path: './config/.env' });

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json()); // parse JSON request bodies

// GET: return all users
app.get('/users', async (req, res) => {
  try {
    // find() with no filter returns every document in the collection
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: add a new user to the database
app.post('/users', async (req, res) => {
  try {
    // create() builds a new document from the body and saves it
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: edit a user by id
app.put('/users/:id', async (req, res) => {
  try {
    // findByIdAndUpdate updates the document; { new: true } returns the updated version
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: remove a user by id
app.delete('/users/:id', async (req, res) => {
  try {
    // findByIdAndDelete removes the document and returns it (Mongoose 8 replacement for findByIdAndRemove)
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted', user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  });
