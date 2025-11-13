<template>
  <view class="page">
    <!-- 顶部导航栏 -->
    <uv-navbar
      :placeholder="false"
      :autoBack="true"
      title="详情"
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

      <!-- 头部占位 -->
      <view class="hero-placeholder"></view>

      <!-- 文章内容 -->
      <view class="article-container">
        <!-- 文章标题 -->
        <view class="article-header">
          <text class="article-title">{{ article.title }}</text>
          <text class="article-time">{{ article.time }}</text>
        </view>

        <!-- 文章正文 -->
        <view class="article-content">
          <text class="article-text" v-for="(paragraph, index) in article.content" :key="index">
            {{ paragraph }}
          </text>
        </view>

        <!-- 文章配图 -->
        <view class="article-images" v-if="article.images && article.images.length > 0">
          <image 
            v-for="(img, index) in article.images" 
            :key="index"
            class="article-image" 
            :src="img" 
            mode="widthFix" 
          />
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import LanguageToggle from '@/components/LanguageToggle.vue'

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

// 文章数据
const article = ref({
  title: '区块链是一种去中心化的分布式账本技术，具有不可篡改',
  time: '2025-11-11 12:30',
  content: [
    '区块链（英文名：blockchain [3-4] | 7或block chain [2]）是一种块链式存储、不可篡改、安全可信的去中心化分布式账本 [1]，它结合了分布式存储、点对点传输、共识机制、密码学等技术 [8]，通过不断增长的数据块链（Blocks）记录交易和信息，确保数据的安全和透明性。区块链起源于比特币（Bitcoin），由中本聪（Satoshi Nakamoto）在2008年提出，作为比特币的底层技术 [1]，从诞生初期的比特币网络开始，区块链逐渐演化为一项全球性技术，吸引了全球的关注和投资[3]。随后，以太坊（Ethereum）等新一代区块链平台的出现进一步扩展了应用领域',
    '一、块链的特点包括去中心化、不可篡改、透明',
    '区块链的特点包括去中心化、不可篡改、透明、安全和可编程性 [6] [8]。每个数据块都链接到前一个块，形成连续的链，保障了交易历史的完整性。智能合约技术使区块链可编程，支持更广泛的应用。区块链在金融、供应链、医疗、不动产等领域得到广泛应用 [5] [8]。尽管仍面临扩展性和法规挑战，但它已经成为改变传统商业和社会模式的强大工具，对未来具有巨大潜力'
  ],
  images: [
    'https://picsum.photos/686/600?random=1'
  ]
})

// 页面加载时可以从路由参数获取文章ID并加载数据
onMounted(() => {
  // 这里可以根据路由参数加载文章详情
  // const pages = getCurrentPages()
  // const currentPage = pages[pages.length - 1]
  // const id = currentPage.options.id
  // loadArticleDetail(id)
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
  height: 488rpx;
  background: linear-gradient(180deg, #FFF5E6 0%, #FFECD0 100%);
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
  height: 80rpx;
}

/* 文章容器 */
.article-container {
  background: #fff;
  border-radius: 32rpx 32rpx 0 0;
  padding: 48rpx 32rpx;
  min-height: calc(100vh - 168rpx);
}

/* 文章头部 */
.article-header {
  display: flex;
  flex-direction: column;
  row-gap: 16rpx;
  margin-bottom: 32rpx;
}

.article-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  line-height: 1.5;
}

.article-time {
  font-size: 24rpx;
  color: #999;
  text-align: right;
}

/* 文章正文 */
.article-content {
  display: flex;
  flex-direction: column;
  row-gap: 32rpx;
}

.article-text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.8;
  text-align: justify;
  text-indent: 2em;
}

/* 文章配图 */
.article-images {
  margin-top: 48rpx;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.article-image {
  width: 100%;
  border-radius: 16rpx;
}
</style>

