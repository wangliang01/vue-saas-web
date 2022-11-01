import { BlankLayout } from '../../layout'

export default [
  {
    path: 'purchase',
    name: 'Purchase',
    component: BlankLayout,
    meta: { title: '采购单管理', icon: 'icon-caigouguanli' },
    children: [
      {
        path: 'list',
        name: 'PurchaseList',
        component: () => import('@/views/purchase/list'),
        meta: { title: '采购单' }
      },
      {
        path: 'list/detail',
        name: 'PurchaseListDetail',
        component: () => import('@/views/purchase/list/detail'),
        meta: { title: '采购单详情', hidden: true }
      },
      {
        path: 'return',
        name: 'PurchaseReturn',
        component: () => import('@/views/purchase/return'),
        meta: { title: '采退单' }
      },
      {
        path: 'return/detail',
        name: 'PurchaseReturnDetail',
        component: () => import('@/views/purchase/return/detail'),
        meta: { title: '采退单详情', hidden: true }
      },
      {
        path: 'statistics',
        name: 'PurchaseStatistics',
        component: () => import('@/views/purchase/statistics'),
        meta: { title: '采购统计' }
      }
    ]
  }
]
