import axios from 'axios';

const baseURL = 'https://chatserver-th.vercel.app';

const api = axios.create({
  baseURL,
});

export const uploadFile = async (formData) => {
  try {
    const headers = {
      'Content-Type': 'multipart/form-data'
    };

    const response = await api.post('/api/users/upload', formData, {
      headers,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
export default api;
