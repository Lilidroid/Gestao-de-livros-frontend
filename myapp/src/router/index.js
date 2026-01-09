import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import LivrosList from '../components/LivrosList.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/livros', component: LivrosList }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token');
  if (to.path === '/livros' && !token) next('/login');
  else next();
});

export default router;

