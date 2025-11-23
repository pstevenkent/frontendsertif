import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getKelas, createKelas, updateKelas, deleteKelas } from '../api/Api';

function KelasPage() {
  const [classList, setClassList] = useState([]);
  const [formData, setFormData] = useState({ nama: '', instruktor: '', deskripsi: '' });
  const [editingKelas, setEditingKelas] = useState(null);

  const fetchKelas = async () => {
    try {
        const res = await getKelas();
        // Mengasumsikan response dari API adalah { data: [kelas1, kelas2, ...] }
        setClassList(res.data.data); 
    } catch (error) {
        console.error("Gagal memuat kelas:", error);
    }
  };

  useEffect(() => {
    fetchKelas();
  }, []);
  
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.instruktor || !formData.deskripsi) {
        return alert('Semua kolom wajib diisi.');
    }
    
    try {
        if (editingKelas) {
            await updateKelas(editingKelas.id, formData);
            setEditingKelas(null);
        } else {
            await createKelas(formData);
        }
        
        // Reset form
        setFormData({ nama: '', instruktor: '', deskripsi: '' });
        fetchKelas();
    } catch (error) {
        alert("Gagal menyimpan data kelas.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus kelas? Semua pendaftaran peserta ke kelas ini juga akan dihapus.")) {
        try {
            await deleteKelas(id);
            fetchKelas();
        } catch (error) {
            alert("Gagal menghapus kelas.");
        }
    }
  };

  const startEdit = (kelas) => {
    setEditingKelas(kelas);
    setFormData({ nama: kelas.nama, instruktor: kelas.instruktor, deskripsi: kelas.deskripsi });
  };

  const cancelEdit = () => {
    setEditingKelas(null);
    setFormData({ nama: '', instruktor: '', deskripsi: '' });
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Manajemen Data Kelas</h1>
      
      {/* Form Tambah/Edit Kelas */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          {editingKelas ? 'Edit Kelas: ' + editingKelas.nama : 'Tambah Kelas Baru'}
        </h3>
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div className="md:col-span-1">
                <input 
                    type="text" 
                    className="border p-2 rounded w-full" 
                    value={formData.nama} 
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })} 
                    placeholder="Nama Kelas" 
                    required 
                />
            </div>
            <div className="md:col-span-1">
                <input 
                    type="text" 
                    className="border p-2 rounded w-full" 
                    value={formData.instruktor} 
                    onChange={(e) => setFormData({ ...formData, instruktor: e.target.value })} 
                    placeholder="Instruktur" 
                    required 
                />
            </div>
            <div className="md:col-span-1">
                <input 
                    type="text" 
                    className="border p-2 rounded w-full" 
                    value={formData.deskripsi} 
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })} 
                    placeholder="Deskripsi Singkat" 
                    required 
                />
            </div>
            <div className="md:col-span-1 flex gap-2">
                <button 
                    type="submit" 
                    className={`${editingKelas ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'} text-white px-4 py-2 rounded transition`}
                >
                    {editingKelas ? 'Simpan Perubahan' : 'Tambah Kelas'}
                </button>
                {editingKelas && (
                    <button 
                        type="button" 
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition" 
                        onClick={cancelEdit}
                    >
                        Batal
                    </button>
                )}
            </div>
        </form>
      </div>

      {/* Daftar Kelas (Card View) */}
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">Daftar Seluruh Kelas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classList.map(k => (
          <div 
            key={k.id} 
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-5 border-l-4 border-indigo-500"
          >
            <h4 className="text-xl font-bold text-gray-800">{k.nama}</h4>
            <p className="text-sm text-gray-600 mb-3">Instruktur: {k.instruktor}</p>
            <p className="text-gray-700 text-sm italic">{k.deskripsi}</p>
            
            <div className="mt-4 flex space-x-3">
                {/* TOMBOL DETAIL */}
                <Link 
                    to={`/kelas/${k.id}`} 
                    className="text-blue-600 text-sm font-medium hover:text-blue-800"
                >
                    Detail
                </Link>
                
                <button 
                    className="text-indigo-600 text-sm hover:text-indigo-800" 
                    onClick={() => startEdit(k)}
                >
                    Edit
                </button>
                <button 
                    className="text-red-600 text-sm hover:text-red-800" 
                    onClick={() => handleDelete(k.id)}
                >
                    Hapus
                </button>
            </div>
          </div>
        ))}
        {classList.length === 0 && (
            <div className="text-center py-8 text-gray-500 col-span-3">Belum ada data kelas.</div>
        )}
      </div>
    </div>
  );
}

export default KelasPage;