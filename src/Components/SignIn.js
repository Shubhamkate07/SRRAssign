import React, { useState } from 'react';
import './SignIn.scss';
import { Link, useNavigate } from 'react-router-dom';
import db, { auth } from './firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      const user = userData.user;

      if (user) {
       
        localStorage.setItem('currentUser', email);

        await addDoc(collection(db, 'signinData'), {
          email: email,
          password: password, 
        });

        toast.success('Signed In Successfully!', {
          position: 'top-center',
        });

        setEmail('');
        setPassword('');

        navigate('/home');
      }
    } catch (err) {
      console.error(err); 

      if (err.code === 'auth/invalid-credential') {
        toast.error('Invalid credentials! Please check your email and password.', {
          position: 'top-center',
        });
      } else {
        toast.error('Something went wrong!', {
          position: 'top-center',
        });
      }
    }
  };

  return (
    <div className='container'>
      <ToastContainer />
      <div className='form-container'>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='btn'>Sign In</button>
          <p style={{ paddingTop: '15px' }}>
            Don't have an account?{' '}
            <Link to={'/register'} style={{ color: 'red', cursor: 'pointer', textDecoration: 'none' }}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
