import routes from '@/router/purchase'
import { cloneDeep } from 'lodash'
export default {
  path: '/purchase',
  name: 'purchase',
  order: 1,
  meta: {
    icon: 'icon-caigouguanli',
    title: '采购管理'
  },
  children: cloneDeep(routes)
}
