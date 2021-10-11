// 导入组件，组件必须声明name
import YTableDialogRemote from './src'

// 为组件提供install安装方法，按需引入
YTableDialogRemote.install = function(Vue) {
  Vue.component(YTableDialogRemote.name, YTableDialogRemote)
}

// 导出组件
export default YTableDialogRemote
