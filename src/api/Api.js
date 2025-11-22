// src/api/Api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Sesuaikan dengan port Express Backend Anda
});

// --- Peserta CRUD ---
export const getAllPeserta = () => api.get('/peserta');
export const addPeserta = (data) => api.post('/peserta', data);
export const deletePeserta = (id) => api.delete(`/peserta/${id}`);
export const editPeserta = (id, data) => api.put(`/peserta/${id}`, data); 

// --- Kelas CRUD ---
export const getAllKelas = () => api.get('/kelas');
export const addKelas = (data) => api.post('/kelas', data);
export const deleteKelas = (id) => api.delete(`/kelas/${id}`);
export const editKelas = (id, data) => api.put(`/kelas/${id}`, data);

// --- Relasi M:M (Pendaftaran) ---
export const getEnrolledClasses = (pesertaId) => api.get(`/enrollments/peserta/${pesertaId}`);
export const getEnrolledPeserta = (classId) => api.get(`/enrollments/kelas/${classId}`); // Opsional, untuk melihat peserta per kelas
export const enrollPeserta = (data) => api.post('/enrollments', data);
export const removeEnrollment = (data) => api.delete('/enrollments', { data }); 

export default api;