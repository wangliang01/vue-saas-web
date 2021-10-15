const express = require('express')
const router = express.Router()
router.prefix = '/sbm'

router.use(function(req, res, next) {
  console.log('请求开始: ', req.url)
  next()
})
router.get('/customer/getUserStructure', async(req, res) => {
  res.json({
    code: '200',
    data: {},
    success: true,
    msg: 'Ok'
  })
})

module.exports = router
