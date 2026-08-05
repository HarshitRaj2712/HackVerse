import axios from 'axios';

const LOCAL_API_BASE_URL = 'http://localhost:5000/api';
const PROD_API_BASE_URL = 'https://hackverse-lsf5.onrender.com/api';

export const API_BASE_URL = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? LOCAL_API_BASE_URL : PROD_API_BASE_URL)).replace(/\/$/, '');

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const hackathonApi = {
  getAll: async () => {
    try {
      const res = await api.get('/hackathons');
      return res.data.data;
    } catch (e) {
      console.warn('Backend server unreachable, falling back to local state:', e.message);
      return null;
    }
  },
  getById: async (id) => {
    try {
      const res = await api.get(`/hackathons/${id}`);
      return res.data.data;
    } catch (e) {
      console.warn('Backend server unreachable, falling back to local state:', e.message);
      return null;
    }
  },
  create: async (data) => {
    try {
      const res = await api.post('/hackathons', data);
      return res.data.data;
    } catch (e) {
      console.warn('Backend server unreachable, saving locally:', e.message);
      return null;
    }
  }
};

export const submissionApi = {
  getAll: async (hackathonId) => {
    try {
      const url = hackathonId ? `/submissions?hackathonId=${hackathonId}` : '/submissions';
      const res = await api.get(url);
      return res.data.data;
    } catch (e) {
      console.warn('Backend server unreachable, falling back to local state:', e.message);
      return null;
    }
  },
  submit: async (data) => {
    try {
      const res = await api.post('/submissions', data);
      return res.data.data;
    } catch (e) {
      console.warn('Backend server unreachable, saving locally:', e.message);
      return null;
    }
  }
};

export const teamApi = {
  getAll: async () => {
    try {
      const res = await api.get('/teams');
      return res.data.data;
    } catch (e) {
      console.warn('Backend server unreachable, falling back to local state:', e.message);
      return null;
    }
  },
  create: async (data) => {
    try {
      const res = await api.post('/teams', data);
      return res.data.data;
    } catch (e) {
      console.warn('Backend server unreachable, saving locally:', e.message);
      return null;
    }
  }
};
