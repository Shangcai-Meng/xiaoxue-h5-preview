import Request from "luch-request";
import { getToken, removeToken } from "./auth";
import env from "@/config/env";

// ==================== 常量定义 ====================
const TIMING_CONSTANTS = {
  TOAST_DELAY: 50,           // Toast 显示延迟
  TOAST_RESET_DELAY: 100,    // Toast 状态重置延迟
  DEFAULT_TOAST_DURATION: 2000, // 默认 Toast 显示时长
};

// ==================== 全局状态变量 ====================
// 是否正在显示登录提示
let isShowingLoginTip = false;
// 是否正在显示错误提示
let isShowingErrorToast = false;
// 用户是否已经拒绝过登录
let hasUserDeclinedLogin = false;

// ==================== 工具函数 ====================
/**
 * 安全检查网络状态
 * 兼容多端环境（H5、微信小程序、App）
 * @returns {boolean} 是否在线
 */
const isOnline = () => {
  try {
    // #ifdef H5
    if (typeof window !== 'undefined' && window.navigator) {
      return window.navigator.onLine !== false;
    }
    // #endif

    // 小程序和App环境默认认为在线
    return true;
  } catch (error) {
    console.warn('无法检测网络状态:', error);
    return true; // 默认认为在线
  }
};

/**
 * 检查是否为未授权错误
 * @param {Object} error - 错误对象
 * @returns {boolean} 是否为未授权错误
 */
const isUnauthorizedError = (error) => {
  return error.statusCode === 401 ||
         (error.data && error.data.code === env.code.unauthorized);
};

/**
 * 重置登录状态
 * 在以下情况下调用：页面刷新、重新登录、应用重启等
 */
const resetLoginState = () => {
  hasUserDeclinedLogin = false;
  isShowingLoginTip = false;
};

/**
 * 清除用户相关数据
 * 在检测到 token 失效/未授权时调用，确保清除所有用户相关的缓存和数据
 */
const clearUserData = async () => {
  try {
    // 1. 清除本地存储的 token
    removeToken();

    // 2. 清除 Pinia store 中的用户数据
    // 动态导入避免循环依赖
    const { useUserStore } = await import('@/store/modules/user');
    const userStore = useUserStore();
    userStore.logout();

    console.log('用户数据已清除：token、用户信息、持久化数据');
  } catch (error) {
    console.error('清除用户数据时出错：', error);
  }
};

/**
 * 处理未授权错误的统一逻辑
 * 消除重复代码，统一处理401错误
 * @returns {Promise<void>}
 */
const handleUnauthorizedError = async () => {
  // 先清除用户数据，再显示登录弹窗
  await clearUserData();
  await showLoginModal();
};

/**
 * 检查是否应该显示登录弹窗
 * @returns {boolean} 是否应该显示登录弹窗
 */
const shouldShowLoginModal = () => {
  // 如果用户已经拒绝过登录，则不再显示弹窗
  if (hasUserDeclinedLogin) {
    return false;
  }
  // 如果正在显示登录提示，则不重复显示
  if (isShowingLoginTip) {
    return false;
  }
  return true;
};

const http = new Request({
  baseURL: env.baseUrl + env.apiPrefix,
  timeout: env.timeout,
  header: {
    "Content-Type": "application/json",
  },
});

/**
 * 显示错误提示
 * 该函数确保错误提示不会被uni.hideLoading()调用所影响
 *
 * @param {string} message - 错误信息
 * @param {Object} options - 配置选项
 * @param {string} options.icon - 图标类型，默认为'none'
 * @param {number} options.duration - 显示时长，默认为2000ms
 * @param {boolean} options.mask - 是否显示遮罩，默认为true
 * @returns {Promise} 返回Promise，在Toast显示完成后resolve
 */
const showErrorToast = (message, options = {}) => {
  // 如果已经在显示错误提示，则不重复显示
  if (isShowingErrorToast) return Promise.resolve();

  isShowingErrorToast = true;

  // 默认配置
  const defaultOptions = {
    icon: 'none',
    duration: TIMING_CONSTANTS.DEFAULT_TOAST_DURATION,
    mask: true
  };

  // 合并配置
  const finalOptions = { ...defaultOptions, ...options };

  return new Promise((resolve) => {
    // 先确保隐藏loading，避免loading和toast冲突
    uni.hideLoading();

    // 使用setTimeout确保toast在hideLoading之后显示
    setTimeout(() => {
      uni.showToast({
        title: message,
        icon: finalOptions.icon,
        duration: finalOptions.duration,
        mask: finalOptions.mask,
        complete: () => {
          // Toast显示完成后重置状态
          setTimeout(() => {
            isShowingErrorToast = false;
            resolve();
          }, TIMING_CONSTANTS.TOAST_RESET_DELAY);
        }
      });
    }, TIMING_CONSTANTS.TOAST_DELAY);
  });
};

/**
 * 登录弹窗逻辑
 * 显示登录提示对话框，支持用户拒绝后的状态管理
 *
 * @returns {Promise<boolean>} 用户是否确认登录
 */
const showLoginModal = () => {
  // 检查是否应该显示登录弹窗
  if (!shouldShowLoginModal()) {
    return Promise.resolve(false);
  }

  isShowingLoginTip = true;
  return new Promise((resolve) => {
    uni.showModal({
      title: "提示",
      content: "此操作需要登录，是否去登录？",
      success: function (res) {
        if (res.confirm) {
          // 用户确认登录，跳转到登录页面
          uni.navigateTo({
            url: "/pages/login/login",
          });
          resolve(true);
        } else {
          // 用户取消登录，记录用户的选择
          hasUserDeclinedLogin = true;
          console.log('用户已拒绝登录，在当前会话期间不再显示登录弹窗');
          resolve(false);
        }
      },
      complete: function () {
        isShowingLoginTip = false;
      },
    });
  });
};

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      // config.header['Authorization'] = `${env.token.prefix} ${token}`
      config.header["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  async (response) => {
    const res = response.data;

    // 如果业务状态码不是成功，说明有错误
    if (res.code !== env.code.success) {
      // 401: Token 过期或未登录
      if (res.code === env.code.unauthorized) {
        // 使用统一的未授权处理函数
        await handleUnauthorizedError();
      } else {
        // 使用抽离的错误提示函数
        await showErrorToast(res.msg || env.errorMsg.fail);
      }
      return Promise.reject(res || "Error");
    }
    return res;
  },
  async (error) => {
    console.error("请求错误：", error);

    // 处理401未授权错误
    if (isUnauthorizedError(error)) {
      // 使用统一的未授权处理函数
      await handleUnauthorizedError();
      return Promise.reject(error);
    }

    // 获取错误消息
    let message = "";
    if (error.code === "ECONNABORTED") {
      message = env.errorMsg.timeout;
    } else if (!isOnline()) {
      message = env.errorMsg.network;
    } else {
      message = env.errorMsg.fail;
    }

    // 使用抽离的错误提示函数
    await showErrorToast(message);

    return Promise.reject(error);
  }
);

// 导出重置登录状态管理函数和用户数据清除函数
export { resetLoginState, clearUserData, handleUnauthorizedError };

export default http;
