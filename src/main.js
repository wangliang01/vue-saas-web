import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import yui from 'yyx-component'
import Message from './utils/message'
import components from '@/components'
import clearBuffer from '@/utils/clearBuffer'
import { openFullScreen, closeFullScreen } from '@/utils/loading'

// 引入样式
import 'yyx-component/lib/yui.css'
import './styles/base.scss'
import './styles/element-theme.scss'
import './styles/element-variables.scss'
import './styles/element.scss'
import '@/assets/fonts/iconfont.css'

// 打印项目版本号 在测试，生产环境上查看...
import packageJson from '../package.json'
import { consoleVersion } from '@/utils'
consoleVersion(packageJson)
import { initThemeColor } from '@/utils/themeColorClient'
initThemeColor()

Vue.use(ElementUI)
Vue.use(yui)
Vue.use(components)
Vue.config.productionTip = false

Vue.prototype.$message = Message(Vue)
Vue.prototype.$clearBuffer = clearBuffer
Vue.prototype.$openFullScreen = openFullScreen
Vue.prototype.$closeFullScreen = closeFullScreen

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

