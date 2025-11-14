<template>
  <view class="page">
    <!-- 顶部导航栏 -->
    <uv-navbar
      :placeholder="false"
      :autoBack="true"
      title="新闻列表"
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
      <image class="hero-bg" src="../../static/images/news/hero-bg.png" mode="widthFix" />
    </view>

    <scroll-view scroll-y class="scroll-view" @scroll="handleScroll">
      <!-- 导航栏占位 -->
      <view class="navbar-placeholder"></view>

      <!-- 头部占位,避免内容被背景图遮挡 -->
      <view class="hero-placeholder"></view>

      <!-- 新闻列表 -->
      <view class="news-list">
        <view 
          v-for="(item, index) in newsList" 
          :key="index" 
          class="news-item"
          @click="handleNewsClick(item)"
        >
          <view class="news-content">
            <text class="news-title">{{ item.title }}</text>
            <text class="news-time">{{ item.time }}</text>
          </view>
          <image class="news-thumb" :src="item.thumb" mode="aspectFill" />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import LanguageToggle from '@/components/LanguageToggle.vue'

// 滚动距离
const scrollTop = ref(0)

// 导航栏背景色(根据滚动距离动态计算透明度)
const navbarBgColor = computed(() => {
  // 滚动距离超过 200 时完全变白,之前渐变
  const opacity = Math.min(scrollTop.value / 200, 1)
  // 初始透明度为 0(完全透明),随着滚动逐渐变为 1(完全白色)
  return opacity === 0 ? 'transparent' : `rgba(255, 255, 255, ${opacity})`
})

// 处理滚动事件
const handleScroll = (e) => {
  scrollTop.value = e.detail.scrollTop
}

// 新闻列表数据
const newsList = ref([
  {
    id: 1,
    title: '区块链是一种去中心化的分布式账本技术，具有不可篡改',
    time: '2025-11-11  20:10',
    thumb: 'https://picsum.photos/280/200?random=1'
  },
  {
    id: 2,
    title: '区块链在金融、供应链、医疗不动产等领域得到广泛应用',
    time: '2025-11-11  20:16',
    thumb: 'https://picsum.photos/280/200?random=2'
  },
  {
    id: 3,
    title: '尽管仍面临扩展性和法规挑战，但它已经成为改变传统',
    time: '2025-11-11  21:40',
    thumb: 'https://picsum.photos/280/200?random=3'
  },
  {
    id: 4,
    title: '区块链的特点包括去中心化、不可篡改、透明、安全',
    time: '2025-11-11  21:54',
    thumb: 'https://picsum.photos/280/200?random=4'
  },
  {
    id: 5,
    title: '每个数据块都链接到前一个块形成连续的链，保障了交...',
    time: '2025-11-11  21:58',
    thumb: 'https://picsum.photos/280/200?random=5'
  }
])

// 点击新闻项
const handleNewsClick = (item) => {
  console.log('点击新闻:', item)
  uni.navigateTo({
    url: `/pages/news/detail?id=${item.id}`
  })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: F7F7F7;
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
  height: 488rpx; /* 88rpx(导航栏) + 400rpx(装饰区域) */
  background: linear-gradient(180deg, #FFF5E6 0%, #FFECD0 100%);
  overflow: hidden;
  z-index: 0;
  pointer-events: none; /* 允许点击穿透到导航栏 */
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
  height: 400rpx;
}

/* 新闻列表 */
.news-list {
  padding: 24rpx 30rpx;
  display: flex;
  flex-direction: column;
  row-gap: 20rpx;
  margin-top: -88rpx;
}

.news-item {
  background: #fff;
  border-radius: 16rpx;
  padding: 30rpx 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  column-gap: 24rpx;
  height: 210rpx;
  box-sizing: border-box;
}

.news-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.news-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-time {
  font-size: 24rpx;
  color: #888;
}

.news-thumb {
  width: 218rpx;
  height: 144rpx;
  border-radius: 16rpx;
  flex-shrink: 0;
  background: #f0f0f0;
}
</style>

