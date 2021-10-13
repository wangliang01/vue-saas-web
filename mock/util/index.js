const mockDb = require('@wangliang01/mock-db')
const path = require('path')

const db = {
  get(dataPath) {
    return mockDb.get(path.resolve(__dirname, dataPath))
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

