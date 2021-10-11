import { Loading } from 'element-ui'

// 单例
let loading = null

// 显示全局遮罩
export const openFullScreen = (text = '处理中...') => {
  loading = Loading.service({
    lock: true,
    text,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
// 隐藏全局遮罩
export const closeFullScreen = () => {
  setTimeout(() => {
    loading && loading.close()
  }, 500)
}
