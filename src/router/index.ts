import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
      path: '/login',
      name: 'LOGIN',
      component: () => import('@/views/login/index.vue'),
      meta: {}
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
