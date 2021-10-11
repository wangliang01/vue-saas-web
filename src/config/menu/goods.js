export default {
  path: '/goods',
  name: 'goods',
  order: 1,
  meta: {
    title: '商品管理',
    icon: 'icon-shangpinguanli'
  },
  children: [
    {
      path: '/goods/category',
      meta: {
        title: '类别管理',
        icon: 'icon-leibieguanli'
      }
    },
    {
      path: '/goods/list',
      meta: {
        title: '商品管理',
        icon: 'icon-shangpinguanli',
        isKeepAlive: false
      }
    },
    {
      path: '/goods/list/add',
      meta: {
        title: '添加商品',
        icon: 'dot',
        hidden: true
      }
    },
    {
      path: '/goods/list/edit',
      meta: {
        title: '编辑商品',
        icon: 'dot',
        hidden: true
      }
    }
  ]
}
