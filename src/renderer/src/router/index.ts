import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    redirect: '/workbench',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/workbench',
        name: 'workbench',
        component: () => import('@/views/workbench/index.vue')
      },
      {
        path: '/myAccount',
        name: 'myAccount',
        component: () => import('@/views/myAccount/index.vue')
      },
      {
        path: '/groupHairAssistant',
        name: 'groupHairAssistant',
        component: () => import('@/views/groupHairAssistant/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: () => import('@/views/forgetPassword/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
