import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConfettiSideCannons } from './App';
import Signup from './signup/signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ConfettiSideCannons />} />
      <Route path="/login" element={<ConfettiSideCannons />} />
      <Route path="/signup" element={<Signup />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
