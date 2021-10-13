export default [
  {
    path: '/purchase/list',
    name: 'PurchaseList',
    component: () => import('@/views/purchase/list'),
    meta: { title: '采购单' }
  },
  {
    path: '/purchase/list/detail',
    name: 'PurchaseListDetail',
    component: () => import('@/views/purchase/list/detail'),
    meta: { title: '采购单详情', hidden: true }
  },
  {
    path: '/purchase/return',
    name: 'PurchaseReturn',
    component: () => import('@/views/purchase/return'),
    meta: { title: '采退单' }
  },
  {
    path: '/purchase/return/detail',
    name: 'PurchaseReturnDetail',
    component: () => import('@/views/purchase/return/detail'),
    meta: { title: '采退单详情', hidden: true }
  },
  {
    path: '/purchase/statistics',
    name: 'PurchaseStatistics',
    component: () => import('@/views/purchase/statistics'),
    meta: { title: '采购统计' }
  }
]
