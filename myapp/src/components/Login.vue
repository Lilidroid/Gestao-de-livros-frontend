<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Utlizador" required>
      <input v-model="password" type="password" placeholder="Palavra-passe" required>
      <button type="submit">Entrar</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return { username: '', password: '', error: '' }
    },
    methods: {
      async login() {
        try {
          const res = await this.$http.post('api/token/', {
            username: this.username,
            password: this.password
          })
          localStorage.setItem('access_token', res.data.access)
          localStorage.setItem('refresh_token', res.data.refresh)
          this.$emit('login-success')
        } 
        catch (err) {
          this.error = 'Utilizador ou palavra-passe inválidos'
        }
      }
    }
  }
</script>

<style>

  .login-form {
    max-width: 360px;
    margin: 80px auto;
    padding: 30px;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .login-form h2 {
    text-align: center;
    margin-bottom: 25px;
  }

  .login-form form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .login-form input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .login-form button {
    align-self: center;   /* 🔹 centra o botão */
    padding: 10px 32px;
    border-radius: 6px;
    border: none;
    background-color: #3b82f6;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  .login-form button:hover {
    background-color: #2563eb;
  }

  .error {
    text-align: center;
    color: red;
    margin-top: 10px;
  }

</style>

