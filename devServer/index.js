const proxyTarget = {
  li_yong: 'http://192.168.1.5:8866/', // 李勇
  kong_linjun: 'http://192.168.1.107:8866/', // 孔令君
  li_jin: 'http://192.168.1.146:8866/', // 李进
  huang_fei: 'http://192.168.1.23:8866/', // 黄飞
  tang_gang: 'http://192.168.1.37:8866/', // 唐刚
  yi_tao: 'http://192.168.1.66:8866/', // 易涛
  tang_hua: 'http://192.168.1.128:8866/', // 唐华
  cheng_long: 'http://192.168.1.58:8866/', // 陈龙
  wei_pan: 'http://192.168.1.54:8866/', // 魏攀
  zeng_li_liang: 'http://192.168.1.131:8866/', // 曾力量
  zeng_xiao_fan: 'http://192.168.1.187:8866/', // 曾小凡
  tu_wen_bin: 'http://192.168.1.184:8866/', // 涂文斌
  dev: 'https://dev-k8s.newhopescm.com/pron', // 开发环境
  test: 'https://test-k8s.newhopescm.com/pron'// 测试环境
}
module.exports = {
  proxy: {
    // '/api/oauth/token': {
    //   target: proxyTarget.test, // 目标地址
    //   ws: false, // 是否启用websockets
    //   changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //   pathRewrite: { '^/api': '/' } // 这里重写路径
    // }
    '/api/file/upload': { // 图片上传接口
      target: proxyTarget.dev,
      ws: false,
      changeOrigin: true,
      pathRewrite: { '^/api': '' }
    },
    // '/file/upload': {
    //   target: 'https://dev-k8s.newhopescm.com/pron',
    //   ws: false,
    //   changeOrigin: true,
    //   pathRewrite: { '^/api': '' }
    // },
    // '/api/goods': {
    //   target: 'http://192.168.1.121:3000/', // 目标地址
    //   ws: false, // 是否启用websockets
    //   changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //   pathRewrite: { '^/api': '' } // 这里重写路径
    // },
    '/api': {
      target: proxyTarget.test, // 目标地址
      ws: false, // 是否启用websockets
      logLevel: 'debug',
      changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      pathRewrite: { '^/api': '' } // 这里重写路径
    }
  }
}
