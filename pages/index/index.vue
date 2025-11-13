<template>
  <view class="page">
    <image class="bg" src="../../static/images/index/bg.png" mode="widthFix" />

    <!-- 顶部导航栏 - 固定定位悬浮 -->
    <uv-navbar
      :placeholder="false"
      :autoBack="false"
      leftIconSize="0"
      :bgColor="navbarBgColor"
      :fixed="true"
    >
      <template #left>
        <view class="navbar-left">
          <image class="logo" src="../../static/images/index/logo.png" />
          <text class="brand">VIRTU108</text>
        </view>
      </template>
      <template #right>
        <LanguageToggle />
      </template>
    </uv-navbar>

    <scroll-view
      scroll-y
      class="scroll-view"
      @scroll="handleScroll"
    >
      <!-- 导航栏占位 -->
      <view class="navbar-placeholder"></view>
      <view class="container">

    <image class="hero" src="../../static/images/index/hero.png" mode="widthFix" />

    <view class="notice">
      <image class="notice-bg" src="../../static/images/index/notice-bg.png" mode="aspectFill" />
      <image class="dot" src="../../static/images/index/dot.png" mode="widthFix" />
      <text class="msg">小冬瓜刚刚注册了会员并获得新人大礼包</text>
    </view>

    <view class="section-title">趋势代币</view>

    <view class="coin-list">
      <view class="coin-item" v-for="c in coins" :key="c.symbol">
        <view class="coin-icon-wrap">
          <image class="coin-icon" :src="c.icon" mode="widthFix" />
          <image class="coin-sub-icon" :src="c.subIcon" mode="widthFix" />
        </view>
        <view class="coin-info">
          <text class="name">{{ c.symbol }}</text>
          <view class="price-col">
            <text class="price">{{ c.price }}</text>
            <text class="price-sub">{{ c.priceSub }}</text>
          </view>
          <text class="chg" :class="c.change >= 0 ? 'pos' : 'neg'">{{ c.changeText }}</text>
          <text class="row2">{{ c.meta }}</text>
        </view>
      </view>
    </view>

    </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import LanguageToggle from '@/components/LanguageToggle.vue'

const coins = [
  { symbol: 'BTC', price: '101,887.09', priceSub: '$101,887.09', change: -0.16, changeText: '-0.16%', meta: '$81.15M | $12.92B', icon: '../../static/images/index/coin-btc.png', subIcon: '../../static/images/index/coin-sub-btc.png' },
  { symbol: 'ETH', price: '203,887.00', priceSub: '$203,887.00', change: 1.36, changeText: '+1.36%', meta: '$90.15M | $10.63B', icon: '../../static/images/index/coin-sub-btc.png', subIcon: '../../static/images/index/coin-btc.png' },
  { symbol: 'SOL', price: '302,000.00', priceSub: '$302,000.00', change: 1.20, changeText: '+1.20%', meta: '$60.16M | $11.63B', icon: '../../static/images/index/coin-btc.png', subIcon: '../../static/images/index/coin-sub-btc.png' }
]

// 滚动距离
const scrollTop = ref(0)

// 导航栏背景色（根据滚动距离动态计算透明度）
const navbarBgColor = computed(() => {
  // 滚动距离超过 200 时完全变白，之前渐变
  const opacity = Math.min(scrollTop.value / 200, 1)
  // 初始透明度为 0（完全透明），随着滚动逐渐变为 1（完全白色）
  return opacity === 0 ? 'transparent' : `rgba(255, 255, 255, ${opacity})`
})

// 处理滚动事件
const handleScroll = (e) => {
  scrollTop.value = e.detail.scrollTop
}
</script>


<style lang="scss">
@import "@/styles/common.scss";

.page {
  min-height: 100vh;
  position: relative;
  background: #f7f7f7;
}

.scroll-view {
  height: 100vh;
  width: 100%;
}

.bg {
  position: absolute;
  left:0;
  right:0;
  top:0;
  width: 100%;
  height: 440rpx;
  z-index: 0;
}

/* 导航栏占位 */
.navbar-placeholder {
  height: 88rpx;
}

.container {
  position: relative;
  padding: 30rpx;
}

/* 导航栏左侧内容 */
.navbar-left { display:flex; align-items:center; gap: 12rpx; }
.logo { width: 78rpx; height: 78rpx; border-radius: 20rpx; }
.brand { font-size: 36rpx; font-weight: 700; color:#333; }
.hero { width: 100%; height: 573rpx; border-radius: 20rpx; }
.notice { position: relative; overflow: hidden; height: 90rpx; display:flex; align-items:center; padding: 0 20rpx; color:#333; background: transparent; }
.notice-bg { position:absolute; left:0; top:0; width:100%; height:100%; }
.msg { font-size: 28rpx; color:#333; position: relative;}
.dot { width: 63rpx; height: 63rpx; margin-right: 22rpx; }
.section-title { margin-top: 26rpx; font-size: 34rpx; color:#333; font-weight: 600; }
.coin-list { margin-top: 12rpx; display:flex; flex-direction: column; gap: 16rpx; }
.coin-item { height: 156rpx; display:flex; align-items:center; padding: 0 14rpx 0 11rpx; background:#fff; border-radius: 16rpx; box-shadow: 0 6rpx 24rpx rgba(0,0,0,.06); }
.coin-icon-wrap { position: relative; margin-right: 20rpx; }
.coin-icon { width: 69rpx; height: 68rpx;}
.coin-sub-icon { position: absolute; right: -6rpx; bottom: 6rpx; width: 37rpx; height: 37rpx; border-radius: 50%; }
.coin-info { flex:1; display:grid; grid-template-columns: 1fr auto auto; grid-auto-rows:auto; column-gap: 16rpx; row-gap: 8rpx; align-items:center; }
.name { grid-column:1/2; font-size: 34rpx; font-weight: 700; color:#09132C; }
.price-col { grid-column:2/3; grid-row:1 / span 2; text-align:center; display:flex; flex-direction:column; align-items:center; }
.price { font-size: 32rpx; color:#09132C; }
.price-sub { margin-top: 6rpx; font-size: 26rpx; color:#666666; }
.chg { grid-column:3/4; grid-row:1 / span 2; height: 60rpx; line-height: 60rpx; padding: 0 14rpx; border-radius: 6rpx; font-size: 26rpx; color:#fff; }
.chg.pos { background: #24A980; }
.chg.neg { background: #FB5954; }
.row2 { grid-column:1/2; font-size: 24rpx; color:#666666; }

</style>
