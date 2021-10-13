const requireDirectory = require('require-directory')

module.exports = (app) => {
  requireDirectory(module, `${process.cwd()}/mock/api`, {
    visit(router) {
      app.use(router.prefix || '/', router)
    }
  })
}
