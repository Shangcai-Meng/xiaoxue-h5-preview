/**
 * 状态管理统一导出入口
 * 按功能模块组织状态管理，提高代码可维护性
 * 
 * 使用方式：
 * 1. 导入特定模块：import { useUserStore } from '@/store'
 *    然后使用：const userStore = useUserStore()
 * 2. 直接从模块导入：import { useUserStore } from '@/store/modules/user'
 *    然后使用：const userStore = useUserStore()
 */

// 导出所有模块
export { useUserStore } from './modules/user'
export { useAppStore } from './modules/app'
