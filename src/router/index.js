import Vue from 'vue'
import VueRouter from 'vue-router'
import { BasicLayout } from '@/layout'
// import setTitle from '@/utils/setTitle'
// import storage from '@/utils/storage'

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) { return originalPush.call(this, location, onResolve, onReject) }
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

// 动态路由
export const asyncRoutes = [
  {
    path: '/',
    name: 'Layout',
    component: BasicLayout,
    children: [
      {
        path: 'home',
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
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/exception/403')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/exception/404')
  },
  ...asyncRoutes
]

// 自动引入 路由文件
const files = require.context('@/router', true, /\.js$/)
files.keys().forEach(key => {
  console.log(key)
  if (key === './index.js') return
  const children = routes.find(route => route.name === 'Layout')?.children
  console.log(children)
  if (children && Array.isArray(children)) children.push.apply(children, files(key).default)
})

console.log('路由信息', routes)

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   setTitle(to)
//   if (to.path === '/login') {
//     next() // 放行
//   } else {
//     const token = storage.get('token')
//     if (token) {
//       next()
//       return
//     }
//     next('/login')
//   }
// })

export default router
