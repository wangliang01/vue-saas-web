import routes from '@/router/goods'
import { cloneDeep } from 'lodash'
export default {
  path: '/goods',
  name: 'goods',
  order: 2,
  meta: {
    title: '商品管理',
    icon: 'icon-chanpinguanli'
  },
  children: cloneDeep(routes)
}
