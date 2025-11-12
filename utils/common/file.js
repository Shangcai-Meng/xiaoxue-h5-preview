/**
 * 文件操作相关函数
 * 包含上传图片等文件操作功能
 * 
 * @module file
 */

import { showLoading, hideLoading, showToast } from './ui';
import env from "@/config/env";
import api from "@/api";

/**
 * 上传单张图片 - 选择并上传单张图片
 * 封装了选择图片和上传的完整流程，包含加载提示和错误处理
 * 
 * @param {Object} [options={}] - uni.chooseImage 的配置选项
 * @param {Number} [options.count=1] - 最多可以选择的图片张数，默认为 1
 * @param {Array} [options.sizeType=['original', 'compressed']] - 所选的图片的尺寸类型
 * @param {Array} [options.sourceType=['album', 'camera']] - 选择图片的来源
 * @returns {Promise<String>} - 返回 Promise，解析为上传成功后的图片地址
 * 
 * @example
 * // 基本使用
 * async function handleUploadAvatar() {
 *   try {
 *     const imageUrl = await uploadImage();
 *     console.log('上传成功，图片地址：', imageUrl);
 *     
 *     // 更新用户头像
 *     this.userInfo.avatar = imageUrl;
 *   } catch (error) {
 *     console.error('上传失败:', error);
 *   }
 * }
 * 
 * // 指定只能从相册选择
 * async function selectFromAlbumOnly() {
 *   try {
 *     const imageUrl = await uploadImage({
 *       sourceType: ['album']
 *     });
 *     // 使用上传后的图片地址
 *   } catch (error) {
 *     // 处理错误
 *   }
 * }
 */
export async function uploadImage(options = {}) {
  try {
    // 选择图片
    const { tempFilePaths } = await uni.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      ...options,
    });

    // 显示加载提示
    showLoading("上传中");

    try {
      // 上传图片
      const res = await api.common.upload(tempFilePaths[0]);
      
      // 处理响应结果
      if (res.code === env.code.success) {
        return res.data;
      } else {
        throw new Error(res.message || "上传失败");
      }
    } finally {
      // 无论成功失败，都隐藏加载提示
      hideLoading();
    }
  } catch (error) {
    // 显示错误提示
    showToast(error.message || "上传失败");
    throw error;
  }
}

/**
 * 上传多张图片 - 选择并上传多张图片
 * 封装了选择多张图片并并行上传的完整流程，包含加载提示和错误处理
 * 
 * @param {Object} [options={}] - uni.chooseImage 的配置选项
 * @param {Number} [options.count=9] - 最多可以选择的图片张数，默认为 9
 * @param {Array} [options.sizeType=['original', 'compressed']] - 所选的图片的尺寸类型
 * @param {Array} [options.sourceType=['album', 'camera']] - 选择图片的来源
 * @returns {Promise<Array<String>>} - 返回 Promise，解析为上传成功后的图片地址数组
 * 
 * @example
 * // 基本使用
 * async function handleUploadProductImages() {
 *   try {
 *     const imageUrls = await uploadImages();
 *     console.log('上传成功，图片地址列表：', imageUrls);
 *     
 *     // 更新商品图片列表
 *     this.product.images = imageUrls;
 *   } catch (error) {
 *     console.error('上传失败:', error);
 *   }
 * }
 * 
 * // 限制最多选择 3 张图片
 * async function uploadMaxThreeImages() {
 *   try {
 *     const imageUrls = await uploadImages({
 *       count: 3
 *     });
 *     // 使用上传后的图片地址数组
 *   } catch (error) {
 *     // 处理错误
 *   }
 * }
 */
export async function uploadImages(options = {}) {
  try {
    // 选择图片
    const { tempFilePaths } = await uni.chooseImage({
      count: 9,
      sizeType: ["original", "compressed"],
      ...options,
    });

    // 显示加载提示
    showLoading("上传中");

    try {
      // 并行上传所有图片
      const uploadTasks = tempFilePaths.map((filePath) => api.common.upload(filePath));
      const results = await Promise.all(uploadTasks);
      
      // 处理响应结果
      return results.map((res) => {
        if (res.code === env.code.success) {
          return res.data;
        } else {
          throw new Error(res.message || "上传失败");
        }
      });
    } finally {
      // 无论成功失败，都隐藏加载提示
      hideLoading();
    }
  } catch (error) {
    // 显示错误提示
    showToast(error.message || "上传失败");
    throw error;
  }
}
