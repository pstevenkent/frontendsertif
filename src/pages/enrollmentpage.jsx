import React, { useState, useEffect } from 'react';
import { getPeserta, getKelas, enrollPeserta, unenrollPeserta, getPesertaClasses } from '../api/Api';

export default function EnrollmentPage() {
    const [pesertaList, setPesertaList] = useState([]);
    const [kelasList, setKelasList] = useState([]);

    // State Seleksi
    const [selectedPeserta, setSelectedPeserta] = useState('');
    const [selectedKelas, setSelectedKelas] = useState('');

    // State Data Tampilan
    const [enrolledClasses, setEnrolledClasses] = useState([]);

    // Load Data Awal
    useEffect(() => {
        const loadMasterData = async () => {
            const pRes = await getPeserta();
            const kRes = await getKelas();
            setPesertaList(pRes.data.data);
            setKelasList(kRes.data.data);
        };
        loadMasterData();
    }, []);

    // Load Kelas saat Peserta dipilih
    useEffect(() => {
        if (selectedPeserta) {
            fetchEnrolledClasses(selectedPeserta);
        } else {
            setEnrolledClasses([]);
        }
    }, [selectedPeserta]);

    const fetchEnrolledClasses = async (pesertaId) => {
        try {
            const res = await getPesertaClasses(pesertaId);
            setEnrolledClasses(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEnroll = async () => {
        if (!selectedPeserta || !selectedKelas) return alert("Pilih peserta dan kelas!");
        try {
            console.log("masuk sini bang")
            await enrollPeserta({
                pesertaId: parseInt(selectedPeserta),
                kelasId: parseInt(selectedKelas)
            });
            alert("Berhasil mendaftar!");
            fetchEnrolledClasses(selectedPeserta); 
        } catch (error) {
            alert("Gagal mendaftar (mungkin sudah terdaftar).");
        }
    };

    const handleUnenroll = async (kelasId) => {
        if (!confirm("Batalkan pendaftaran ini?")) return;
        try {
            await unenrollPeserta({
                pesertaId: parseInt(selectedPeserta),
                kelasId: parseInt(kelasId)
            });
            fetchEnrolledClasses(selectedPeserta); 
        } catch (error) {
            alert("Gagal membatalkan.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Manajemen Pendaftaran (Enrollment)</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Form Pendaftaran</h3>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Peserta</label>
                        <select
                            className="w-full border p-2 rounded bg-gray-50 focus:ring-2 focus:ring-blue-500"
                            value={selectedPeserta}
                            onChange={(e) => setSelectedPeserta(e.target.value)}
                        >
                            <option value="">-- Pilih Peserta --</option>
                            {pesertaList.map(p => <option key={p.id} value={p.id}>{p.nama} ({p.email})</option>)}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Kelas Tujuan</label>
                        <select
                            className="w-full border p-2 rounded bg-gray-50 focus:ring-2 focus:ring-blue-500"
                            value={selectedKelas}
                            onChange={(e) => setSelectedKelas(e.target.value)}
                        >
                            <option value="">-- Pilih Kelas --</option>
                            {kelasList.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}
                        </select>
                    </div>

                    <button
                        onClick={handleEnroll}
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 font-semibold transition"
                    >
                        Daftarkan Peserta
                    </button>
                </div>

                {/* BAGIAN KANAN: List Kelas Peserta */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4 border-b pb-2">
                        Daftar Kelas yang Diikuti
                        {selectedPeserta && <span className="text-sm font-normal text-gray-500 ml-2"> (Untuk ID Peserta: {selectedPeserta})</span>}
                    </h3>

                    {!selectedPeserta ? (
                        <div className="text-center text-gray-400 py-10">Silakan pilih peserta di sebelah kiri untuk melihat data.</div>
                    ) : enrolledClasses.length === 0 ? (
                        <div className="text-center text-gray-500 py-10">Peserta ini belum mengikuti kelas apapun.</div>
                    ) : (
                        <div className="space-y-3">
                            {enrolledClasses.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                                    <div>
                                        <h4 className="font-bold text-gray-800">{item.nama}</h4>
                                        <p className="text-sm text-gray-600">Instruktur: {item.instruktor}</p>
                                    </div>
                                    <button
                                        onClick={() => handleUnenroll(item.id)}
                                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium"
                                    >
                                        Batalkan
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}