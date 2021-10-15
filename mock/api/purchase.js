const express = require('express')
const { db, success } = require('../util')
const router = express.Router()

router.use((req, res, next) => {
  console.log('请求开始', req.url)
  next()
})

router.post('/sbm/purchase/findPurchaseList', async(req, res) => {
  console.log(req.body)
  const records = db.get('../db/purchase/list.json', req.body)
  const total = db.get('../db/purchase/list.json').length
  res.json(success({
    records,
    total
  }))
})

router.get('/sbm/purchase/getPurchaseDetail', async(req, res) => {
  const data = db.get('../db/purchase/detail.json')
  res.json(success(data))
})

router.post('/sbm/purchase/statistics', async(req, res) => {
  const records = db.get('../db/purchase/statistics.json', req.body)
  const total = db.get('../db/purchase/statistics.json').length
  res.json(success({
    records,
    total
  }))
})

router.post('/sbm/refund/findRefundList', async(req, res) => {
  const records = db.get('../db/purchase/return.json', req.body)
  const total = db.get('../db/purchase/return.json').length
  res.json(success({
    records,
    total
  }))
})

router.get('/sbm/refund/getRefundDetail', async(req, res) => {
  const data = db.get('../db/purchase/return-detail.json')
  res.json(success(data))
})

module.exports = router
