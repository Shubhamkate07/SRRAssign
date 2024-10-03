import React, { useState, useEffect } from 'react';
import './DonateBook.scss'; // Assuming you have some custom CSS
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DonateBook = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ name: '', phone: '', email: '' });
  const [books, setBooks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [resdata, setresdata] = useState('');

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem('items'));
    if (storedBooks) {
      setBooks(storedBooks);
    }
  }, []);

  const handleUserChange1 = (e) => {
    setUserDetails({ ...userDetails, name: e.target.value });
  };

  const handleUserChange2 = (e) => {
    setUserDetails({ ...userDetails, phone: e.target.value });
  };

  const handleUserChange3 = (e) => {
    setUserDetails({ ...userDetails, email: e.target.value });
  };


  const addBookRow = () => {
    setBooks([...books, { title: '', author: '', genre: '', year: '', isbn: '' }]);
    setEditingIndex(books.length);
  };

  const handleBookChange = (index, e) => {
    const updatedBooks = books.map((book, i) =>
      i === index ? { ...book, [e.target.name]: e.target.value } : book
    );
    setBooks(updatedBooks);
  };

  const editRow = (index) => {
    setEditingIndex(index);
  };

  const deleteRow = (index) => {
    const updatedBooks = books.filter((_, ind) => index !== ind);
    setBooks(updatedBooks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails.name || !userDetails.phone || !userDetails.email || books.length === 0) {
      toast.error("Please add at least one book!", {
        position: 'top-center',
      });
      return; 
    }

    const details = {
      userDetails: userDetails,
      books: books,
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/UserData', details);
      console.log(response.data);
      setresdata(response.data.message); 
      toast.success('Data Added Successfully!', {
        position: 'top-center',
      });

      setUserDetails({ name: '', phone: '', email: '' });
    
    } catch (err) {
      console.error('Error:', err);
      toast.error('Something went wrong!', {
        position: 'top-center',
        className: 'custom-toast'
      });
    }
  };

  const Alldetails = () => {
    console.log('book data:', books);
    navigate('/detail', { state: { books:books } });
  };

  return (
    <div className="donate-book-container">
      <ToastContainer />
      <button className='add-row-btn' onClick={Alldetails}>View All Books details</button>
      <h1>Donate a Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="user-details">
          <label>
            Name: <input type="text" name="name" value={userDetails.name} onChange={handleUserChange1} required />
          </label>
          <label>
            Phone: <input type="text" name="phone" value={userDetails.phone} onChange={handleUserChange2} required />
          </label>
          <label>
            Email: <input type="email" name="email" value={userDetails.email} onChange={handleUserChange3} required />
          </label>
        </div>

        <table>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Book Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Year of Publication</th>
              <th>ISBN</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    type="text"
                    name="title"
                    value={book.title}
                    onChange={(e) => handleBookChange(index, e)}
                    required
                    disabled={editingIndex !== index}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="author"
                    value={book.author}
                    onChange={(e) => handleBookChange(index, e)}
                    required
                    disabled={editingIndex !== index}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="genre"
                    value={book.genre}
                    onChange={(e) => handleBookChange(index, e)}
                    required
                    disabled={editingIndex !== index}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="year"
                    value={book.year}
                    onChange={(e) => handleBookChange(index, e)}
                    required
                    disabled={editingIndex !== index}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="isbn"
                    value={book.isbn}
                    onChange={(e) => handleBookChange(index, e)}
                    required
                    disabled={editingIndex !== index}
                  />
                </td>
                <td>
                  <button type="button" onClick={() => editRow(index)}>Edit</button>
                  <button type="button" onClick={() => deleteRow(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="add-row-btn" onClick={addBookRow}>Add Book</button>
        <button type="submit" className="submit-btn">Submit</button>

        <p>{resdata}</p>
      </form>
    </div>
  );
};

export default DonateBook;




// import React, { useState, useEffect } from 'react';
// import './DonateBook.css';
// import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const DonateBook = () => {
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState({ name: '', phone: '', email: '' });
//   const [books, setBooks] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [resdata, setResData] = useState('');

//   // Load books from localStorage for the signed-in user when the component mounts
//   useEffect(() => {
//     const emailKey = userDetails.email; // Use the email to create a unique key
//     const storedBooks = JSON.parse(localStorage.getItem(emailKey));
//     if (storedBooks) {
//       setBooks(storedBooks);
//     }
//   }, [userDetails.email]); // Dependency on email to re-fetch books when it changes

//   // Save books to localStorage whenever books state changes
//   useEffect(() => {
//     if (userDetails.email) { // Only save if email is available
//       localStorage.setItem(userDetails.email, JSON.stringify(books));
//     }
//   }, [books, userDetails.email]); // Save books under user-specific email

//   // Separate handlers for each user input
//   const handleUserChange1 = (e) => {
//     setUserDetails({ ...userDetails, name: e.target.value });
//   };

//   const handleUserChange2 = (e) => {
//     setUserDetails({ ...userDetails, phone: e.target.value });
//   };

//   const handleUserChange3 = (e) => {
//     setUserDetails({ ...userDetails, email: e.target.value });
//   };

//   // Adding a new row for a book entry
//   const addBookRow = () => {
//     setBooks([...books, { title: '', author: '', genre: '', year: '', isbn: '' }]);
//     setEditingIndex(books.length);
//   };

//   // Handling book input changes
//   const handleBookChange = (index, e) => {
//     const updatedBooks = books.map((book, i) =>
//       i === index ? { ...book, [e.target.name]: e.target.value } : book
//     );
//     setBooks(updatedBooks);
//   };

//   // Editing a row
//   const editRow = (index) => {
//     setEditingIndex(index);
//   };

//   // Deleting a book row
//   const deleteRow = (index) => {
//     const updatedBooks = books.filter((_, ind) => index !== ind);
//     setBooks(updatedBooks);
//   };

//   // Submitting form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userDetails.name || !userDetails.phone || !userDetails.email || books.length === 0) {
//       toast.error("Please add at least one book!", {
//         position: 'top-center',
//       });
//       return; // Stop the function execution if validation fails
//     }

//     const details = {
//       userDetails: userDetails,
//       books: books,
//     };

//     try {
//       const response = await axios.post('http://127.0.0.1:5000/UserData', details);
//       console.log(response.data);
//       setResData(response.data.message); // Use the message from the response
//       toast.success('Data Added Successfully!', {
//         position: 'top-center',
//       });

//       // Reset form fields after successful submission
//       setUserDetails({ name: '', phone: '', email: '' });
//       // setBooks([]); // Clear the books array after submission
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('Something went wrong!', {
//         position: 'top-center',
//         className: 'custom-toast'
//       });
//     }
//   };

//   const Alldetails = () => {
//     console.log('book data:', books);
//     navigate('/detail', { state: { books: books } });
//   };

//   return (
//     <div className="donate-book-container">
//       <ToastContainer />
//       <button className='add-row-btn' onClick={Alldetails}>View All Books details</button>
//       <h1>Donate a Book</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="user-details">
//           <label>
//             Name: <input type="text" name="name" value={userDetails.name} onChange={handleUserChange1} required />
//           </label>
//           <label>
//             Phone: <input type="text" name="phone" value={userDetails.phone} onChange={handleUserChange2} required />
//           </label>
//           <label>
//             Email: <input type="email" name="email" value={userDetails.email} onChange={handleUserChange3} required />
//           </label>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>S No.</th>
//               <th>Book Title</th>
//               <th>Author</th>
//               <th>Genre</th>
//               <th>Year of Publication</th>
//               <th>ISBN</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>
//                   <input
//                     type="text"
//                     name="title"
//                     value={book.title}
//                     onChange={(e) => handleBookChange(index, e)}
//                     required
//                     disabled={editingIndex !== index}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="author"
//                     value={book.author}
//                     onChange={(e) => handleBookChange(index, e)}
//                     required
//                     disabled={editingIndex !== index}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="genre"
//                     value={book.genre}
//                     onChange={(e) => handleBookChange(index, e)}
//                     required
//                     disabled={editingIndex !== index}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     name="year"
//                     value={book.year}
//                     onChange={(e) => handleBookChange(index, e)}
//                     required
//                     disabled={editingIndex !== index}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     name="isbn"
//                     value={book.isbn}
//                     onChange={(e) => handleBookChange(index, e)}
//                     required
//                     disabled={editingIndex !== index}
//                   />
//                 </td>
//                 <td>
//                   <button type="button" onClick={() => editRow(index)}>Edit</button>
//                   <button type="button" onClick={() => deleteRow(index)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button type="button" className="add-row-btn" onClick={addBookRow}>Add Book</button>
//         <button type="submit" className="submit-btn">Submit</button>

//         <p>{resdata}</p>
//       </form>
//     </div>
//   );
// };

// export default DonateBook;
