import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import PesertaPage from './pages/pesertapage';
import KelasPage from './pages/kelaspage';
import EnrollmentPage from './pages/enrollmentpage';
import PesertaDetailPage from './pages/pesertadetailpage'; // Import Baru
import KelasDetailPage from './pages/kelasdetailpage';   // Import Baru
// Komponen Link Navigasi dengan styling aktif
function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`block px-4 py-3 rounded-lg transition ${isActive
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        }`}
    >
      {children}
    </Link>
  );
}

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">

        {/* SIDEBAR */}
        <div className="w-64 bg-gray-900 text-white flex-shrink-0">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-400">Skill Hub</h1>
            <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
          </div>
          <nav className="mt-6 px-4 space-y-2">
            <NavLink to="/">Enrollment / Pendaftaran</NavLink>
            <NavLink to="/peserta">Data Peserta</NavLink>
            <NavLink to="/kelas">Data Kelas</NavLink>
          </nav>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto">
          <header className="bg-white shadow-sm py-4 px-6">
            <h2 className="text-xl font-semibold text-gray-700">Panel Admin</h2>
          </header>

          <main className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<EnrollmentPage />} />
              <Route path="/peserta" element={<PesertaPage />} />
              <Route path="/peserta/:id" element={<PesertaDetailPage />} />
              <Route path="/kelas" element={<KelasPage />} />
              <Route path="/kelas/:id" element={<KelasDetailPage />} />

            </Routes>
          </main>
        </div>

      </div>
    </Router>
  );
}

export default App;