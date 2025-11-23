import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getKelasDetail, getKelasParticipants } from '../api/Api';

export default function KelasDetailPage() {
  const { id } = useParams();
  const kelasId = parseInt(id);
  const [kelas, setKelas] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isNaN(kelasId)) {
        setLoading(false);
        return;
      }
      try {
        // Fetch Kelas Detail 
        const kRes = await getKelasDetail(kelasId);
        setKelas(kRes.data.data); 

        // Fetch Participants 
        const pRes = await getKelasParticipants(kelasId);
        setParticipants(pRes.data); 
      } catch (error) {
        console.error("Gagal memuat detail kelas:", error);
        setKelas(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [kelasId]);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Memuat data...</div>;
  }

  if (!kelas) {
    return <div className="p-8 text-center text-red-500">Kelas dengan ID {id} tidak ditemukan.</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link to="/kelas" className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block">
        &larr; Kembali ke Daftar Kelas
      </Link>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Detail Kelas: {kelas.nama}
      </h2>

      {/* Detail Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="space-y-2 text-gray-700">
          <p><strong>ID Kelas:</strong> {kelas.id}</p>
          <p><strong>Instruktur:</strong> {kelas.instruktor}</p>
          <p><strong>Deskripsi:</strong> {kelas.deskripsi}</p>
        </div>
      </div>

      {/* Participants List */}
      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
        Peserta Terdaftar ({participants.length})
      </h3>
      
      {participants.length === 0 ? (
        <p className="text-gray-500 bg-gray-50 p-4 rounded-lg">Kelas ini belum memiliki peserta terdaftar.</p>
      ) : (
        <div className="space-y-3">
          {participants.map((peserta) => (
            <div key={peserta.id} className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-lg text-gray-900">{peserta.nama}</h4>
                <p className="text-sm text-gray-600">Email: {peserta.email}</p>
              </div>
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
}