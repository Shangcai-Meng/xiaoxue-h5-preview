<template>
  <view class="list-container">
    <!-- 列表头部 -->
    <view class="list-header">
      <text class="list-title">列表示例</text>
      <button class="refresh-btn" @click="pagination.refresh" :disabled="pagination.state.loading">刷新</button>
    </view>
    
    <!-- 列表内容 -->
    <view class="list-content">
      <!-- 列表项 -->
      <view v-for="(item, index) in pagination.state.list" :key="index" class="list-item">
        <image class="item-image" :src="item.image || 'https://picsum.photos/600/400'" mode="aspectFill"></image>
        <view class="item-info">
          <text class="item-title">{{ item.title }}</text>
          <text class="item-desc">{{ item.description }}</text>
        </view>
      </view>
      
      <!-- 加载状态 -->
      <view class="loading-status">
        <view v-if="pagination.state.loading" class="loading">
          <text>加载中...</text>
        </view>
        <view v-else-if="!pagination.state.hasMore && pagination.state.list.length > 0" class="no-more">
          <text>没有更多数据了</text>
        </view>
        <view v-else-if="!pagination.state.hasMore && pagination.state.list.length === 0" class="empty">
          <text>暂无数据</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { usePagination } from '@/hooks/usePagination';
import { ref } from 'vue';

// 模拟获取列表数据的API函数
const fetchListData = async (params) => {
  // 这里应该调用真实的API
  // 例如: return api.getList(params);
  
  // 为了演示，这里使用模拟数据
  return new Promise((resolve) => {
    setTimeout(() => {
      const { page, limit } = params;
      const total = 35; // 总数据量
      
      // 生成模拟数据
      const list = [];
      const startIndex = (page - 1) * limit;
      const endIndex = Math.min(startIndex + limit, total);
      
      for (let i = startIndex; i < endIndex; i++) {
        list.push({
          id: i + 1,
          title: `标题 ${i + 1}`,
          description: `这是第 ${i + 1} 条数据的描述信息，可以包含更多详细内容。`,
          image: `https://picsum.photos/600/400?random=${i + 1}`
        });
      }
      
      resolve({
        code: 200,
        data: {
          list,
          total,
          page,
          limit
        }
      });
    }, 500); // 模拟网络延迟
  });
};

// 使用分页Hook
const pagination = usePagination(fetchListData, {
  limit: 10, // 每页10条数据
  autoLoad: true, // 自动加载第一页
  pullDownRefresh: true, // 启用下拉刷新
  reachBottom: true // 启用上拉加载更多
});
</script>

<style lang="scss">
@import "@/styles/common.scss";
.list-container {
  padding: 20rpx;
  
  .list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    
    .list-title {
      font-size: 36rpx;
      font-weight: bold;
    }
    
    .refresh-btn {
      font-size: 28rpx;
      padding: 10rpx 20rpx;
      background-color: #f2f2f2;
      border-radius: 10rpx;
    }
  }
  
  .list-content {
    .list-item {
      display: flex;
      margin-bottom: 20rpx;
      padding: 20rpx;
      background-color: #fff;
      border-radius: 10rpx;
      box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
      
      .item-image {
        width: 160rpx;
        height: 160rpx;
        border-radius: 10rpx;
        margin-right: 20rpx;
      }
      
      .item-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        .item-title {
          font-size: 32rpx;
          font-weight: bold;
          margin-bottom: 10rpx;
        }
        
        .item-desc {
          font-size: 28rpx;
          color: #666;
          @include text-overflow(2);
        }
      }
    }
    
    .loading-status {
      text-align: center;
      padding: 20rpx 0;
      
      .loading, .no-more, .empty {
        font-size: 28rpx;
        color: #999;
      }
    }
  }
}
</style>
