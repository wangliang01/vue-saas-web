const express = require('express')
const router = express.Router()
const { db } = require('../util')
router.prefix = '/sbm'

router.use(function timeLog(req, res, next) {
  console.log('请求开始: ', Date.now())
  next()
})

router.get('/goods/search', async(req, res) => {
  const query = req.query
  const records = await db.get('../db/goods/list.json', query)
  const total = await db.get('../db/goods/list.json').length
  res.json({
    code: '200',
    data: {
      records,
      total
    },
    msg: '',
    success: true
  })
})

router.post('/goods/exportGoods', async(req, res) => {
  res.json({
    code: '200',
    data: '',
    msg: '',
    success: true
  })
})

module.exports = router
