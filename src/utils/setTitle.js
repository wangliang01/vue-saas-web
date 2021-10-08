import { PROJECT_NAME } from '@/config/setting'
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
