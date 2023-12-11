import React from 'react';
import Dashboard from './Components/Dashboard';
import HomePage from './Components/HomePage';
import Profile from './Components/Profile';
import {BrowserRouter, Routes,Route } from "react-router-dom";
const App = () => {
  
  return (
    <div>
      <BrowserRouter> 
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Profile" element={<Profile/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App