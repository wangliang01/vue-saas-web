import request from '@/utils/request'
import qs from 'qs'

/* 登录 */
export function login(data) {
  return request.post('/oauth/token', qs.stringify(data))
}

/* 登出 */
export function logout(data) {
  return request.post('/authorize/logout', data)
}

/* 忘记密码 */
export function forget(data) {
  return request.post('/authorize/account/forgetPwd', data)
}

/* 获取用户基本信息 */
export function getStaffInfo(data) {
  return request.get('/bff/permission/staff/loginStaffInfo', data)
}

/* 获取验证码 */
export function sendCode(data) {
  return request.get('/authorize/account/sendCode', data)
}

/* 忘记密码 */
export function forgetPwd(data) {
  return request.post(`/authorize/account/forgetPwd`, data)
}
