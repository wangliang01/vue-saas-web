import axios from 'axios'
import { Message } from 'element-ui'
import _ from 'lodash'
import store from '@/store'
import router from '@/router'
const isProd = process.env.NODE_ENV
const CLIENT_ID = 'system-service'

function getInstance(options) {
  return axios.create(options)
}
function mergeConfig(source, target) {
  if (!target) return source
  if (typeof target === 'object') return source
  return Object.assign(source, target)
}
function handleError(error) {
  const errorMap = new Map()
  errorMap.set(400, '请求错误')
  errorMap.set(401, '用户未授授权，请登录')
  errorMap.set(403, '拒绝访问')
  errorMap.set(404, '资源未找到')
  errorMap.set(408, '请求超时')
  errorMap.set(500, '系统异常，请尝试刷新或联系管理员！')
  errorMap.set(501, '服务未实现')
  errorMap.set(502, '网关错误')
  errorMap.set(503, '服务不可用')
  errorMap.set(504, '网关超时')
  errorMap.set(505, 'HTTP版本不受支持')
  errorMap.set('timeout', '连接超时')
  errorMap.set('offline', '网络已断开，请检查链接')

  // 获取请求状态码,及错误消息
  let errorCode, errorMsg
  if (error.response) {
    errorCode = _.get(error, 'response.status')
    console.log('errorCode', errorCode)
    errorMsg = _.get(error, 'response.data.msg')
  } else if (error.message.includes('timeout')) {
    errorCode = 'timeout'
  } else if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || !window.navigator.onLine) {
    errorCode = 'offline'
  }

  if (isProd) {
    // 生产环境
    return Message.error(errorMap.get(errorCode))
  }

  // 其他环境
  return Message.error(errorMsg)
}

let mergeOptions
const defaultConfig = {
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/pron',
  timeout: 1000 * 10, // 请求超时时间
  isHandleError: true
}

// 合并参数
mergeOptions = mergeConfig(defaultConfig)

// 获取实例
const instance = getInstance(mergeOptions)

console.log('实例：', instance)

// 请求拦截
instance.interceptors.request.use(config => {
  mergeOptions = mergeConfig(defaultConfig, config)
  // 处理token, 等全局参数
  const token = store.state.account.token
  const customerInfo = store.state.account.user
  config.headers.Authorization = 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_ID)
  if (token) {
    config.headers.Authorization = 'bearer ' + token
  }
  // config.headers.clientid = CLIENT_ID
  if (customerInfo?.tenantId) {
    config.headers.tenantId = encodeURIComponent(customerInfo.tenantId)
  }
  if (customerInfo?.orgId) {
    config.headers.orgId = customerInfo.orgId
  }
  return config
}, error => {
  // 是否需要调用错误处理函数
  if (mergeOptions.isHandleError) {
    handleError(error)
  }
  return Promise.reject(error)
})

// 响应拦截
instance.interceptors.response.use(response => {
  // 处理结果，
  const { data: { code, msg, success }} = response
  if (!success) {
    if (mergeOptions.isHandleError) {
      Message.error(msg)
    }
    if (router.currentRoute.path === '/login') {
      // storage.removeAll()
      store.mutations.account.removeToken()
    } else {
      if (['00402', '00420', '00437', '00439'].includes(code)) {
        // storage.removeAll()
        store.mutations.account.removeToken()
        router.push('/login')
      }
    }
    return Promise.reject(response)
  }
  return response.data
}, error => {
  if (mergeOptions.isHandleError) {
    handleError(error)
  }
  return Promise.reject(error)
})

const HttpRequest = function(options) {
  return instance(options)
}

HttpRequest.get = function(url, data = {}, config = {}) {
  return instance.get(url, { ...config, params: data })
}

HttpRequest.put = function(url, data = {}, config = {}) {
  return instance.put(url, data, config)
}

HttpRequest.post = function(url, data = {}, config = {}) {
  return instance.post(url, data, config)
}

HttpRequest.delete = function(url, data = {}, config = {}) {
  return instance.delete(url, { ...config, params: data })
}

// 封装通用的get请求和post请求 DELETE PUT
export default HttpRequest

