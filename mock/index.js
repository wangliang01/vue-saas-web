const requireDirectory = require('require-directory')

module.exports = async(app) => {
//   // 使用中间件
  requireDirectory(module, `${process.cwd()}/mock/api`, {
    visit(router) {
      app.use(router.prefix || '/', router)
    }
  })
}
