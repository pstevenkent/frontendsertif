// src/pages/pesertapage.jsx
import React, { useState, useEffect } from 'react';
import { getAllPeserta, addPeserta, deletePeserta, editPeserta } from '../api/Api';
import PesertaForm from '../components/pesertaform';

function PesertaPage() {
  const [pesertaList, setPesertaList] = useState([]);
  const [editingPeserta, setEditingPeserta] = useState(null);

  const fetchPeserta = async () => {
    const res = await getAllPeserta();
    setPesertaList(res.data);
  };

  useEffect(() => {
    fetchPeserta();
  }, []);

  const handleSavePeserta = async (data, id) => {
    if (id) {
      await editPeserta(id, data);
      setEditingPeserta(null);
    } else {
      await addPeserta(data);
    }
    fetchPeserta();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus peserta? Pendaftaran terkait juga akan dihapus.")) {
      await deletePeserta(id);
      fetchPeserta();
    }
  };

  return (
    <div>
      <h2>Manajemen Data Peserta (CRUD)</h2>
      
      <h3>{editingPeserta ? 'Edit Peserta' : 'Tambah Peserta Baru'}</h3>
      <PesertaForm 
        onSave={handleSavePeserta} 
        initialData={editingPeserta || {}} 
      />
      <button onClick={() => setEditingPeserta(null)} disabled={!editingPeserta}>Batal Edit</button>

      <h3>Daftar Peserta</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {pesertaList.map(p => (
          <li key={p.id} style={{ margin: '10px 0', borderBottom: '1px dotted #eee' }}>
            ({p.id}) **{p.name}** ({p.email})
            <button onClick={() => setEditingPeserta(p)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(p.id)} style={{ marginLeft: '5px', background: 'red', color: 'white' }}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PesertaPage;