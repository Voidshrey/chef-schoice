import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import LoginPage from './components/LoginPage';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Favorites from './components/Favorites';
import { UserProvider } from './context/UserContext.jsx';

function App() {

  return (
    <UserProvider>
    <div className="App">
      <Navbar/>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
    </div>
     </UserProvider>
  );
}

export default App;