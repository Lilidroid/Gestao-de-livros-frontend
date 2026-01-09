import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export function setAuthHeader(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

// Login JWT
export async function loginBackend(username, password) {
  const res = await axios.post(`${API_URL}/token/`, { username, password });
  return res.data;
}

// Registrar 
export async function registerUser(username, password) {
  const res = await axios.post('http://127.0.0.1:8000/register/', { username, password });
  return res.data;
}

// Buscar livros 
export async function getUserLivros(token) {
  const res = await axios.get(`${API_URL}/userlivros/`, setAuthHeader(token));
  return res.data;
}

// Adicionar livro 
export async function addUserLivro(token, livroId) {
  const res = await axios.post(`${API_URL}/userlivros/`, { livro: livroId }, setAuthHeader(token));
  return res.data;
}

// Actualizar status do livro
export async function updateUserLivro(token, userLivroId, status) {
  const res = await axios.patch(
    `${API_URL}/userlivros/${userLivroId}/`,
    { status },
    setAuthHeader(token)
  );
  return res.data;
}

// Deletar livro 
export async function deleteUserLivro(token, userLivroId) {
  const res = await axios.delete(`${API_URL}/userlivros/${userLivroId}/`, setAuthHeader(token));
  return res.data;
}

// Buscar todos os livros disponíveis
export async function getAllLivros(token) {
  const res = await axios.get(`${API_URL}/livros/`, setAuthHeader(token));
  return res.data;
}
