import React from 'react'
import DonateBook from './Components/DonateBook'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detailed from './Components/Detailed';
import SignIn from './Components/SignIn';
import Register from './Components/Register';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/home' element={<DonateBook />}></Route>
          <Route path='/detail' element={<Detailed />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
