const express = require('express')
const { success, db } = require('../util')

const router = express.Router()

router.post('/sbm/reconciliation/getReconciliation', async(req, res) => {
  const records = db.get('../db/reconciliation/purchase.json', req.body)
  const total = db.get('../db/reconciliation/purchase.json', req.body).length
  res.json(success({
    records,
    total
  }))
})

module.exports = router
