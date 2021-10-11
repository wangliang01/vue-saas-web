const fs = require('fs')
const path = require('path')
const db = require('@wangliang01/mock-db')
module.exports = {
  detail(req) {
    const { url, method, params } = req
    console.log('url1212:', url)
    if (!url.includes('/sales/processing_order/detail')) {
      return ({
        code: '404',
        success: false,
        data: null,
        msg: '请求地址不正确'
      })
    }
    if (method !== 'GET' && method !== 'get') {
      return ({
        code: '405',
        success: false,
        data: null,
        msg: '请求方式不正确'
      })
    }
    if (params.id === undefined) {
      return ({
        code: '400',
        success: false,
        data: null,
        msg: '请求参数缺少id'
      })
    }
    const data = db.get(path.resolve(__dirname, '../db/processing/processDetail.json'))
    return {
      'code': '200',
      'data': data,
      'msg': 'OK',
      'success': true
    }
  },
  listPage(req) {
    const { url, method, params, body } = req
    console.log(url, method, params, body)
    const res = fs.readFileSync(path.resolve(__dirname, '../db/processing/processingListPage.json'), 'utf-8')
    const records = JSON.parse(res)
    return {
      'code': '',
      'data': {
        'countId': '',
        'current': 0,
        'hitCount': true,
        'maxLimit': 0,
        'optimizeCountSql': true,
        'orders': [
          {
            'asc': true,
            'column': ''
          }
        ],
        'pages': 0,
        'records': records,
        'searchCount': true,
        'size': 0,
        'total': records.length
      },
      'msg': '',
      'success': true
    }
  },
  create(req) {
    console.log(req)
    return {
      'code': '200',
      'data': 0,
      'msg': 'OK',
      'success': true
    }
  },
  getNetMaterialPageList() {
    const res = fs.readFileSync(path.resolve(__dirname, '../db/processing/getNetMaterialPageList.json'), 'utf-8')
    const records = JSON.parse(res)
    return {
      'code': '200',
      'data': {
        'current': 0,
        'hitCount': true,
        'pages': 0,
        'records': records,
        'searchCount': true,
        'size': 0,
        'total': records.length
      },
      'msg': 'OK',
      'success': true
    }
  },
  pageListForName() {
    const res = fs.readFileSync(path.resolve(__dirname, '../db/processing/pageListFormName.json'), 'utf-8')
    const records = JSON.parse(res)
    return {
      'code': '200',
      'data': {
        'current': 0,
        'hitCount': true,
        'pages': 0,
        'records': records,
        'searchCount': true,
        'size': 0,
        'total': records.length
      },
      'msg': '',
      'success': true
    }
  }
}
