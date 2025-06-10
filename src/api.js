import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

// AUTH
export const register = (data) =>
  axios.post(`${API_BASE}/auth/register`, data, {
    withCredentials: true,
  });

export const login = (data) =>
  axios.post(`${API_BASE}/auth/login`, data, {
    withCredentials: true,
  });

// RESET PASSWORD
export const requestPasswordReset = (email) =>
  axios.post(`${API_BASE}/auth/request-reset`, { email }, {
    withCredentials: true,
  });

export const resetPassword = (token, newPassword) =>
  axios.post(`${API_BASE}/auth/reset-password`, { token, newPassword }, {
    withCredentials: true,
  });

// PROFILE
export const getProfile = (token) =>
  axios.get(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const deleteAccount = (token) =>
  axios.delete(`${API_BASE}/auth/delete-account`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

// BOOKS
export const getBooks = () =>
  axios.get(`${API_BASE}/books`, {
    withCredentials: true,
  });

export const addBook = (data, token) =>
  axios.post(`${API_BASE}/books`, data, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const updateBook = (id, data, token) =>
  axios.put(`${API_BASE}/books/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const deleteBook = (id, token) =>
  axios.delete(`${API_BASE}/books/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

// LOANS
export const loanBook = (data, token) =>
  axios.post(`${API_BASE}/loans`, data, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const getUserLoans = (userId, token) =>
  axios.get(`${API_BASE}/loans/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const getAllLoans = (token) =>
  axios.get(`${API_BASE}/loans`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const returnLoan = (loanId, token) =>
  axios.delete(`${API_BASE}/loans/${loanId}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

// REVIEWS
export const getReviewsByBookId = (bookId) =>
  axios.get(`${API_BASE}/reviews/book/${bookId}`, {
    withCredentials: true,
  });

export const createReview = (data, token) =>
  axios.post(`${API_BASE}/reviews`, data, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const updateReview = (id, data, token) =>
  axios.put(`${API_BASE}/reviews/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

export const deleteReview = (id, token) =>
  axios.delete(`${API_BASE}/reviews/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
