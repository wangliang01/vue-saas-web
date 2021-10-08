/**
 * 订单类型
 * @type {{URGENT: string, NON_URGENT: string}}
 */
export const ORDER_TYPE = {
  NON_URGENT: '非紧急订单',
  URGENT: '紧急订单'
}

/**
 * 订单状态
 * @type {{COMPLETED: string, TO_BE_RECEIVED: string, PART_RECEIVE: string, TO_BE_CONFIRMED: string}}
 */
export const ORDER_STATUS = {
  COMPLETED: '已完成',
  PART_RECEIVE: '部分收货',
  TO_BE_CONFIRMED: '待确认',
  TO_BE_RECEIVED: '待收货'
}
