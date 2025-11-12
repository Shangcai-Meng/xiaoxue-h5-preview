/**
 * 应用全局设置状态管理
 * 包含主题设置、语言设置等全局配置
 * 
 * @module store/modules/app
 */

import { defineStore } from 'pinia'

/**
 * 应用设置状态管理
 */
export const useAppStore = defineStore('app', {
  state: () => ({
    // 主题设置
    theme: 'light',
    // 语言设置
    language: 'zh-CN',
    // 字体大小
    fontSize: 'normal',
    // 是否显示引导页
    showGuide: true
  }),

  getters: {
    /**
     * 是否为暗黑主题
     * @returns {boolean} 是否为暗黑主题
     */
    isDarkTheme: (state) => state.theme === 'dark'
  },

  actions: {
    /**
     * 切换主题
     * @param {string} theme - 主题名称 'light' | 'dark'
     */
    setTheme(theme) {
      this.theme = theme
    },

    /**
     * 切换语言
     * @param {string} language - 语言代码
     */
    setLanguage(language) {
      this.language = language
    },

    /**
     * 设置字体大小
     * @param {string} size - 字体大小 'small' | 'normal' | 'large'
     */
    setFontSize(size) {
      this.fontSize = size
    },

    /**
     * 设置是否显示引导页
     * @param {boolean} show - 是否显示
     */
    setShowGuide(show) {
      this.showGuide = show
    },

    /**
     * 重置应用设置
     */
    resetSettings() {
      this.theme = 'light'
      this.language = 'zh-CN'
      this.fontSize = 'normal'
    }
  },

  // 持久化配置
  persist: {
    key: 'app-store',
    storage: {
      setItem(key, value) {
        uni.setStorageSync(key, value)
      },
      getItem(key) {
        return uni.getStorageSync(key)
      },
      removeItem(key) {
        uni.removeStorageSync(key)
      }
    }
  }
})
