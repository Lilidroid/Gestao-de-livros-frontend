<template>
  <div class="app-container">
    <div class="app-header">
      <h1>Gestão de Livros</h1>
      <button class="logout-btn" v-if="isLoggedIn" @click="logout">Logout</button>
    </div>

    <div v-if="!isLoggedIn">
      <Login @login-success="handleLoginSuccess" />
      <Register @register-success="handleRegisterSuccess" />
    </div>

    <div v-else>
      <LivroList />
    </div>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import LivroList from './components/LivroList.vue'

export default {
  name: 'App',
  components: {
    Login,
    Register,
    LivroList
  },
  data() {
    return {
      isLoggedIn: !!localStorage.getItem('access_token')
    }
  },
  methods: {
    handleLoginSuccess() {
      this.isLoggedIn = true
    },
    handleRegisterSuccess() {
      alert('Usuário registrado com sucesso! Faça login.')
    },
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      this.isLoggedIn = false
    }
  }
}
</script>

<style>
.app-container {
  max-width: 1000px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logout-btn {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.logout-btn:hover {
  background-color: #c0392b;
}
</style>
