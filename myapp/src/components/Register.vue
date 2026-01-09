<template>
  <div class="register-form">
    <h2>Registrar</h2>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Utilizador" required>
      <input v-model="password" type="password" placeholder="Palavra-passe" required>
      <button type="submit">Registrar</button>
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
      async register() {
        try {
          await this.$http.post('register/', {
            username: this.username,
            password: this.password
          })
          this.$emit('register-success')
        } 
        catch (err) {
          this.error = err.response.data.error || 'Erro ao registrar'
        }
      }
    }
  }
</script>

<style>

  .register-form {
    max-width: 360px;
    margin: 80px auto;
    padding: 30px;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  .register-form h2 {
    text-align: center;
    margin-bottom: 25px;
  }

  .register-form form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .register-form input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .register-form button {
    align-self: center;   
    padding: 10px 32px;
    border-radius: 6px;
    border: none;
    background-color: #3b82f6;
    color: white;
    font-weight: 600;
    cursor: pointer;
  }

  .register-form button:hover {
    background-color: #2563eb;
  }

  .error {
    text-align: center;
    color: red;
    margin-top: 10px;
  }

</style>
