/**
 * 设备操作相关函数
 * 包含拨打电话、复制文本、获取DOM节点信息等设备相关功能
 * 
 * @module device
 */

import { showToast } from './ui';

/**
 * 拨打电话 - 调用设备拨打功能拨打指定电话
 * 
 * @param {String} phone - 要拨打的电话号码
 * 
 * @example
 * // 拨打客服电话
 * <button @click="call('400-123-4567')">400-123-4567</button>
 * 
 * // 或者在方法中调用
 * methods: {
 *   contactCustomerService() {
 *     call('400-123-4567');
 *   }
 * }
 */
export function call(phone) {
  uni.makePhoneCall({
    phoneNumber: phone,
  });
}

/**
 * 复制文本 - 将指定内容复制到系统剪贴板
 * 
 * @param {String} content - 要复制的文本内容
 * @returns {Promise} - 返回 Promise 对象，复制成功或失败
 * 
 * @example
 * // 复制文本
 * <button @click="copy('https://example.com')">复制链接</button>
 * 
 * // 异步使用
 * async function copyAndShare() {
 *   try {
 *     await copy('https://example.com');
 *     console.log('链接已复制，可以粘贴分享给好友');
 *   } catch (error) {
 *     console.error('复制失败');
 *   }
 * }
 */
export async function copy(content) {
  try {
    await uni.setClipboardData({
      data: content,
    });
    showToast("复制成功");
  } catch (error) {
    showToast("复制失败");
  }
}

/**
 * 获取DOM节点信息 - 获取指定选择器对应节点的位置和尺寸信息
 * 
 * @param {String} selector - 节点选择器，与 CSS 选择器类似，如 '.class-name' 或 '#id-name'
 * @returns {Promise<Object>} - 返回 Promise，解析为节点信息对象，包含尺寸、位置等属性
 * 
 * @example
 * // 获取元素位置和尺寸
 * async function getElementInfo() {
 *   const nodeInfo = await getNodeInfo('.banner-image');
 *   console.log('width:', nodeInfo.width);
 *   console.log('height:', nodeInfo.height);
 *   console.log('top:', nodeInfo.top);
 *   console.log('left:', nodeInfo.left);
 * }
 * 
 * // 判断元素是否在可视区域内
 * async function isElementVisible() {
 *   const nodeInfo = await getNodeInfo('#target-element');
 *   const windowHeight = uni.getSystemInfoSync().windowHeight;
 *   
 *   if (nodeInfo && nodeInfo.top < windowHeight && nodeInfo.top + nodeInfo.height > 0) {
 *     console.log('元素在可视区域内');
 *     return true;
 *   } else {
 *     console.log('元素不在可视区域内');
 *     return false;
 *   }
 * }
 */
export function getNodeInfo(selector) {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery();
    query
      .select(selector)
      .boundingClientRect((data) => {
        resolve(data);
      })
      .exec();
  });
}
