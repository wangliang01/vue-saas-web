// 重新覆盖 $message 并且 修改offset 避免 错误信息 或是提示信息 总是 挡住 顶部导航
const cMessage = function(Vue) {
  const Message = Vue.prototype.$message
  const customOffset = 50 // 距离顶部 50px
  const NewMessage = function(options) {
    options.offset = options.offset || customOffset
    Message(options)
  }
  const types = ['success', 'warning', 'info', 'error']
  types.forEach(type => {
    NewMessage[type] = options => {
      if (typeof options === 'string') {
        options = {
          message: options,
          offset: customOffset
        }
      }
      options.type = type
      options.offset = options.offset || customOffset
      return Message(options)
    }
  })
  return NewMessage
}

export default cMessage
