// src/components/pesertaform.jsx
import React, { useState, useEffect } from 'react';

function PesertaForm({ initialData = {}, onSave }) {
  const [data, setData] = useState({ name: '', email: '' });

  useEffect(() => {
    // Isi form jika ada data awal (untuk Edit)
    if (initialData.id) {
      setData({ name: initialData.name, email: initialData.email });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.email) return alert('Nama dan Email wajib diisi.');
    onSave(data, initialData.id); 
    setData({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'inline-block' }}>
      <input 
        value={data.name} 
        onChange={(e) => setData({ ...data, name: e.target.value })} 
        placeholder="Nama Peserta" 
        style={{ marginRight: '5px' }}
      />
      <input 
        value={data.email} 
        onChange={(e) => setData({ ...data, email: e.target.value })} 
        placeholder="Email Peserta" 
        style={{ marginRight: '5px' }}
      />
      <button type="submit">{initialData.id ? 'Simpan Perubahan' : 'Tambah Peserta'}</button>
    </form>
  );
}

export default PesertaForm;