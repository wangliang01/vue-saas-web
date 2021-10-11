import Vue from 'vue'
import VueRouter from 'vue-router'
import setTitle from '@/utils/setTitle'
import Layout from '@/layout'
import storage from '@/utils/storage'

Vue.use(VueRouter)

// 动态路由
export const asyncRoutes = [
  {
    path: '/',
    redirect: '/goods/list',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
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

// 自动引入 路由文件
const files = require.context('../router', true, /\.js$/)
files.keys().forEach(key => {
  if (key === './index.js') return
  const children = routes.find(im => im.name === 'Layout')?.children
  if (Array.isArray(children)) children.push.apply(children, files(key).default)
})

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, form, next) => {
  setTitle(to)
  if (to.path === '/login') {
    next() // 放行
  } else {
    const token = storage.get('token')
    if (token) {
      next()
      return
    }
    next('/login')
  }
})

export default router
