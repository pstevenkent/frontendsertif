// src/pages/homepage.jsx
import React, { useState, useEffect } from 'react';
import { getAllPeserta, getAllKelas, getEnrolledClasses, enrollPeserta, removeEnrollment } from '../api/Api';
import ClassList from '../components/classlist';

function HomePage() {
    const [pesertaList, setPesertaList] = useState([]);
    const [classList, setClassList] = useState([]);
    const [activePeserta, setActivePeserta] = useState(null);
    const [enrolledClasses, setEnrolledClasses] = useState([]);

    const fetchData = async () => {
        const [pRes, cRes] = await Promise.all([getAllPeserta(), getAllKelas()]);
        setPesertaList(pRes.data);
        setClassList(cRes.data);
        if (pRes.data.length > 0) setActivePeserta(pRes.data[0]);
    };

    const fetchEnrollments = async (pesertaId) => {
        if (!pesertaId) return setEnrolledClasses([]);
        const res = await getEnrolledClasses(pesertaId);
        setEnrolledClasses(res.data);
    };

    useEffect(() => { fetchData(); }, []);

    useEffect(() => {
        if (activePeserta) fetchEnrollments(activePeserta.id);
    }, [activePeserta]);

    const handleEnroll = async (classId) => {
        if (!activePeserta) return alert("Pilih peserta terlebih dahulu.");
        try {
            await enrollPeserta({ pesertaId: activePeserta.id, classId: classId });
            alert('Pendaftaran Berhasil!');
            fetchEnrollments(activePeserta.id);
        } catch (error) {
            alert(error.response?.data || 'Gagal mendaftar (sudah terdaftar atau error).');
        }
    };

    const handleRemove = async (classId) => {
        if (!window.confirm("Batalkan pendaftaran ini?")) return;
        await removeEnrollment({ pesertaId: activePeserta.id, classId: classId });
        alert('Pembatalan Berhasil!');
        fetchEnrollments(activePeserta.id);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Dashboard Relasi M:M (Pendaftaran)</h1>

            <div style={{ marginBottom: '20px' }}>
                <h3>Pilih Peserta Aktif:</h3>
                <select onChange={(e) => setActivePeserta(pesertaList.find(p => p.id === parseInt(e.target.value)))}
                    value={activePeserta ? activePeserta.id : ''}>
                    {pesertaList.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
                {activePeserta && <p>Peserta Aktif: **{activePeserta.name}**</p>}
            </div>

            <div style={{ display: 'flex', gap: '40px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h4>Daftarkan ke Kelas:</h4>
                    {/* Menampilkan daftar kelas yang belum diikuti (logika M:M) */}
                    <ClassList classes={classList} onAction={handleEnroll} actionLabel="Daftar Sekarang" />
                </div>

                <div style={{ flex: 1 }}>
                    <h4>Kelas yang Diikuti Peserta Ini:</h4>
                    {/* Menampilkan daftar kelas yang sudah diikuti (Logika M:M) */}
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                        {enrolledClasses.map(c => (
                            <li key={c.id} style={{ margin: '5px 0' }}>
                                {c.name} ({c.instructor})
                                <button onClick={() => handleRemove(c.id)} style={{ marginLeft: '10px' }}>Batalkan</button>
                            </li>
                        ))}
                    </ul>
                    {enrolledClasses.length === 0 && <p>Belum ada pendaftaran.</p>}
                </div>
            </div>
        </div>
    );
}

export default HomePage;