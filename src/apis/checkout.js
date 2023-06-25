import request from '@/utils/http'
/**
 * 获取结算信息
 */
export const getCheckoutInfoAPI = () => {
  return request({
      url: '/member/order/pre'
  })
}


// 创建订单
export const createOrderAPI = (data) => {
  return request({
    url: '/member/order',
    method: 'POST',
    data
  })
}


// 添加地址
export const addAddress = (data) => {
  return request({
    url: '/member/address',
    method: 'POST',
    data
  })
}
