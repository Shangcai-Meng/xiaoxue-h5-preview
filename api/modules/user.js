/**
 * 用户相关 API
 * 包含登录、获取用户信息、退出登录等功能
 * 
 * @module api/modules/user
 */

import http from '@/utils/request';

/**
 * 用户登录
 * 
 * @param {Object} data - 登录参数
 * @param {String} data.username - 用户名
 * @param {String} data.password - 密码
 * @returns {Promise} - 返回登录结果
 */
export function login(data) {
  return http.post('/user/login', data);
}

/**
 * 获取用户信息
 * 
 * @returns {Promise} - 返回用户信息
 */
export function getUserInfo() {
  return http.get('/user/info');
}

/**
 * 退出登录
 * 
 * @returns {Promise} - 返回退出结果
 */
export function logout() {
  return http.post('/user/logout');
}

/**
 * 更新用户信息
 * 
 * @param {Object} data - 用户信息
 * @param {String} data.avatar - 用户头像
 * @param {String} data.nickname - 用户昵称
 * @returns {Promise} - 返回更新结果
 */
export function updateUserInfo(data) {
  return http.post('/user/update', data);
}
