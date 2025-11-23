import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPesertaDetail, getPesertaClasses } from '../api/Api';

export default function PesertaDetailPage() {
    const { id } = useParams();
    const pesertaId = parseInt(id); // PASTIKAN ID ADALAH INTEGER
    const [peserta, setPeserta] = useState(null);
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("params id : " + pesertaId)
        const fetchData = async () => {
            // Cek jika ID tidak valid
            if (isNaN(pesertaId)) {
                setLoading(false);
                return;
            }
            try {
                // 1. Fetch Peserta Detail (Akses data menggunakan .data.data)
                const pRes = await getPesertaDetail(pesertaId);
                setPeserta(pRes.data.data);

                // 2. Fetch Enrolled Classes (Akses data menggunakan .data)
                const cRes = await getPesertaClasses(pesertaId);
                setEnrolledClasses(cRes.data);
            } catch (error) {
                console.error("Gagal memuat detail peserta:", error);
                setPeserta(null);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []); // Dependency diubah ke pesertaId (integer)

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Memuat data...</div>;
    }

    if (!peserta) {
        return <div className="p-8 text-center text-red-500">Peserta dengan ID {id} tidak ditemukan.</div>;
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Link to="/peserta" className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block">
                &larr; Kembali ke Daftar Peserta
            </Link>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                Detail Peserta: {peserta.nama}
            </h2>

            {/* Detail Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <p><strong>ID:</strong> {peserta.id}</p>
                    <p><strong>Nama:</strong> {peserta.nama}</p>
                    <p><strong>Email:</strong> {peserta.email}</p>
                    <p><strong>Nomor HP:</strong> {peserta.nomor_hp}</p>
                </div>
            </div>

            {/* Enrolled Classes List */}
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Kelas yang Diikuti ({enrolledClasses.length})
            </h3>

            {enrolledClasses.length === 0 ? (
                <p className="text-gray-500 bg-gray-50 p-4 rounded-lg">Peserta ini belum terdaftar di kelas manapun.</p>
            ) : (
                <div className="space-y-3">
                    {enrolledClasses.map((kelas) => (
                        <div key={kelas.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-indigo-500 flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-lg text-gray-900">{kelas.nama}</h4>
                                <p className="text-sm text-gray-600">Instruktur: {kelas.instruktor}</p>
                            </div>
                       
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}