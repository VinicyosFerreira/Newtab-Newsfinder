import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Search from './components/Search';

export default function App() {
  const [logins] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/search" element={<Search logins={logins}/>} />
      </Routes>
    </Router>
  );
}