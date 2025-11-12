// 获取当前环境
const ENV_TYPE = process.env.NODE_ENV || "development";

// 环境配置
const ENV_CONFIG = {
  development: {
    baseUrl: "http://localhost:3000",
    apiPrefix: "/api",
  },
  production: {
    baseUrl: "https://api.yourdomain.com",
    apiPrefix: "/api",
  },
};

// 当前环境配置
const CURRENT_CONFIG = ENV_CONFIG[ENV_TYPE];

export default {
  // 环境
  ENV_TYPE,

  // 基础URL
  baseUrl: CURRENT_CONFIG.baseUrl,

  // 接口前缀
  apiPrefix: CURRENT_CONFIG.apiPrefix,

  // 请求超时时间
  timeout: 30000,

  // 错误信息
  errorMsg: {
    timeout: "请求超时，请重试",
    fail: "请求失败，请重试",
    network: "网络错误，请检查网络连接",
  },

  // token相关
  token: {
    key: "User-Token",
    prefix: "Bearer",
  },

  // 业务状态码
  code: {
    success: 1, // 成功
    unauthorized: 401, // 未授权
    forbidden: 403, // 禁止访问
    notFound: 404, // 未找到
  },
};
