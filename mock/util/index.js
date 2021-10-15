const mockDb = require('@wangliang01/mock-db')
const path = require('path')
const { filter } = require('lodash')

const db = {
  get(dataPath, query) {
    const data = mockDb.get(path.resolve(__dirname, dataPath))
    if (query) {
      const current = Number(query.current) || 1
      const size = Number(query.size) || 10
      const start = (current - 1) * size
      const end = start + size
      delete query.current
      delete query.size
      console.log('--------------')
      console.log(JSON.stringify(query, null, 2))
      if (Object.keys(query).length) {
        return filter(data, query).slice(start, end)
      }
      return data.slice(start, end)
    }
    return data
  },
  put(dataPath, data) {
    return mockDb.put(path.resolve(__dirname, dataPath), data)
  },
  post(dataPath, data) {
    return mockDb.post(path.resolve(__dirname, dataPath), data)
  },
  delete(dataPath, data, model) {
    return mockDb.delete(path.resolve(__dirname, dataPath), data, model)
  }
}

module.exports = {
  db,
  success(data = null, msg = 'OK', code = '200') {
    return {
      code,
      data,
      msg,
      success: true
    }
  },
  fail(data = null, msg = 'FAIL', code = '400') {
    return {
      code,
      data,
      msg,
      success: false
    }
  }

}

