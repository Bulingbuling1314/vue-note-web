import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/index.vue'),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
