import Storages from 'js-storage'

const ns = Storages.initNamespaceStorage('yyx-group-meal-web')

const storage = ns.localStorage

/* 扩展clear方法，用来清空storage */
storage.clear = storage.removeAll

/**
 *
 * @param {Array|String} props
 */
storage.removeWith = function(props) {
  // 获取所有的keys
  const keys = storage.keys()
  if (Array.isArray(props)) {
    // 传递的参数是数组
    keys.forEach(key => {
      if (!props.includes(key)) {
        // 将不包含在props的key删除
        storage.remove(key)
      }
    })
  } else if (typeof props === 'string') {
    // 传递的参数是字符串
    keys.forEach(key => {
      if (key !== props) {
        // 将不等于props的key删除
        storage.remove(key)
      }
    })
  }
}

export default storage

