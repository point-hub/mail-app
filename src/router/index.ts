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
          redirect: '/inbox'
        },
        {
          path: 'inbox',
          component: () => import('@/pages/inbox/list/index.vue')
        },
        {
          path: 'inbox/:id',
          component: () => import('@/pages/inbox/detail/index.vue')
        }
      ]
    }
  ]
})

export default router
