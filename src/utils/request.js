/**
 * 封装整个项目的网络(ajax)请求工具函数
 */

import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import { get as _get, toNumber } from 'lodash'
import NProgress from 'nprogress'
import storage from '@/utils/storage'
import { CLIENT_ID } from '@/config/setting'
// import store from '@/store'
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/pron',
  timeout: 20000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  NProgress.done()
  if (error instanceof Error) {
    const status = toNumber(_get(error, 'response.status'))
    const msg = _get(error, 'response.data.msg')
    switch (status) {
      case 400:
        error.message = msg || '请求错误'
        break
      case 401:
        error.message = msg || '未授权，请登录'
        storage.removeAll()
        router.push('/login')
        break
      case 403:
        error.message = msg || '拒绝访问'
        break
      case 404:
        error.message = msg || `请求地址出错: ${error.response.config.url}`
        break
      case 408:
        error.message = msg || '请求超时'
        break
      case 500:
        error.message = msg || '系统异常，请尝试刷新或联系管理员！'
        break
      case 501:
        error.message = msg || '服务未实现'
        break
      case 502:
        error.message = msg || '网关错误'
        break
      case 503:
        error.message = msg || '服务不可用'
        break
      case 504:
        error.message = msg || '网关超时'
        break
      case 505:
        error.message = msg || 'HTTP版本不受支持'
        break
      default:
        break
    }
    Message.error({ message: error.message, offset: 50 })
  }
  return Promise.reject(error)
}

// 请求拦截器
instance.interceptors.request.use(
  config => {
    NProgress.start()
    // 取出本地token
    const token = storage.get('token')
    const customerInfo = storage.get('customerInfo')
    // 在请求头中加上Authorization字段
    // config.headers.Authorization = 'Basic ' + window.btoa('system-service' + ':' + 'system-service')
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
    // config.headers.orgId = process.env.NODE_ENV === 'development' ? 1 : 0
    return config
  },
  err => {
    NProgress.done()
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(response => {
  NProgress.done()
  const { data: { code, msg, success }} = response
  // 响应数据先拦截住  对成功和失败的状态码统一处理
  if (success === false) {
    Message.error({ message: msg, offset: 50 })
    if (router.currentRoute.path === '/login') {
      storage.removeAll()
    } else {
      if (code === '00402' || code === '00420' || code === '00437' || code === '00439') {
        storage.removeAll()
        router.push('/login')
      }
    }
    return Promise.reject(response)
  } else {
    return response.data
  }
}, errorHandler)

// 封装通用的get请求和post请求 DELETE PUT
export default {
  get: function(url, data = {}, config = {}) {
    return instance.get(url, { ...config, params: data })
  },
  put: function(url, data = {}, config = {}) {
    return instance.put(url, data, config)
  },
  post: function(url, data = {}, config = {}) {
    return instance.post(url, data, config)
  },
  delete: function(url, data = {}, config = {}) {
    return instance.delete(url, { ...config, params: data })
  }
}

