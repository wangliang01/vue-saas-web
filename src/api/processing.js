import request from '@/utils/request'

// 加工单详情
export function detail(params) {
  const id = params.id
  return request.get(`/sales/processing_order/detail/${id}`)
}
// 加工单列表
export function listPage(params) {
  return request.post(`/sales/processing_order/listPage`, params)
}
// 新增加工单
export function create(params) {
  return request.post(`/sales/processing_order/save`, params)
}
// 根据skuIds查询净菜信息
export function getNetMaterialPageList(params) {
  return request.post('/goods/goods/getNetMaterialPageList', params)
}
// 关联半成品
export function pageListForName(params) {
  return request.post('/cookbook/semifinished/specification/pageListForName', params)
}

