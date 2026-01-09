<template>
  <div class="livro-form">
    <h2>{{ livro && livro.id ? 'Editar Livro' : 'Adicionar Livro' }}</h2>
    <form @submit.prevent="saveLivro">
      <div>
        <label for="title">Título:</label>
        <input v-model="form.title" type="text" id="title" required />
      </div>

      <div>
        <label for="author">Autor:</label>
        <input v-model="form.author" type="text" id="author" required />
      </div>

      <div>
        <label for="isbn">ISBN:</label>
        <input v-model="form.isbn" type="text" id="isbn" required />
      </div>

      <div>
        <label for="year">Ano:</label>
        <input v-model.number="form.year" type="number" id="year" required />
      </div>

      <div>
        <label for="quantity">Quantidade:</label>
        <input v-model.number="form.quantity" type="number" id="quantity" required />
      </div>

      <button type="submit">{{ livro && livro.id ? 'Salvar Alterações' : 'Adicionar Livro' }}</button>
      <button v-if="livro && livro.id" type="button" @click="cancelEdit">Cancelar</button>

      <select v-model="novoLivro.categoria">
        <option value="">Sem categoria</option>
        <option
          v-for="cat in categorias"
          :key="cat.id"
          :value="cat.id"
        >
          {{ cat.nome }}
        </option>
      </select>
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      livro: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        form: {
          title: '',
          author: '',
          isbn: '',
          year: new Date().getFullYear(),
          quantity: 1
        }
      }
    },
    watch: {
      livro: {
        immediate: true,
        handler(newLivro) {
          if (newLivro) {
            this.form = { ...newLivro }  
          } else {
            this.resetForm()
          }
        }
      }
    },
    methods: {
      async saveLivro() {
        const token = localStorage.getItem('access_token')
        const config = { headers: { Authorization: `Bearer ${token}` } }

        try {
          if (this.livro && this.livro.id) {
            // Editar livro existente
            await this.$http.put(`http://127.0.0.1:8000/api/livros/${this.livro.id}/`, this.form, config)
          } else {
            // Adicionar livro novo
            await this.$http.post('http://127.0.0.1:8000/api/livros/', this.form, config)
          }
          this.$emit('saved')
          this.resetForm()
        } 
        
        catch (err) {
          console.error(err)
          alert('Erro ao salvar livro. Verifique se os dados estão corretos.')
        }
      },
      resetForm() {
        this.form = {
          title: '',
          author: '',
          isbn: '',
          year: new Date().getFullYear(),
          quantity: 1
        }
        this.$emit('cancel') 
      },
      cancelEdit() {
        this.resetForm()
      }
    }
  }
</script>

<style scoped>
  .livro-form {
    margin-bottom: 20px;
  }
  .livro-form form div {
    margin-bottom: 10px;
  }
  button {
    margin-right: 10px;
  }
</style>
