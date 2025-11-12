/**
 * 用户相关状态管理
 * 包含用户登录、信息获取、退出登录等功能
 *
 * @module store/modules/user
 */

import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, updateUserInfo } from '@/api'

/**
 * 用户状态管理
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    userInfo: null
  }),

  getters: {
    /**
     * 用户是否已登录
     * @returns {boolean} 登录状态
     */
    isLogin: (state) => !!state.token,

    /**
     * 获取用户名
     * @returns {string} 用户名
     */
    username: (state) => state.userInfo?.username || '',

    /**
     * 获取用户头像
     * @returns {string} 头像URL
     */
    avatar: (state) => state.userInfo?.avatar || ''
  },

  actions: {
    /**
     * 用户登录
     * @param {Object} userInfo - 用户登录信息
     * @returns {Promise<Object>} 登录结果
     */
    async login(userInfo) {
      const res = await login(userInfo)
      const { token } = res.data
      this.token = token
      setToken(token)
      return res
    },

    /**
     * 获取用户信息
     * @returns {Promise<Object>} 用户信息
     */
    async getUserInfo() {
      const res = await getUserInfo()
      this.userInfo = res.data
      return res
    },

    /**
     * 更新用户信息
     * @param {Object} data - 用户信息
     * @param {String} data.avatar - 用户头像
     * @param {String} data.nickname - 用户昵称
     * @returns {Promise<Object>} 更新结果
     */
    async updateUserProfile(data) {
      const res = await updateUserInfo(data)
      // 更新本地存储的用户信息
      if (res.code === 1) { // 假设成功状态码为1
        this.userInfo = {
          ...this.userInfo,
          ...data
        }
      }
      return res
    },

    /**
     * 退出登录
     */
    logout() {
      this.token = ''
      this.userInfo = null
      removeToken()
    }
  },

  // 持久化配置
  persist: {
    key: 'user-store', // 存储的key
    storage: {
      // 存储到本地存储
      setItem(key, value) {
        uni.setStorageSync(key, value)
      },
      getItem(key) {
        return uni.getStorageSync(key)
      },
      removeItem(key) {
        uni.removeStorageSync(key)
      }
    },
    paths: ['token', 'userInfo'] // 需要持久化的数据
  }
})
