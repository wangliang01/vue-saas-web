/* eslint-disable */
const apiContext = require.context('@/api', true, /\.js/)
const api = {}

/* 拿到api目录下的除index.js里的所有js文件路径 apiPaths: ['./login.js']*/
const apiPaths = apiContext.keys().filter(apiPath => !apiPath.includes('index'))

apiPaths.forEach(path => {
  /* path: ./login.js */
  let key = path.match(/\.\/(.*)\.js$/)[1]
  /* key: login */
  const value = require(__dirname + `/${key}.js`)
  if (key.includes('-')) {
    key = key.replace(/\-(\w)/g, function(all, letter){
      return letter.toUpperCase()
    })
  }
  api[`${key}Api`] = value
})

export default api
