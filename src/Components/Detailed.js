// import React, { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';

// const Detailed = () => {
//   const location = useLocation();
//   const { books } = location.state || {};

//   // localStorage.cle
//   // Initialize state from local storage or fallback to provided books
//   const [arr, setArr] = useState(() => {
//     const storedData = JSON.parse(localStorage.getItem('items'));
//     return storedData || books || [];
//   });

//   // Update local storage whenever arr changes
//   useEffect(() => {
//     localStorage.setItem('items', JSON.stringify(arr));
//   }, [arr]);

//   return (
//     <div>
//       <h2>Detailed View</h2>

//       {arr.length > 0 ? (
//         arr.map((ele, ind) => (
//           <div key={ind}> 
//             <p>Title: {ele.title}</p>
//             <p>Author: {ele.author}</p>
//             <p>Genre: {ele.genre}</p>
//             <p>Year: {ele.year}</p>
//             <p>ISBN: {ele.isbn}</p>
//           </div>
//         ))
//       ) : (
//         <p>No book details available.</p> // Fallback message if arr is empty
//       )}

//       <Link to={'/'} style={{
//         display: 'inline-block', 
//         padding: '10px 20px', 
//         backgroundColor: '#007BFF', 
//         color: 'white', 
//         textDecoration: 'none', 
//         borderRadius: '5px', 
//         marginTop: '20px'
//       }}>
//         Home
//       </Link>
//     </div>
//   );
// };

// export default Detailed;


// import React, { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';

// const Detailed = () => {
//   const location = useLocation();
//   const { books } = location.state || {};

//   // Initialize state from local storage or fallback to provided books
//   const [arr, setArr] = useState(() => {
//     const storedData = JSON.parse(localStorage.getItem('items'));
//     return storedData || books || [];
//   });

//   // Update local storage whenever arr changes
//   useEffect(() => {
//     localStorage.setItem('items', JSON.stringify(arr));
//   }, [arr]);

//   return (
//     <div>
//       <h2>Detailed View</h2>

//       {arr.length > 0 ? (
//         arr.map((ele, ind) => (
//           <div key={ind}> 
//             <p>Title: {ele.title}</p>
//             <p>Author: {ele.author}</p>
//             <p>Genre: {ele.genre}</p>
//             <p>Year: {ele.year}</p>
//             <p>ISBN: {ele.isbn}</p>
//           </div>
//         ))
//       ) : (
//         <p>No book details available.</p>
//       )}

//       <Link to={'/'} style={{
//         display: 'inline-block', 
//         padding: '10px 20px', 
//         backgroundColor: '#007BFF', 
//         color: 'white', 
//         textDecoration: 'none', 
//         borderRadius: '5px', 
//         marginTop: '20px'
//       }}>
//         Home
//       </Link>
//     </div>
//   );
// };

// export default Detailed;



// import React, { useEffect, useState } from 'react';
// import { useLocation, Link } from 'react-router-dom';

// const Detailed = () => {
//   const location = useLocation();
//   const { books } = location.state || {};

//   // Initialize state from local storage or fallback to provided books
//   const [arr, setArr] = useState(() => {
//     const storedData = JSON.parse(localStorage.getItem('items'));
//     return storedData || []; // Only fallback to books if storedData is null
//   });

//   // If books are available and not already in arr, merge them
//   useEffect(() => {
//     if (books && !arr.length) {
//       setArr(books); // Set arr to books if arr is empty
//     }
//   }, [books, arr]);

//   // Update local storage whenever arr changes
//   useEffect(() => {
//     localStorage.setItem('items', JSON.stringify(arr));
//   }, [arr]);

//   return (
//     <div>
//       <h2>Detailed View</h2>

//       {arr.length > 0 ? (
//         arr.map((ele, ind) => (
//           <div key={ind}>
//             <p>Title: {ele.title}</p>
//             <p>Author: {ele.author}</p>
//             <p>Genre: {ele.genre}</p>
//             <p>Year: {ele.year}</p>
//             <p>ISBN: {ele.isbn}</p>
//           </div>
//         ))
//       ) : (
//         <p>No book details available.</p>
//       )}

//       <Link to={'/'} style={{
//         display: 'inline-block',
//         padding: '10px 20px',
//         backgroundColor: '#007BFF',
//         color: 'white',
//         textDecoration: 'none',
//         borderRadius: '5px',
//         marginTop: '20px'
//       }}>
//         Home
//       </Link>
//     </div>
//   );
// };

// export default Detailed;




import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Detailed = () => {
  const location = useLocation();
  const { books } = location.state || {};

  // Initialize state from provided books
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
        <p>No book details available.</p> // Fallback message if arr is empty
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
