import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Projects
export const getProjects = (params) => api.get('/projects', { params });
export const getProject = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Developers
export const getDevelopers = () => api.get('/developers');
export const getDeveloper = (id) => api.get(`/developers/${id}`);
export const createDeveloper = (data) => api.post('/developers', data);
export const updateDeveloper = (id, data) => api.put(`/developers/${id}`, data);
export const deleteDeveloper = (id) => api.delete(`/developers/${id}`);

// Contact
export const createContactRequest = (data) => api.post('/contact', data);
export const getContactRequests = () => api.get('/contact');
export const updateContactRequest = (id, data) => api.put(`/contact/${id}`, data);
export const deleteContactRequest = (id) => api.delete(`/contact/${id}`);

// Purchases
export const createPurchase = (projectId) => api.post('/purchases', { projectId });
export const getMyPurchases = () => api.get('/purchases/my-purchases');
export const getAllPurchases = () => api.get('/purchases');

// Stats
export const getStats = () => api.get('/stats');

export default api;
