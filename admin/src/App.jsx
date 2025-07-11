import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/login.jsx';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* other routes */}
    </Routes>
  );
}
export default App;