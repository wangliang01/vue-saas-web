const Mock = require('./index')
const bodyParser = require('body-parser')
const requireDirectory = require('require-directory')
const proxy = {}

requireDirectory(module, `${process.cwd()}/mock/api`, {
  visit(router) {
    const stacks = router.stack

    for (const layer of stacks) {
      if (layer.route) {
        proxy[layer.route.path] = {
          target: 'http://localhost:8089', // 目标地址
          ws: false, // 是否启用websockets
          changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
          pathRewrite: { '^/api': '/' } // 这里重写路径
        }
      }
    }
  }
})
const defaultServer = {
  port: 8089,
  disableHostCheck: true,
  hot: true,
  compress: true,
  before(app) {
    if (process.env.VUE_APP_ENV === 'mock') {
      app.use(bodyParser.urlencoded({ extended: false }))
      Mock(app)
    }
  },
  proxy: {
    ...proxy,
    '/api/sbm/goods/search': {
      target: 'http://localhost:8089', // 目标地址
      ws: false, // 是否启用websockets
      changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite: { '^/api': '/' } // 这里重写路径
    },
    '/api/sbm/purchase/findPurchaseList': {
      target: 'http://localhost:8089', // 目标地址
      ws: false, // 是否启用websockets
      changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite: { '^/api': '/' } // 这里重写路径
    },
    '/api': {
      target: 'https://dev-k8s.newhopescm.com/pron', // 目标地址
      ws: false, // 是否启用websockets
      changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite: { '^/api': '/' } // 这里重写路径
    }
  }
}

module.exports = defaultServer
