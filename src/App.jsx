import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Planner from './pages/Planner'
import History from './pages/History';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Planner />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
