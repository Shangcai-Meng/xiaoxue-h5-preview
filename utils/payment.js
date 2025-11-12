/**
 * 支付工具函数
 * 
 * 使用示例：
 * 
 * // 微信支付
 * try {
 *   await pay('wechat', {
 *     amount: 99.99,
 *     goodsId: '123',
 *     description: '测试商品'
 *   })
 * } catch (error) {
 *   console.error('支付失败：', error)
 * }
 * 
 * // 支付宝支付
 * await pay('alipay', {
 *   amount: 199,
 *   goodsId: '456'
 * })
 */

/**
 * 创建订单
 * @param {Object} params 订单参数
 * @returns {Promise} 订单信息
 */
export async function createOrder(params) {
  try {
    const res = await uni.request({
      url: '/api/orders',
      method: 'POST',
      data: params
    })
    return res.data
  } catch (error) {
    throw new Error('创建订单失败：' + error.message)
  }
}

/**
 * 统一支付方法
 * @param {string} type 支付类型：wechat-微信支付，alipay-支付宝
 * @param {Object} orderParams 订单参数
 */
export async function pay(type, orderParams) {
  try {
    // 创建订单
    const order = await createOrder(orderParams)
    
    // H5环境判断
    const isH5 = process.env.VUE_APP_PLATFORM === 'h5'
    
    // 根据环境和支付类型调用对应的支付方式
    if (type === 'wechat') {
      if (isH5) {
        // H5微信支付，需要在微信浏览器内
        const ua = navigator.userAgent.toLowerCase()
        if (ua.indexOf('micromessenger') === -1) {
          throw new Error('请在微信浏览器内打开')
        }
        // 调用微信H5支付
        return uni.requestPayment({
          provider: 'wxpay',
          ...order
        })
      } else {
        // 小程序或APP微信支付
        const platform = process.env.VUE_APP_PLATFORM
        return uni.requestPayment({
          provider: 'wxpay',
          orderInfo: platform === 'app' ? order : { ...order }
        })
      }
    } 
    else if (type === 'alipay') {
      if (isH5) {
        // H5支付宝支付，通过form表单跳转
        const div = document.createElement('div')
        div.innerHTML = order.form
        document.body.appendChild(div)
        document.forms[0].submit()
        document.body.removeChild(div)
      } else {
        // APP支付宝支付
        return uni.requestPayment({
          provider: 'alipay',
          ...order
        })
      }
    }
    else {
      throw new Error('不支持的支付方式')
    }
  } catch (error) {
    throw new Error('支付失败：' + error.message)
  }
}

/**
 * 查询支付结果
 * @param {string} orderNo 订单号
 */
export async function queryPayResult(orderNo) {
  try {
    const res = await uni.request({
      url: '/api/orders/' + orderNo,
      method: 'GET'
    })
    return res.data
  } catch (error) {
    throw new Error('查询支付结果失败：' + error.message)
  }
}
