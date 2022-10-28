const _ = require('lodash')

const defaultConfig = require('./default/setting.config')
const customerConfig = require('./customer/setting.config')

const config = _.merge(defaultConfig, customerConfig)

module.exports = config
