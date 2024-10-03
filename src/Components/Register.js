import React, { useState } from 'react';
import './Register.scss';
import { Link } from 'react-router-dom';
import db, { auth } from './firebase';
import { collection,addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);


    try{
  await createUserWithEmailAndPassword(auth,email,password);
  const user=auth.currentUser;
  console.log(user);
  
  if(user){
    await addDoc(collection(db, 'Register'), {
        user:username,
        email:email,
        password:password
      });
 
    toast.success('Registeration successfully!',{
        position:'top-center'
    })

      setUsername('');
      setEmail('');
      setPassword('');
  }
    }catch(err){
console.log(err);
if(err.code==='auth/email-already-in-use'){

    toast.error('User Aleredy Exists..use Other email or SIgn In',{
        position:'top-center'
    })
    setEmail('');
    setPassword('');
}
    }
  };

  return (
    <div className='container'>
        <ToastContainer/>
      <div className='form-container'>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='username'>Username:</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <button type='submit' className='btn'>Register</button>

          <p style={{paddingTop:'15px'}}>Alerady have account?<Link to={'/'} style={{color:'red', cursor:'pointer', textDecoration:'none'}}> SignIn</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;