/**
 * API 统一导出入口
 * 按功能模块组织 API 接口，提高代码可维护性
 * 
 * 使用方式：
 * 1. 统一导入：import api from '@/api'
 *    然后使用：api.user.login(data)
 * 2. 按需导入模块：import { user } from '@/api'
 *    然后使用：user.login(data)
 * 3. 直接导入特定方法（推荐，可减小包体积）：
 *    import { login } from '@/api/modules/user'
 *    然后使用：login(data)
 */

// 导入所有模块
import * as user from './modules/user';
import * as upload from './modules/upload';

// 创建 API 对象
const api = {
  user,
  upload
};

// 导出所有模块
export {
  user,
  upload
};

// 导出所有方法
export * from './modules/user';
export * from './modules/upload';

// 默认导出 API 对象
export default api;
