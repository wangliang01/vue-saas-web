const files = require.context('../components', true, /\.js$/)
const components = {}

files.keys().forEach(key => {
  // console.log(key, '99')
  if (key === './index.js') return
  const componentName = files(key).default?.name
  if (!componentName) return
  components[componentName] = files(key).default || files(key)
})

const install = Vue => {
  Object.keys(components).forEach(name => Vue.component(name, components[name]))
}

export default {
  install,
  ...components
}
