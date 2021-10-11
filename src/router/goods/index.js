export default [
  {
    path: '/goods',
    redirect: '/goods/category'
  },
  {
    path: '/goods/list',
    name: 'Goods',
    component: () => import('@/views/goods/list'),
    meta: { title: '商品管理' }
  },
  {
    path: '/goods/list/add',
    name: 'AddGoods',
    component: () => import('@/views/goods/list/add'),
    meta: { title: '添加商品' }
  },
  {
    path: '/goods/list/edit',
    name: 'EditGoods',
    component: async() => {
      const component = await import('@/views/goods/list/add')
      component.default.name = 'EditGoods'
      return component
    },
    meta: { title: '编辑商品' }
  },
  {
    path: '/goods/category',
    name: 'Category',
    component: () => import('@/views/goods/category'),
    meta: { title: '类别管理' }
  }
]
