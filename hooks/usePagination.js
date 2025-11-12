/**
 * 通用分页 Hook
 * 封装了分页相关的状态和方法，便于在列表页面中使用
 * 
 * @module hooks/usePagination
 * 
 * @example
 * // 基本使用方法
 * <script setup>
 * import { usePagination } from '@/hooks/usePagination';
 * 
 * // 1. 定义获取数据的函数
 * const fetchListData = async (params) => {
 *   // 调用实际的 API
 *   return api.getList(params);
 * };
 * 
 * // 2. 使用分页 Hook
 * const pagination = usePagination(fetchListData, {
 *   limit: 10, // 每页数量
 *   autoLoad: true // 自动加载第一页
 * });
 * 
 * // 3. 在模板中使用
 * // <view v-for="item in pagination.state.list" :key="item.id">{{ item.title }}</view>
 * // <view v-if="pagination.state.loading">加载中...</view>
 * // <view v-else-if="!pagination.state.hasMore">没有更多数据了</view>
 * </script>
 * 
 * @example
 * // 高级用法：手动控制加载和刷新
 * <template>
 *   <view>
 *     <button @click="pagination.refresh">刷新</button>
 *     <view v-for="item in pagination.state.list" :key="item.id">{{ item.title }}</view>
 *     <button @click="pagination.loadMore" :disabled="!pagination.state.hasMore || pagination.state.loading">
 *       {{ pagination.state.loading ? '加载中...' : pagination.state.hasMore ? '加载更多' : '没有更多数据了' }}
 *     </button>
 *   </view>
 * </template>
 * 
 * <script setup>
 * import { usePagination } from '@/hooks/usePagination';
 * 
 * const fetchListData = async (params) => {
 *   return api.getList(params);
 * };
 * 
 * // 禁用自动上拉加载和下拉刷新，改为手动控制
 * const pagination = usePagination(fetchListData, {
 *   limit: 15,
 *   autoLoad: true,
 *   pullDownRefresh: false,
 *   reachBottom: false
 * });
 * </script>
 */

import { ref, reactive, onMounted } from 'vue';
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app';
import { showToast, showLoading, hideLoading } from '@/utils/common/ui';

/**
 * 使用分页 Hook
 * @param {Function} fetchFunction - 获取数据的函数，接收 {page, limit} 参数，返回 Promise
 * @param {Object} options - 配置选项
 * @param {number} options.limit - 每页数量，默认 10
 * @param {boolean} options.autoLoad - 是否自动加载第一页，默认 true
 * @param {boolean} options.pullDownRefresh - 是否启用下拉刷新，默认 true
 * @param {boolean} options.reachBottom - 是否启用上拉加载更多，默认 true
 * @returns {Object} 分页相关的状态和方法
 */
export function usePagination(fetchFunction, options = {}) {
  // 默认选项
  const defaultOptions = {
    limit: 10,
    autoLoad: true,
    pullDownRefresh: true,
    reachBottom: true
  };

  // 合并选项
  const mergedOptions = { ...defaultOptions, ...options };

  // 分页状态
  const state = reactive({
    // 列表数据
    list: [],
    // 当前页码
    page: 1,
    // 每页数量
    limit: mergedOptions.limit,
    // 是否有更多数据
    hasMore: true,
    // 是否正在加载
    loading: false,
    // 是否正在刷新
    refreshing: false,
    // 是否为第一次加载
    firstLoad: true,
    // 总数据量
    total: 0
  });

  // 错误信息
  const error = ref(null);

  /**
   * 加载数据
   * @param {boolean} isRefresh - 是否为刷新操作
   * @returns {Promise<void>}
   */
  const loadData = async (isRefresh = false) => {
    // 如果没有更多数据且不是刷新操作，则直接返回
    if (!state.hasMore && !isRefresh) {
      return;
    }

    try {
      showLoading('加载中...');
      // 设置加载状态
      state.loading = true;
      error.value = null;

      // 如果是刷新操作，重置页码
      if (isRefresh) {
        state.page = 1;
        state.refreshing = true;
      }

      // 调用获取数据的函数
      const res = await fetchFunction({
        page: state.page,
        limit: state.limit
      });

      // 处理返回的数据
      const { list, total } = res.data;

      // 更新状态
      if (isRefresh) {
        state.list = list || [];
      } else {
        state.list = [...state.list, ...(list || [])];
      }

      state.total = total || 0;
      state.hasMore = state.list.length < state.total;
      state.firstLoad = false;

      // 如果有更多数据，页码加1
      if (state.hasMore) {
        state.page += 1;
      }
    } catch (err) {
      error.value = err.message || '加载失败';
      showToast(error.value);
    } finally {
      hideLoading();
      // 重置加载状态
      state.loading = false;
      state.refreshing = false;

      // 如果是下拉刷新，停止下拉刷新动画
      if (isRefresh) {
        uni.stopPullDownRefresh();
      }
    }
  };

  /**
   * 刷新数据
   * @returns {Promise<void>}
   */
  const refresh = () => loadData(true);

  /**
   * 加载更多数据
   * @returns {Promise<void>}
   */
  const loadMore = () => {
    if (!state.loading) {
      loadData();
    }
  };

  /**
   * 重置分页状态
   */
  const reset = () => {
    state.list = [];
    state.page = 1;
    state.hasMore = true;
    state.loading = false;
    state.refreshing = false;
    state.firstLoad = true;
    error.value = null;
  };

  // 组件挂载时自动加载第一页
  onMounted(() => {
    if (mergedOptions.autoLoad) {
      loadData();
    }
  });

  // 如果启用了下拉刷新，监听下拉刷新事件
  if (mergedOptions.pullDownRefresh) {
    onPullDownRefresh(() => {
      refresh();
    });
  }

  // 如果启用了上拉加载更多，监听触底事件
  if (mergedOptions.reachBottom) {
    onReachBottom(() => {
      loadMore();
    });
  }

  return {
    // 状态
    state,
    error,
    
    // 方法
    loadData,
    refresh,
    loadMore,
    reset
  };
}
