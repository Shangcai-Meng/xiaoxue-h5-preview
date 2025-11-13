<template>
  <view class="page">
    <!-- 顶部导航栏 - 固定定位悬浮 -->
    <uv-navbar
      :placeholder="false"
      :autoBack="false"
      leftIconSize="0"
      :bgColor="navbarBgColor"
      :fixed="true"
    >
      <template #right>
        <LanguageToggle />
      </template>
    </uv-navbar>

    <scroll-view scroll-y class="scroll" enable-flex @scroll="handleScroll">
      <!-- 导航栏占位 -->
      <view class="navbar-placeholder"></view>

      <image class="hero-bg" :src="heroBg" mode="aspectFill" />

      <view class="container">
        <!-- 顶部用户信息 -->
        <view class="header-card">
          <view class="header-main">
            <view class="wallet-info">
              <image class="avatar" :src="walletInfo.avatar" mode="aspectFill" />
              <view class="wallet-text">
                <text class="wallet-id">{{ walletInfo.address }}</text>
                <view class="vip-badge">
                  <image class="vip-icon" src="../../static/images/mine/vip-icon.png" mode="aspectFit" />
                  <text class="vip-text">{{ walletInfo.vip }}</text>
                </view>
              </view>
            </view>
            <image class="wallet-hero" src="../../static/images/mine/wallet-hero.png" mode="aspectFit" />
          </view>
        </view>

        <!-- 资产卡片 -->
        <view class="asset-card">
          <image class="asset-card-bg" src="../../static/images/mine/asset-card-bg.png" mode="aspectFill" />
          <view class="asset-content">
            <view class="asset-heading">
              <text class="asset-title">我的资产</text>
            </view>
            <view class="asset-summary">
              <view class="asset-list">
                <view v-for="item in assetSummary" :key="item.label" class="asset-item">
                  <text class="asset-label">{{ item.label }}</text>
                  <text class="asset-value">{{ item.value }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 充值提现按钮 -->
        <view class="action-row">
          <view class="action-btn dark" @click="xwlb">充值</view>
          <view class="action-btn light" @click="szls">提现</view>
        </view>

        <!-- 收益卡片 -->
        <view class="income-row">
          <view v-for="item in incomeStats" :key="item.title" class="income-card">
            <image class="income-card-bg" :src="item.icon" mode="widthFix" />
            <view class="income-content">
              <text class="income-value">{{ item.value }}</text>
              <text class="income-title">{{ item.title }}</text>
            </view>
          </view>
        </view>

        <!-- 投单记录和收支流水 -->
        <view class="record-list">
          <view v-for="item in recordList" :key="item.title" class="record-card">
            <view class="record-left">
              <image class="record-icon" :src="item.icon" mode="widthFix" />
              <text class="record-title">{{ item.title }}</text>
            </view>
            <image class="record-arrow" src="../../static/images/mine/more.png" mode="aspectFit" />
          </view>
        </view>

        <!-- 底部功能区域 -->
        <view class="bottom-section">
          <image class="bottom-section-bg" src="../../static/images/mine/bottom-section-bg.png" mode="widthFix" />
          <view class="bottom-content">
            <!-- 快捷操作 -->
            <view class="quick-card">
              <view v-for="item in quickActions" :key="item.title" class="quick-item">
                <view class="quick-icon-wrap">
                  <image class="quick-icon" :src="item.icon" mode="widthFix" />
                </view>
                <text class="quick-title">{{ item.title }}</text>
              </view>
            </view>

            <!-- 特色功能 -->
            <view class="feature-card">
              <view v-for="item in featureList" :key="item.title" class="feature-item">
                <image class="feature-icon" :src="item.icon" mode="aspectFit" />
                <view class="feature-text">
                  <text class="feature-title">{{ item.title }}</text>
                  <text class="feature-desc">{{ item.desc }}</text>
                </view>
              </view>
            </view>

            <!-- 推广卡片 -->
            <view class="promo-card">
              <image class="promo-card-bg" src="../../static/images/mine/promo-card-bg.png" mode="aspectFill" style="border-radius: 12rpx;" />
              <view class="promo-content">
                <text class="promo-title">{{ promo.title }}</text>
                <text class="promo-sub">{{ promo.subtitle }}</text>
                <text class="promo-desc">{{ promo.detail }}</text>
                <view class="promo-link">
                  <text class="promo-url">{{ promo.link }}</text>
                  <view class="promo-copy-btn">
                    <image class="promo-copy-icon" src="../../static/images/mine/copy.png" mode="aspectFit" />
                    <text class="promo-copy-text">{{ promo.copy }}</text>
                  </view>
                </view>
                <text class="promo-note">{{ promo.note }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import LanguageToggle from '@/components/LanguageToggle.vue'

const heroBg = '../../static/images/mine/hero-bg.png'

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

const walletInfo = reactive({
  address: '0X0A...DD9A',
  vip: 'V2',
  avatar: '../../static/images/mine/avatar.png'
})

const assetSummary = [
  { label: 'USDT余额', value: '3620' },
  { label: 'FIN余额', value: '369,560.00' }
]

const incomeStats = [
  { title: '今日收益', value: '3620', icon: '../../static/images/mine/income-today-bg.png' },
  { title: '昨日收益', value: '3620', icon: '../../static/images/mine/income-yesterday-bg.png' }
]

const recordList = [
  { title: '投单记录', icon: '../../static/images/mine/order-record-icon.png' },
  { title: '收支流水', icon: '../../static/images/mine/transaction-record-icon.png' }
]

const quickActions = [
  { title: '下载MAYPAY APP', icon: '../../static/images/mine/download-app-icon.png' },
  { title: '完成KYC', icon: '../../static/images/mine/kyc-icon.png' },
  { title: '随时随地提取现金', icon: '../../static/images/mine/withdraw-cash-icon.png' }
]

const featureList = [
  { title: '全球通行', desc: '随时随地提取现金', icon: '../../static/images/mine/global-access-icon.png' },
  { title: '多元配置', desc: '用于资产到账后资产方案车辆配置', icon: '../../static/images/mine/multi-config-icon.png' },
  { title: '尊贵特权', desc: '注册即送 24 小时专属客服服务', icon: '../../static/images/mine/vip-privilege-icon.png' },
  { title: '正规公司', desc: '注册于香港进法律法规', icon: '../../static/images/mine/legal-company-icon.png' }
]

const promo = reactive({
  title: 'VIRTU108-万事达U卡',
  subtitle: '108万游戏计划全球通行，支持微信、支付宝、银联等多渠道结算，ATM取现，银行转账',
  detail: '108市商计划-万事达U卡办理专属链接',
  link: ' http://vip.maypay.hk/?vCode=207167',
  copy: '复制',
  note: '注：金牌链接即可下载 下载后请尽快完成申请'
})

const xwlb = () => {
  uni.navigateTo({
    url: '/pages/news/index'
  })
}
const szls = () => {
  uni.navigateTo({
    url: '/pages/transaction/index'
  })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #fef7ef;
}

.scroll {
  height: 100vh;
}

/* 导航栏占位 */
.navbar-placeholder {
  height: 88rpx;
}

.hero-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 520rpx;
  z-index: 0;
}

.container {
  position: relative;
  z-index: 1;
  padding: 32rpx 24rpx 160rpx;
  display: flex;
  flex-direction: column;
  row-gap: 28rpx;
}

/* 顶部用户信息 */
.header-card {
  display: flex;
  flex-direction: column;
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 24rpx;
}

.wallet-info {
  display: flex;
  align-items: center;
  column-gap: 20rpx;
}

.avatar {
  width: 140rpx;
  height: 140rpx;
  border-radius: 56rpx;
}

.wallet-text {
  display: flex;
  flex-direction: column;
  row-gap: 12rpx;
}

.wallet-id {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.vip-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 126rpx;
  height: 40rpx;
}

.vip-icon {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.vip-text {
  position: relative;
  z-index: 1;
  font-size: 30rpx;
  font-weight: 700;
  color: #BA6A2D;
  margin-left: 28rpx;
  font-style: italic;
}

.wallet-hero {
  width: 240rpx;
  height: 209rpx;
  flex-shrink: 0;
}

/* 资产卡片 */
.asset-card {
  border-radius: 24rpx;
  overflow: hidden;
  position: relative;
}

.asset-card-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.asset-content {
  position: relative;
  z-index: 1;
  padding: 32rpx 28rpx;
  color: #fff;
}

.asset-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.asset-title {
  font-size: 34rpx;
  font-weight: 700;
}

.asset-summary {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  column-gap: 24rpx;
}

.asset-list {
  display: flex;
  row-gap: 20rpx;
  flex: 1;
  padding-bottom: 20rpx;
}

.asset-item {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.asset-label {
  font-size: 26rpx;
}

.asset-value {
  font-size: 42rpx;
  font-weight: 700;
}

/* 充值提现按钮 */
.action-row {
  display: flex;
  column-gap: 20rpx;
}

.action-btn {
  flex: 1;
  height: 89rpx;
  border-radius: 44rpx;
  text-align: center;
  line-height: 89rpx;
  font-size: 34rpx;
}

.action-btn.dark {
  background: #1a1a1a;
  color: #fff;
}

.action-btn.light {
  background: linear-gradient(90deg, #F9BF29 0%, #FD6946 100%);
  color: #fff;
}

/* 收益卡片 */
.income-row {
  display: flex;
  column-gap: 20rpx;
}

.income-card {
  flex: 1;
  border-radius: 20rpx;
  overflow: hidden;
  position: relative;
  height: 159rpx;
}

.income-card-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.income-content {
  position: relative;
  z-index: 1;
  padding: 28rpx 20rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 8rpx;
  height: 100%;
}

.income-value {
  font-size: 40rpx;
  font-weight: 700;
  color: #333;
}

.income-title {
  font-size: 24rpx;
  color: #666666;
}

/* 投单记录和收支流水 */
.record-list {
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
}

.record-card {
  border-radius: 20rpx;
  background: #fff;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.06);
  padding: 32rpx 28rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.record-left {
  display: flex;
  column-gap: 20rpx;
  align-items: center;
}

.record-icon {
  width: 38rpx;
  height: 40rpx;
}

.record-title {
  font-size: 30rpx;
  color: #333;
}

.record-arrow {
  width: 20rpx;
  height: 20rpx;
}

/* 底部功能区域 */
.bottom-section {
  position: relative;
  border-radius: 20rpx;
  overflow: hidden;
}

.bottom-section-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bottom-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  row-gap: 24rpx;
  padding-bottom: 24rpx;
}

/* 快捷操作 */
.quick-card {
  padding: 32rpx 0;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16rpx;
}

.quick-icon-wrap {
  width: 96rpx;
  height: 96rpx;
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-icon {
  width: 88rpx;
  height: 88rpx;
}

.quick-title {
  font-size: 26rpx;
  color: #333;
  text-align: center;
  line-height: 1.4;
}

/* 特色功能 */
.feature-card {
  padding: 0 24rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 24rpx;
  grid-row-gap: 32rpx;
}

.feature-item {
  display: flex;
  column-gap: 16rpx;
  align-items: flex-start;
}

.feature-icon {
  width: 56rpx;
  height: 56rpx;
  border-radius: 28rpx;
  flex-shrink: 0;
}

.feature-text {
  display: flex;
  flex-direction: column;
  row-gap: 8rpx;
  flex: 1;
}

.feature-title {
  font-size: 26rpx;
  color: #2d1a0a;
  font-weight: 600;
}

.feature-desc {
  font-size: 22rpx;
  color: #a67c4d;
  line-height: 1.5;
}

/* 推广卡片 */
.promo-card {
  position: relative;
  margin: 0 22rpx;
  border-radius: 12rpx;
  overflow: hidden;
  height: 443rpx;
  box-sizing: border-box;
}

.promo-card-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 443rpx;
  z-index: 0;
  border-radius: 12rpx;
}

.promo-content {
  position: relative;
  z-index: 1;
  padding: 0 24rpx;
  color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.promo-title {
  font-size: 48rpx;
  font-weight: 700;
  max-width: 260rpx;
  color: #FE9C2D;
  line-height: 1;
  margin-top: 24rpx;
}

.promo-sub {
  margin-top: 8rpx;
  font-size: 26rpx;
  color: #ffd9a0;
  max-width: 350rpx;
}

.promo-desc {
  margin-top: 12rpx;
  font-size: 26rpx;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
}

.promo-link {
  padding: 16rpx 0;
  border-radius: 10rpx;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16rpx;
}

.promo-url {
  font-size: 28rpx;
  color: #FE9C2D;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.promo-copy-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  flex-shrink: 0;
}

.promo-copy-icon {
  width: 20rpx;
  height: 20rpx;
  flex-shrink: 0;
}

.promo-copy-text {
  font-size: 24rpx;
  color: #FE9C2D;
  white-space: nowrap;
}

.promo-note {
  margin-top: 12rpx;
  font-size: 24rpx; 
  color: #FFBDBD;
}
</style>