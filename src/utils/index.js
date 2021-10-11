import moment from 'moment'
// 格式化时期
export const formatDate = (date, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  return date && moment(date).format(formatter)
}

// 判断是否是一个原生的对象
export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

// 变量转字符串
export function toString(val) {
  if (val === null || val === undefined) return ''
  if (isArray(val)) return JSON.stringify(val)
  if (isPlainObject(val) && val.toString === Object.prototype.toString) return JSON.stringify(val)
  return String(val)
}
// 打印子项目版本号
export function consoleVersion(packageJson) {
  if (!packageJson) return
  console.log(packageJson.name, '-> version:', packageJson.version)
  if (process.env.NODE_ENV === 'production') {
    console.log = () => {}
    console.info = () => {}
  }
}

// 判断一个数字字符串，有效数字位数 是否 超过 n 位
export function moreThanNumbers(number, n = 4) {
  const numStr = String(number)
  const index = numStr.indexOf('.') + 1
  return index ? numStr.length - index > n : false
}
