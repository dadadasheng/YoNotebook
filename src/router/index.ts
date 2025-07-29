import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: { title: 'Login' }
    }
    ,
    {
      path: '/Notebook',
      name: 'Notebook',
      component: () => import('../views/Notebook.vue'),
      meta: { title: 'Yo Notebook' }
    }
  ],
})

export default router
