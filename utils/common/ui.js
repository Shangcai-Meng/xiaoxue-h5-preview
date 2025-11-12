/**
 * UI 交互相关函数
 * 包含提示框、加载框、图片预览等 UI 交互功能
 * 
 * @module ui
 */

/**
 * 图片预览 - 在全屏模式下预览图片
 * 
 * @param {String|Array} urls - 需要预览的图片地址，可以是单个字符串或字符串数组
 * @param {String} [current] - 当前显示图片的链接/索引值，不传则默认显示第一张
 * 
 * @example
 * // 预览单张图片
 * <image src="/static/images/photo.jpg" @click="previewImage('/static/images/photo.jpg')"></image>
 * 
 * // 预览多张图片，并指定当前显示的图片
 * const images = [
 *   'https://example.com/image1.jpg',
 *   'https://example.com/image2.jpg',
 *   'https://example.com/image3.jpg'
 * ];
 * 
 * // 点击第二张图片时预览
 * previewImage(images, images[1]);
 */
export function previewImage(urls, current) {
  uni.previewImage({
    urls: typeof urls === "string" ? [urls] : urls,
    current,
  });
}

/**
 * 提示框 - 显示消息提示框
 * 
 * @param {String} title - 提示内容
 * @param {Object} [options={}] - 配置选项
 * @param {String} [options.icon='none'] - 图标类型，有效值包括: 'success', 'loading', 'none'
 * @param {Number} [options.duration=1500] - 提示框显示时间，单位毫秒
 * @param {Boolean} [options.mask] - 是否显示透明蒙层，防止触摸穿透
 * 
 * @example
 * // 基本使用
 * showToast('操作成功');
 * 
 * // 显示成功图标
 * showToast('保存成功', { icon: 'success' });
 * 
 * // 自定义显示时间
 * showToast('网络连接失败', { duration: 3000 });
 * 
 * // 显示带遮罩的提示
 * showToast('正在处理', { mask: true });
 */
export function showToast(title, options = {}) {
  uni.showToast({
    title,
    icon: "none",
    duration: 1500,
    ...options,
  });
}

/**
 * 显示加载框 - 显示加载中提示框
 * 
 * @param {String} [title='加载中'] - 加载提示文字
 * 
 * @example
 * // 基本使用
 * showLoading();
 * 
 * // 自定义提示文字
 * showLoading('数据加载中');
 * 
 * // 在请求中使用
 * async function fetchData() {
 *   showLoading();
 *   try {
 *     const data = await api.getData();
 *     // 处理数据...
 *   } catch (error) {
 *     console.error(error);
 *   } finally {
 *     hideLoading();
 *   }
 * }
 */
export function showLoading(title = "加载中") {
  uni.showLoading({
    title,
    mask: true,
  });
}

/**
 * 隐藏加载框 - 隐藏当前显示的加载框
 * 
 * @example
 * // 基本使用
 * hideLoading();
 * 
 * // 在异步操作完成后隐藏加载框
 * async function uploadImage() {
 *   showLoading('上传中');
 *   try {
 *     await api.uploadFile(file);
 *     showToast('上传成功');
 *   } catch (error) {
 *     showToast('上传失败');
 *   } finally {
 *     hideLoading();
 *   }
 * }
 */
export function hideLoading() {
  uni.hideLoading();
}
