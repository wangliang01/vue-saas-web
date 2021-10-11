import request from '@/utils/request'

/**
 * 获取商品列表
 * @param params
 * @returns {*}
 */
export function get(params) {
  return request.post('/scm/goods/search', params)
}

/**
 * 新增商品
 * @param params
 * @returns {*}
 */
export function add(params) {
  return request.post('/scm/goods/add', params)
}

/**
 * 编辑商品
 * @param params
 * @returns {*}
 */
export function update(params) {
  return request.post('/scm/goods/update', params)
}

/**
 * 编辑商品
 * @param params
 * @returns {*}
 */
export function getGoodsById(id) {
  return request.get(`/scm/goods/${id}`)
}

/**
 * 修改商品状态
 * @param params
 * @returns {*}
 */
export function updateStatus(params) {
  return request.post(`/scm/goods/updateStatus`, params)
}

/**
 * 获取单位列表
 * @param params
 * @returns {*}
 */
export function getGoodsUnit() {
  return request.get(`/scm/goods/getGoodsUnit`)
}

/**
 * 获取商品类别列表
 * @param params
 * @returns {*}
 */
export function getCategory(params) {
  return request.post('/scm/goods_category/search', params)
}

/**
 * 更新商品类别
 * @param params
 * @returns {*}
 */
export function updateCategory(params) {
  return request.post('/scm/goods_category/update', params)
}

/**
 * 添加商品类别
 * @param params
 * @returns {*}
 */
export function addCategory(params) {
  return request.post('/scm/goods_category/add', params)
}

/**
 * 删除商品类别
 * @param params
 * @returns {*}
 */
export function delCategory(params) {
  return request.post('/scm/goods_category/delete', params)
}

/**
 * 导入商品
 * @param params
 * @returns {*}
 */
export function importGoods(params) {
  return request.post('/scm/goods/importGoods', params)
}

/**
 * 查询供应商
 * @param params
 * @returns {*}
 */
export function getSupplierGoodsById(params) {
  return request.get('/scm/goods/getSupplierGoodsById', params)
}
