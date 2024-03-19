import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    // redirect: '',
    component: () => import('@/layout/index.vue'),
    children: []
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
