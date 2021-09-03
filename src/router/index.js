import Vue from 'vue'
import VueRouter from 'vue-router'
import setTitle from '@/utils/setTitle'
import Layout from '@/layout'

Vue.use(VueRouter)

// 动态路由
export const asyncRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/home')
      }
    ]
  }
]

export const routes = [
  {
    /* 登录 */
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  ...asyncRoutes
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((from, to, next) => {
  setTitle(to)
  next()
})

export default router
