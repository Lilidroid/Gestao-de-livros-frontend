<template>
  <div class="livro-list">
    <header>
      <h1>Meus Livros</h1>
    </header>

    <!-- Formulário para adicionar/editar livro -->
    <div class="form-container">
      <input v-model="novoLivro.title" placeholder="Título" />
      <input v-model="novoLivro.author" placeholder="Autor" />
      <input v-model="novoLivro.isbn" placeholder="ISBN" />
      <input v-model="novoLivro.year" placeholder="Ano" type="number" />
      <input v-model="novoLivro.quantity" placeholder="Quantidade" type="number" />
      <input v-model="novoLivro.status" placeholder="Status (ex: Lido, A ler, Por ler)" />
      <input v-model="novoLivro.categoria" placeholder="Categoria (ex: Romance, Técnico)"/>

      <button class="add-btn" @click="addLivro">
        {{ editandoLivroId ? 'Salvar Alterações' : 'Adicionar Livro' }}
      </button>
    </div>

    <!-- Lista dos livros -->
    <div class="cards-container">
      <div class="livro-card" v-for="livro in livros" :key="livro.id">
        <p><strong>Título:</strong> {{ livro.title }}</p>
        <p><strong>Autor:</strong> {{ livro.author }}</p>
        <p><strong>ISBN:</strong> {{ livro.isbn }}</p>
        <p><strong>Ano:</strong> {{ livro.year }}</p>
        <p><strong>Quantidade:</strong> {{ livro.quantity }}</p>
        <p><strong>Status:</strong> {{ livro.status }}</p>
        <p><strong>Categoria:</strong> {{ livro.categoria_nome }}</p>
        <div class="card-actions">
          <button class="edit-btn" @click="editLivro(livro)">Editar</button>
          <button class="delete-btn" @click="deleteLivro(livro.id)">Apagar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        livros: [],
        categorias: [],
        novoLivro: {
          title: '',
          author: '',
          isbn: '',
          year: '',
          quantity: '',
          status: '',
          categoria: null
        },
        editandoLivroId: null
      }
    },
    mounted() {
      this.fetchLivros()
      this.fetchCategorias()
    },
    methods: {
      async fetchLivros() {
        const token = localStorage.getItem('access_token')
        const config = { headers: { Authorization: `Bearer ${token}` } }

        try {
          const response = await this.$http.get('http://127.0.0.1:8000/api/livros/', config)
          this.livros = response.data
        } 
        
        catch (err) {
          console.error(err)
          alert('Erro ao buscar livros.')
        }
      },

      async addLivro() {
          if (!this.novoLivro.status) {
            alert('Por favor, preencha o status do livro.')
           return
          }

          const token = localStorage.getItem('access_token')
          const config = { headers: { Authorization: `Bearer ${token}` } }

          try {
            if (this.editandoLivroId) {
              await this.$http.put(
              `http://127.0.0.1:8000/api/livros/${this.editandoLivroId}/`, this.novoLivro, config)
          } else {
            await this.$http.post( 
              'http://127.0.0.1:8000/api/livros/', this.novoLivro, config)
          }

            this.resetForm()
            this.fetchLivros()
          } 
          catch (err) {
            console.error(err)
            alert('Erro ao salvar livro.')
          }
      },

      editLivro(livro) {
        this.novoLivro = { ...livro }
        this.editandoLivroId = livro.id
      },

      async deleteLivro(id) {
        const token = localStorage.getItem('access_token')
        const config = { headers: { Authorization: `Bearer ${token}` } }

        if (!confirm('Tem certeza que quer apagar este livro?')) return

        try {
          await this.$http.delete(`http://127.0.0.1:8000/api/livros/${id}/`, config)
          this.fetchLivros()
        } 
        
        catch (err) {
          console.error(err)
          alert('Erro ao apagar livro.')
        }
      },

      resetForm() {
        this.novoLivro = { title: '', author: '', isbn: '', year: '', quantity: '', status: '', categoria: '' }
        this.editandoLivroId = null
      },

      async fetchCategorias() {
        const token = localStorage.getItem('access_token')
        const config = { headers: { Authorization: `Bearer ${token}` } }
        try {
          const res = await this.$http.get('http://127.0.0.1:8000/api/categorias/', config)
          this.categorias = res.data
        } catch (err) {
          console.error(err)
        }
      },
    }
  }
</script>

<style scoped>
  .livro-list {
    max-width: 1000px;
    margin: 40px auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  h1 {
    font-size: 2rem;
    color: #333;
  }

  /* Formulário */
  .form-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 40px;
    justify-content: center;
  }

  .form-container input {
    padding: 10px;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    flex: 1 1 150px;
    min-width: 150px;
  }

  .add-btn {
    background-color: #2ecc71;
    color: #fff;
    border: none;
    padding: 10px 30px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s;
  }

  .add-btn:hover {
    background-color: #27ae60;
  }

  /* Cards de livros */
  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  .livro-card {
    background-color: #fff;
    width: 250px;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .livro-card p {
    margin: 0;
  }

  .card-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .edit-btn {
    background-color: #f1c40f;
    border: none;
    color: #fff;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
  }

  .edit-btn:hover {
    background-color: #d4ac0d;
  }

  .delete-btn {
    background-color: #e74c3c;
    border: none;
    color: #fff;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
  }

  .delete-btn:hover {
    background-color: #c0392b;
  }
</style>
