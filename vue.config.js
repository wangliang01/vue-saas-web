const path = require('path')
const webpack = require('webpack')
const buildDate = JSON.stringify(new Date().toLocaleDateString())
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const chalk = require('chalk')

const isMock = process.env.VUE_APP_ENV === 'mock'
console.log(`${chalk.green('当前运行环境:')} ${chalk.red(process.env.VUE_APP_ENV)}`)
let devServer = {}
if (isMock) {
  // mock环境
  devServer = require('./mock/server')
} else {
  // 其他
  devServer = require('./devServer')
}

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
  devServer,
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
