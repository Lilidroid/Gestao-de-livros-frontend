import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

const app = createApp(App)

// axios global (equivalente ao Vue.prototype.$http)
axios.defaults.baseURL = 'http://127.0.0.1:8000/'
app.config.globalProperties.$http = axios

// interceptor JWT (continua válido)
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

app.mount('#app')

