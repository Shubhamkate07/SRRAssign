import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Detailed = () => {
  const location = useLocation();
  const { books } = location.state || {};

  const [arr, setArr] = useState(books || []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Detailed View</h2>

      {arr.length > 0 ? (
        arr.map((ele, ind) => (
          <div key={ind} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
            <p><strong>Title:</strong> {ele.title}</p>
            <p><strong>Author:</strong> {ele.author}</p>
            <p><strong>Genre:</strong> {ele.genre}</p>
            <p><strong>Year:</strong> {ele.year}</p>
            <p><strong>ISBN:</strong> {ele.isbn}</p>
          </div>
        ))
      ) : (
        <p>No book details available.</p> 
      )}

      <Link to={'/home'} style={{
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        Home
      </Link>
    </div>
  );
};

export default Detailed;
