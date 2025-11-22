// src/pages/kelaspage.jsx
import React, { useState, useEffect } from 'react';
import { getAllKelas, addKelas, deleteKelas, editKelas } from '../api/Api';

function KelasPage() {
  const [classList, setClassList] = useState([]);
  const [newKelas, setNewKelas] = useState({ name: '', instructor: '' });
  const [editingKelas, setEditingKelas] = useState(null);

  const fetchKelas = async () => {
    const res = await getAllKelas();
    setClassList(res.data);
  };

  useEffect(() => {
    fetchKelas();
  }, []);

  const handleSaveKelas = async (e) => {
    e.preventDefault();
    if (!newKelas.name || !newKelas.instructor) return alert('Data wajib diisi.');
    
    if (editingKelas) {
      await editKelas(editingKelas.id, newKelas);
      setEditingKelas(null);
    } else {
      await addKelas(newKelas);
    }
    setNewKelas({ name: '', instructor: '' });
    fetchKelas();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus kelas? Pendaftaran terkait juga akan dihapus.")) {
      await deleteKelas(id);
      fetchKelas();
    }
  };

  const startEdit = (kelas) => {
    setEditingKelas(kelas);
    setNewKelas({ name: kelas.name, instructor: kelas.instructor });
  };

  return (
    <div>
      <h2>Manajemen Data Kelas (CRUD)</h2>
      
      <h3>{editingKelas ? 'Edit Kelas' : 'Tambah Kelas Baru'}</h3>
      <form onSubmit={handleSaveKelas}>
          <input value={newKelas.name} onChange={(e) => setNewKelas({ ...newKelas, name: e.target.value })} placeholder="Nama Kelas" />
          <input value={newKelas.instructor} onChange={(e) => setNewKelas({ ...newKelas, instructor: e.target.value })} placeholder="Instruktur" />
          <button type="submit">{editingKelas ? 'Simpan Perubahan' : 'Tambah Kelas'}</button>
          {editingKelas && <button type="button" onClick={() => setEditingKelas(null)}>Batal</button>}
      </form>

      <h3>Daftar Kelas</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {classList.map(c => (
          <li key={c.id} style={{ margin: '10px 0', borderBottom: '1px dotted #eee' }}>
            ({c.id}) **{c.name}** (Oleh: {c.instructor})
            <button onClick={() => startEdit(c)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(c.id)} style={{ marginLeft: '5px', background: 'red', color: 'white' }}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KelasPage;