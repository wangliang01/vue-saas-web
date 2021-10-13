const express = require('express')
const router = express.Router()
const { db } = require('../util')
router.prefix = '/scm'

router.use(function timeLog(req, res, next) {
  console.log('请求开始: ', Date.now())
  next()
})

router.get('/goods/search', async(req, res) => {
  const data = db.get('../db/goods/list.json')
  res.json({
    code: '200',
    data: data,
    msg: '',
    success: true
  })
})

module.exports = router
