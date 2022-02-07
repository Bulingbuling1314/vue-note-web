import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from "@/components/Layout.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta: {
        isLogin: true
    },
    children: []
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
