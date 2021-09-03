import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import yui from 'yyx-component'
import 'yyx-component/lib/yui.css'

// 引入样式
import './styles/base.scss'
import './styles/element-theme.scss'
import './styles/element.scss'

Vue.use(ElementUI)
Vue.use(yui)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

