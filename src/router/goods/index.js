export default [
  {
    path: '/goods/list',
    name: 'GoodsList',
    component: () => import('@/views/goods/list'),
    meta: { title: '商品管理', keepAlive: false }
  }
]
