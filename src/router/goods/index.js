import { BlankLayout } from '../../layout'

export default [
  {
    path: 'goods',
    name: 'GoodsList',
    component: BlankLayout,
    redirect: '/goods/list',
    meta: { title: '商品管理', keepAlive: false, icon: 'icon-chanpinguanli' },
    children: [
      {
        path: 'list',
        name: 'GoodsList',
        component: () => import('@/views/goods/list'),
        meta: { title: '商品列表', keepAlive: false }
      }
    ]
  }
]
