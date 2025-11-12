/**
 * 工具函数统一导出入口
 * 通过此文件可以导入所需的工具函数
 * 小程序开发中建议直接从具体文件导入，以减小包体积
 * 例如：import { showToast } from "@/utils/common/ui";
 * 或者：import { showToast } from "@/utils/common";
 */

// 导出通用工具函数
import * as common from './common';

// 导出授权相关函数
import * as auth from './auth';

// 导出支付相关函数
import * as payment from './payment';

// 导出网络请求相关函数
import http from './request';

// 导出应用更新相关函数
import * as updateApp from './updateApp';

// 将所有模块导出
export {
  common,
  auth,
  payment,
  http,
  updateApp
};

// 导出常用函数，方便直接使用
// UI 交互相关函数
export const {
  showToast,
  showLoading,
  hideLoading,
  previewImage
} = common;

// 设备操作相关函数
export const {
  call,
  copy,
  getNodeInfo
} = common;

// 文件操作相关函数
export const {
  uploadImage,
  uploadImages
} = common;

// 格式化相关函数
export const {
  formatDate
} = common;

// 辅助工具函数
export const {
  throttle,
  debounce,
  deepClone
} = common;

// 导航相关函数
export const {
  goBack,
  getPageQuery
} = common;

// 授权相关函数
export const {
  getToken,
  setToken,
  removeToken
} = auth;
