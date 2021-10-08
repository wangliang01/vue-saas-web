/* menu支持两种模式，水平 horizontal ， 或者垂直 vertical */
const menuMode = 'horizontal'

/* eslint-disable */
const menuContext = require.context('@/config', true, /\.js/)
const menu = []

/* 拿到menu目录下的除index.js里的所有js文件路径 menuPaths: ['./operation.js', './purchase.js']*/
const menuPaths = menuContext.keys()/* .filter(apiPath => !apiPath.includes('index')) */

menuPaths.forEach(path => {
  /* path: ./purchase.js */
  const key = path.match(/\.\/(.*)\.js$/)[1]
  if (['index', 'menu', 'setting'].some(im => im === key)) return
  /* key: purchase */
  const value = require(__dirname + `/${key}.js`).default
  // 垂直模式
  menu.push(value)
})

menu.sort((a, b) => {
  return a.order - b.order
})


export default {
  menuMode,
  menu
}
