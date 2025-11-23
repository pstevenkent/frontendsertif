import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api', 
});

// PESERTA
export const getPeserta = () => API.get('/peserta');
export const getPesertaDetail = (id) => API.get(`/peserta/${id}`);
export const createPeserta = (data) => API.post('/peserta', data);
export const updatePeserta = (id, data) => API.patch(`/peserta/${id}`, data);
export const deletePeserta = (id) => API.delete(`/peserta/${id}`);

// KELAS
export const getKelas = () => API.get('/kelas');
export const getKelasDetail = (id) => API.get(`/kelas/${id}`);
export const createKelas = (data) => API.post('/kelas', data);
export const updateKelas = (id, data) => API.patch(`/kelas/${id}`, data);
export const deleteKelas = (id) => API.delete(`/kelas/${id}`);

//  ENROLLMENT MANY TO MANY 
export const enrollPeserta = (data) => API.post('/enrollments', data);
export const unenrollPeserta = (data) => API.delete('/enrollments', { data }); 
export const getPesertaClasses = (pesertaId) => API.get(`/enrollments/peserta/${pesertaId}`);
export const getKelasParticipants = (kelasId) => API.get(`/enrollments/kelas/${kelasId}`);