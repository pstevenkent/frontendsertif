import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPeserta, createPeserta, updatePeserta, deletePeserta } from '../api/Api';

export default function PesertaPage() {
    const [peserta, setPeserta] = useState([]);
    const [form, setForm] = useState({ nama: '', email: '', nomor_hp: '' });
    const [isEditing, setIsEditing] = useState(null);

    const fetchPeserta = async () => {
        try {
            const { data } = await getPeserta();
            // Asumsi data.data berisi array peserta
            console.log("data: " + JSON.stringify(data))
            setPeserta(data.data);
        } catch (error) {
            console.error("Gagal memuat peserta:", error);
        }
    };

    useEffect(() => { fetchPeserta(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updatePeserta(isEditing, form);
            } else {
                await createPeserta(form);
            }
            // Reset form
            setForm({ nama: '', email: '', nomor_hp: '' });
            setIsEditing(null);
            fetchPeserta();
        } catch (error) {
            alert("Gagal menyimpan data.");
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Hapus peserta ini?')) {
            try {
                await deletePeserta(id);
                fetchPeserta();
            } catch (error) {
                alert("Gagal menghapus peserta.");
            }
        }
    };

    const handleEdit = (p) => {
        // Memuat data peserta yang dipilih ke form
        setForm({ nama: p.nama, email: p.email, nomor_hp: p.nomor_hp });
        setIsEditing(p.id);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Manajemen Data Peserta</h1>

            {/* Form Input/Edit (Integrasi Langsung) */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    {isEditing ? 'Edit Data Peserta' : 'Tambah Peserta Baru'}
                </h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        className="border p-2 rounded w-full"
                        placeholder="Nama Lengkap"
                        value={form.nama}
                        onChange={e => setForm({ ...form, nama: e.target.value })}
                        required
                    />
                    <input
                        className="border p-2 rounded w-full"
                        placeholder="Email"
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                    />
                    <input
                        className="border p-2 rounded w-full"
                        placeholder="Nomor HP"
                        value={form.nomor_hp}
                        onChange={e => setForm({ ...form, nomor_hp: e.target.value })}
                        required
                    />
                    <div className="flex gap-2">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                            {isEditing ? 'Simpan Perubahan' : 'Tambah Peserta'}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={() => { setIsEditing(null); setForm({ nama: '', email: '', nomor_hp: '' }) }} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                                Batal
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Tabel Data */}
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Daftar Seluruh Peserta</h3>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No HP</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {peserta.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.nama}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.nomor_hp}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    <Link to={`/peserta/${p.id}`} className="text-blue-600 hover:text-blue-900">Detail</Link>
                                    <button onClick={() => handleEdit(p)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {peserta.length === 0 && (
                    <div className="text-center py-4 text-gray-500">Tidak ada data peserta.</div>
                )}
            </div>
        </div>
    );
}