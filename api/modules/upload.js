/**
 * 文件上传相关 API
 * 包含文件上传、图片上传等功能
 *
 * @module api/modules/upload
 */

import http from "@/utils/request";
import env from "@/config/env";
import { showLoading, hideLoading } from '@/utils/common/ui';

/**
 * 上传文件
 *
 * @param {Object} data - 上传参数
 * @param {String} data.file - 文件路径
 * @param {String} data.type - 文件类型
 * @returns {Promise} - 返回上传结果
 */
export function uploadFile(data) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: env.baseUrl + "/system/basic/uploadFile",
      filePath: data.file,
      name: "file",
      formData: {
        type: data.type,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const result = JSON.parse(res.data);
          resolve(result);
        } else {
          reject(new Error("上传失败"));
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

/**
 * 上传单张图片
 *
 * @param {String} file - 图片文件路径
 * @returns {Promise} - 返回上传结果
 */
export function uploadImage(file) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: env.baseUrl + "/system/basic/uploadImage",
      filePath: file,
      name: "img",
      success: (res) => {
        if (res.statusCode === 200) {
          const result = JSON.parse(res.data);
          resolve(result);
        } else {
          reject(new Error("上传失败"));
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

/**
 * 上传用户头像
 *
 * @param {Object} data - 上传参数
 * @param {String} data.file - 文件路径
 * @returns {Promise} - 返回上传结果
 */
export function uploadUserAvatar(data) {
  showLoading("上传中");

  // 开发环境下，可以直接返回临时路径用于测试
  if (env.ENV_TYPE === 'development') {
    hideLoading();
    return Promise.resolve({
      code: env.code.success,
      data: {
        url: data.file
      }
    });
  }

  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: env.baseUrl + "/system/basic/uploadAvatar",
      filePath: data.file,
      name: "file",
      header: {
        'Authorization': uni.getStorageSync('token') || ''
      },
      success: (res) => {
        hideLoading();
        if (res.statusCode === 200) {
          const result = JSON.parse(res.data);
          resolve(result);
        } else {
          reject(new Error("上传失败"));
        }
      },
      fail: (err) => {
        hideLoading();
        reject(err);
      },
    });
  });
}
