import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layouts/app.vue'),
      children: [
        {
          path: '',
          redirect: '/home'
        },
        {
          path: 'home',
          component: () => import('@/pages/home/index.vue')
        },
        {
          path: 'mails/:id',
          component: () => import('@/pages/mails/index.vue')
        }
      ]
    }
  ]
})

export default router
