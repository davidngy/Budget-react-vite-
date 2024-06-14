import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Planner from './pages/Planner'
import History from './pages/History';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Planner />}>
            <Route path="/history" element={<History />} />
            <Route path="/:budgetId" element={<Planner />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    );
}

export default App;
