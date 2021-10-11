const path = require('path')
const webpack = require('webpack')
const buildDate = JSON.stringify(new Date().toLocaleDateString())
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const devServer = require('./devServer')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  publicPath: './',
  filenameHashing: true, // 添加文件
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/color.scss";`
      }
    }
  },
  // 如要与后端联调，请前往devServer/index.js 中进行修改proxy配置
  devServer: devServer || {
    proxy: {
      '/api': {
        // target: 'https://test-k8s.newhopescm.com/pron', // 目标地址
        target: 'https://www.fastmock.site/mock/25bd6482fe8a49135a76446a526af07b/group', // mock地址
        logLevel: 'debug',
        ws: false, // 是否启用websockets
        changeOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: { '^/api': '' } // 这里重写路径
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins: [
      // 开启gzip压缩
      new CompressionWebpackPlugin(
        {
          filename: info => {
            return `${info.path}.gz${info.query}`
          },
          algorithm: 'gzip',
          threshold: 0, // 只有大小大于该值的资源会被处理 5
          test: new RegExp('\\.(' + ['js'].join('|') + ')$'
          ),
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false // 删除原文件
        }
      ),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        BUILD_DATE: buildDate
      })
    ]
  },
  chainWebpack: config => {
    // 移除prefetch插件，避免加载多余的资源
    config.plugins.delete('prefetch')
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload')

    config.optimization.minimize(true)

    config.optimization.splitChunks({
      chunks: 'all'
    })
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      }).end()
    // 给打包输出文件添加 hash 值，避免每次更新镜像，都需要清除浏览器缓存
    config.output
      .filename('js/[name].[hash].js')
      .chunkFilename('js/[name].[hash].js')
      .end()
  }
}
