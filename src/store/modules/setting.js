import config from '@/config'
console.log('config配置', config)
export default {
  namespaced: true,
  state: {
    pageMinHeight: 0,
    ...config
  }
}
