
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'  

// Login 
export async function login(username, password) {
  try {
    const response = await axios.post(`${API_URL}/api/token/`, {
      username,
      password
    })

    // Guardar tokens no localStorage
    localStorage.setItem('access', response.data.access)
    localStorage.setItem('refresh', response.data.refresh)

    return response.data
  } catch (error) {
    console.error('Erro no login:', error.response.data)
    throw error
  }
}

// Obter lista de livros 
export async function getLivros() {
  const token = localStorage.getItem('access')
  const response = await axios.get(`${API_URL}/api/livros/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

// Criar UserLivro 
export async function addUserLivro(livroId, status) {
  const token = localStorage.getItem('access')
  const response = await axios.post(`${API_URL}/api/userlivros/`, {
    livro: livroId,
    status: status
  }, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}
