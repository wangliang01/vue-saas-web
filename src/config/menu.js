import { asyncRoutes } from '@/router'
/* menu支持两种模式，水平 horizontal ， 或者垂直 vertical */
const menuMode = 'vertical'

export default {
  menuMode,
  menu: asyncRoutes
}
