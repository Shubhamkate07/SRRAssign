const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/donateBooks', {

})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error while connecting to DB', err));

// Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  year: Number,
  isbn: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String
});

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);

// API Endpoint to store user and books data
app.post('/UserData', async (req, res) => {
  try {
    const { userDetails, books } = req.body;

    // Create or find the user
    let user = await User.findOne({ email: userDetails.email });
    
    // If user doesn't exist, create a new one
    if (!user) {
      user = new User({
        name: userDetails.name,
        phone: userDetails.phone,
        email: userDetails.email
      });
      await user.save();
    }

    // Save the books with reference to the user
    const bookEntries = books.map(book => ({
      ...book,
      userId: user._id // Associate the book with the user's ID
    }));

    // Insert books into the Book collection
    await Book.insertMany(bookEntries);

    // Send success response back to the client
    res.status(200).json({ message: 'Data inserted successfully!' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Error inserting data' });
  }
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

