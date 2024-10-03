const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/donateBooks', {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error while connecting to DB', err));

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number, required: true },
  isbn: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);

app.post('/UserData', async (req, res) => {
  try {
    const { userDetails, books } = req.body;

    if (!userDetails || !books) {
      return res.status(400).json({ error: 'User details and books are required.' });
    }

    let user = await User.findOne({ email: userDetails.email });
   
    if (!user) {
      user = new User({
        name: userDetails.name,
        phone: userDetails.phone,
        email: userDetails.email
      });
      await user.save();
    }

    const bookEntries = books.map(book => {
      if (!book.title || !book.author || !book.genre || !book.year || !book.isbn) {
        throw new Error('All book fields are required.');
      }
      return {
        ...book,
        userId: user._id 
      };
    });

    await Book.insertMany(bookEntries);

    res.status(200).json({ message: 'Data inserted successfully!' });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: error.message || 'Error inserting data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
