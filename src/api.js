import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // JSON server URL
});

// Mock API functions for articles
export const getArticles = () => api.get('/articles');
export const getArticle = (id) => api.get(`/articles/${id}`);
export const createArticle = (article) => api.post('/articles', article);
export const updateArticle = (id, article) => api.put(`/articles/${id}`, article);
export const deleteArticle = (id) => api.delete(`/articles/${id}`);

export default {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
