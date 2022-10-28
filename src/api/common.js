import request from '@/utils/request'

// 文件 上传接口 图片等
export function uploadFile(params) {
  return request.post('/file/upload', params)
}

// 入库仓库下拉接口
export function warehouseList(params = {}) {
  return request.get('/scm/warehouseInfo/selectWarehouseList', params)
}

// 商品分页列表查询
export function goodsList(params = {}) {
  return request.post('/scm/goods/search', params)
}

// 商品分类级联接口
export function goodsCategory(params = {}) {
  return request.post('/scm/goods_category/search', params)
}

// 供应商下拉接口
export function supplierPullDown(params = {}) {
  return request.get('/scm/supplier/supplierPullDown', params)
}
