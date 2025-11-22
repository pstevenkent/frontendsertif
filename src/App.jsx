// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/homepage';
import PesertaPage from './pages/pesertapage';
import KelasPage from './pages/kelaspage';

function App() {
  return (
    <Router>
      <nav style={{ padding: '15px', background: '#333', color: 'white' }}>
        <Link to="/" style={{ color: 'white', marginRight: '25px', textDecoration: 'none' }}>🏠 Home (Pendaftaran M:M)</Link>
        <Link to="/peserta" style={{ color: 'white', marginRight: '25px', textDecoration: 'none' }}>👨‍🎓 Manajemen Peserta</Link>
        <Link to="/kelas" style={{ color: 'white', textDecoration: 'none' }}>📚 Manajemen Kelas</Link>
      </nav>
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/peserta" element={<PesertaPage />} />
          <Route path="/kelas" element={<KelasPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;