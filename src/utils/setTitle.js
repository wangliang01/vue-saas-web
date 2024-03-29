import store from '@/store'
const PROJECT_NAME = store.state.setting.systemName
/**
 *
 * @param {String} title
 * @description 设置网页标题
 */
function setTitle(route) {
  const title = route?.meta?.title ? `${PROJECT_NAME} | ${route?.meta?.title}` : PROJECT_NAME
  document.title = title
}

export default setTitle
