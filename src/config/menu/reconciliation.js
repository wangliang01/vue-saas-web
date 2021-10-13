import routes from '@/router/reconciliation'
export default {
  path: '/reconciliation',
  name: 'reconciliation',
  order: 3,
  meta: {
    icon: 'icon-caiwuguanli',
    title: '对账管理'
  },
  children: routes
}
