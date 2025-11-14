<template>
  <view class="page">
    <!-- 顶部导航栏 -->
    <uv-navbar
      :placeholder="false"
      :autoBack="true"
      title="收支流水"
      :bgColor="navbarBgColor"
      :fixed="true"
      leftIconColor="#333"
      :titleStyle="{ color: '#333', fontSize: '34rpx', fontWeight: '600' }"
    >
      <template #right>
        <LanguageToggle />
      </template>
    </uv-navbar>

    <!-- 头部装饰图 - 绝对定位在顶部 -->
    <view class="hero-section">
      <image class="hero-bg" src="../../static/images/transaction/hero-bg.png" mode="widthFix" />
    </view>

    <scroll-view scroll-y class="scroll-view" @scroll="handleScroll">
      <!-- 导航栏占位 -->
      <view class="navbar-placeholder"></view>

      <!-- 头部占位 -->
      <view class="hero-placeholder"></view>

      <!-- Tab切换 -->
      <view class="tab-container">
        <view class="tab-wrapper">
          <view 
            v-for="(tab, index) in tabs" 
            :key="index"
            class="tab-item"
            :class="{ active: activeTab === index }"
            @click="handleTabChange(index)"
          >
            <text class="tab-text">{{ tab }}</text>
          </view>
        </view>
      </view>

      <!-- 流水列表 -->
      <view class="transaction-list">
        <view 
          v-for="(item, index) in filteredList" 
          :key="index"
          class="transaction-item"
        >
          <view class="item-left">
            <view class="item-icon" :class="item.type === 'income' ? 'icon-income' : 'icon-expense'">
              <image
                class="item-icon-img"
                :src="item.type === 'income' ? incomeIcon : expenseIcon"
                mode="aspectFill"
              />
            </view>
            <view class="item-info">
              <text class="item-title">{{ item.title }}</text>
              <text class="item-time">{{ item.time }}</text>
            </view>
          </view>
          <text class="item-amount" :class="item.type === 'income' ? 'amount-income' : 'amount-expense'">
            {{ item.type === 'income' ? '+' : '-' }}{{ item.amount }}
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import LanguageToggle from '@/components/LanguageToggle.vue'

const incomeIcon = '../../static/images/transaction/income-icon.png'
const expenseIcon = '../../static/images/transaction/expense-icon.png'

// 滚动距离
const scrollTop = ref(0)

// 导航栏背景色(根据滚动距离动态计算透明度)
const navbarBgColor = computed(() => {
  const opacity = Math.min(scrollTop.value / 200, 1)
  return opacity === 0 ? 'transparent' : `rgba(255, 255, 255, ${opacity})`
})

// 处理滚动事件
const handleScroll = (e) => {
  scrollTop.value = e.detail.scrollTop
}

// Tab选项
const tabs = ['全部', '收入', '支出']
const activeTab = ref(0)

// 处理Tab切换
const handleTabChange = (index) => {
  activeTab.value = index
}

// 流水列表数据
const transactionList = ref([
  {
    type: 'income',
    title: '买单收益',
    time: '2025-11-11 11:50',
    amount: 20
  },
  {
    type: 'expense',
    title: 'BTC流水支出',
    time: '2025-11-11 11:40',
    amount: 30
  },
  {
    type: 'income',
    title: '买单收益',
    time: '2025-11-11 11:50',
    amount: 20
  },
  {
    type: 'expense',
    title: 'BTC流水支出',
    time: '2025-11-11 11:40',
    amount: 100
  },
  {
    type: 'income',
    title: '买单收益',
    time: '2025-11-11 11:50',
    amount: 20
  },
  {
    type: 'expense',
    title: 'BTC流水支出',
    time: '2025-11-11 11:40',
    amount: 800
  },
  {
    type: 'expense',
    title: 'BTC流水支出',
    time: '2025-11-11 11:40',
    amount: 10
  }
])

// 根据Tab筛选列表
const filteredList = computed(() => {
  if (activeTab.value === 0) {
    return transactionList.value
  } else if (activeTab.value === 1) {
    return transactionList.value.filter(item => item.type === 'income')
  } else {
    return transactionList.value.filter(item => item.type === 'expense')
  }
})
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #f5f5f5;
}

.scroll-view {
  height: 100vh;
}

/* 导航栏占位 */
.navbar-placeholder {
  height: 88rpx;
}

/* 头部装饰区域 - 绝对定位覆盖在导航栏上 */
.hero-section {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 654rpx;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.hero-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* 头部占位 */
.hero-placeholder {
  height: 40rpx;
}

/* Tab容器 */
.tab-container {
  padding: 0 32rpx 32rpx;
}

.tab-wrapper {
  display: flex;
  background: #fff;
  border-radius: 47rpx;
  padding: 4rpx;
}

.tab-item {
  flex: 1;
  height: 94rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 47rpx;
  transition: all 0.3s;
}

.tab-item.active {
  background: linear-gradient(90deg, #FC7F3F 0%, #FCCB36 100%);
}

.tab-text {
  font-size: 32rpx;
  font-weight: 500;
  color: #666;
  transition: color 0.3s;
}

.tab-item.active .tab-text {
  color: #fff;
  font-weight: 600;
}

/* 流水列表 */
.transaction-list {
  padding: 0 32rpx 32rpx;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.transaction-item {
  background: #fff;
  border-radius: 16rpx;
  padding: 28rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-left {
  display: flex;
  align-items: center;
  column-gap: 15rpx;
  flex: 1;
  min-width: 0;
}

.item-icon {
  width: 62rpx;
  height: 62rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-icon-img {
  width: 62rpx;
  height: 62rpx;
}

.icon-income {
  background: #FFE8E8;
}

.icon-expense {
  background: #E0F5F0;
}

.icon-symbol {
  font-size: 40rpx;
  font-weight: 600;
}

.icon-income .icon-symbol {
  color: #FF5252;
}

.icon-expense .icon-symbol {
  color: #00C9A7;
}

.item-info {
  display: flex;
  flex-direction: column;
  row-gap: 8rpx;
  min-width: 0;
}

.item-title {
  font-size: 30rpx;
  font-weight: 500;
  color: #09132C;
}

.item-time {
  font-size: 24rpx;
  color: #666;
}

.item-amount {
  font-size: 34rpx;
  font-weight: 600;
  flex-shrink: 0;
  margin-left: 24rpx;
}

.amount-income {
  color: #FB5954;
}

.amount-expense {
  color: #24A980;
}
</style>

