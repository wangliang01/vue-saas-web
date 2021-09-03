const proxyTarget = {
  li_yong: 'http://192.168.1.5:8866/', // 李勇
  huang_fei: 'http://192.168.1.23:8866/', // 黄飞
  tang_gang: 'http://192.168.1.37:8866/', // 唐刚
  yi_tao: 'http://192.168.1.66:8866/', // 易涛
  tang_hua: 'http://192.168.1.128:8866/', // 唐华
  cheng_long: 'http://192.168.1.58:8866/', // 陈龙
  wei_pan: 'http://192.168.1.54:8866/', // 魏攀
  zeng_li_liang: 'http://192.168.1.131:8866/', // 曾力量
  chen_xin_jie: 'http://192.168.1.113:8866/', // 曾力量
  dev: 'https://dev-k8s.newhopescm.com/pron', // 开发环境
  test: 'https://test.newhopescm.com/pron'// 测试环境
}
module.exports = {
  proxy: {
    // '/api/oauth/token': {
    //   target: proxyTarget.test, // 目标地址
    //   ws: false, // 是否启用websockets
    //   changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //   pathRewrite: { '^/api': '/' } // 这里重写路径
    // }
    '/api/file/upload': {
      target: proxyTarget.test, // 目标地址
      ws: false, // 是否启用websockets
      changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite: { '^/api': '/' } // 这里重写路径
    },
    '/api': {
      target: proxyTarget.test, // 目标地址
      ws: false, // 是否启用websockets
      changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite: { '^/api': '/' } // 这里重写路径
    }
  }
}
