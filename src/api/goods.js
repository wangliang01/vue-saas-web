import request from '@/utils/request'

/**
 * 获取商品列表
 * @param params
 * @returns {*}
 */
export function getGoodsList(params) {
  return request.get('/scm/goods/search', params)
}

