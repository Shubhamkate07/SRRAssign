const express = require('express');
const mongoose = require('mongoose');
const axios =require('axios');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/donateBooks', {
  
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error while connecting to DB',err));

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  year: Number,
  isbn: String
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  books: [bookSchema]
});

const User = mongoose.model('User', userSchema);

// API Endpoint to store user and books data using insertMany
app.post('/UserData', async (req, res) => {
  try {
    const { userDetails, books } = req.body;

    // Creating the user and books array
    const userWithBooks = {
      name: userDetails.name,
      phone: userDetails.phone,
      email: userDetails.email,
      books: books
    };

    // Using insertMany to insert multiple users (here, only one is inserted)
    await User.insertMany([userWithBooks]);

    // Send success response back to client
    res.status(200).json({ message: 'Data inserted successfully!' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Error inserting data' });
  }
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
