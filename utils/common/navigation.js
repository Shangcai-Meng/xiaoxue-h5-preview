/**
 * 导航相关函数
 * 包含页面导航、获取页面参数等功能
 * 
 * @module navigation
 */

/**
 * 返回上一页 - 在不同平台上返回上一级页面
 * 在 H5 环境下使用 history API，在其他平台使用 uni.navigateBack
 * 
 * @example
 * // 在页面中调用
 * <button @click="goBack">返回上一页</button>
 * 
 * // 或者在方法中调用
 * methods: {
 *   handleCancel() {
 *     // 一些操作...
 *     goBack(); // 返回上一页
 *   }
 * }
 */
export function goBack() {
  // #ifdef H5
  history.back();
  // #endif

  // #ifndef H5
  uni.navigateBack({
    delta: 1,
  });
  // #endif
}

/**
 * 获取页面参数 - 获取当前页面的路由参数
 * 用于获取页面跳转时传递的参数信息
 * 
 * @returns {Object} - 返回当前页面的参数对象
 * 
 * @example
 * // 在页面中获取参数
 * // 假设跳转到该页面的路径是：/pages/detail/detail?id=123&type=product
 * 
 * const params = getPageQuery();
 * console.log(params.id);    // 输出：123
 * console.log(params.type);  // 输出：product
 * 
 * // 使用解构语法获取特定参数
 * const { id, type } = getPageQuery();
 * console.log(id);    // 输出：123
 * console.log(type);  // 输出：product
 */
export function getPageQuery() {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  return currentPage?.options ?? {};
}
