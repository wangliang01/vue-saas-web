const Mock = require('mockjs')
const processing = require('./sale/processing')

module.exports = (app) => {
  app.get(`/sales/processing_order/detail/:id`, (req, res) => {
    res.json(Mock.mock(processing.detail(req)))
  })
  app.post('/sales/processing_order/listPage', (req, res) => {
    res.json(Mock.mock(processing.listPage(req)))
  })
  app.post('/sales/processing_order/save', (req, res) => {
    res.json(Mock.mock(processing.create(req)))
  })
  app.post('/goods/goods/getNetMaterialPageList', (req, res) => {
    res.json(Mock.mock(processing.getNetMaterialPageList(req)))
  })
  app.post('/cookbook/semifinished/specification/pageListForName', (req, res) => {
    res.json(Mock.mock(processing.pageListForName(req)))
  })
}
