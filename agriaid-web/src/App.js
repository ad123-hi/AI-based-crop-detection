import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import ResultPage from './pages/ResultPage';
import './App.css'; // We will add styles here

// A simple Navbar component
function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">AgriAid</Link>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/upload">New Scan</Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/result/:id" element={<ResultPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;