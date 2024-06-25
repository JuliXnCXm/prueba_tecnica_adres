import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Manejo global de errores
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Error de respuesta:', error.response.data);
    } else if (error.request) {
      console.error('Error de solicitud:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);


export const getAcquisitions = (filter) => api.post("/acquisitions/", filter);
export const getAcquisition = (id) => api.get(`/acquisitions/${id}`);
export const getAcquisitionHistory = (id) => api.get(`/acquisitions/history/${id}`);
export const deleteAcquisition = (id) => api.delete(`/acquisitions/${id}`);
export const createAcquisition = (acquisition) => api.post('/acquisitions/create/', acquisition);
export const updateAcquisition = (acquisitionId, acquisitionData) =>
  api.put(`/acquisitions/${acquisitionId}/`, acquisitionData);