<template>
  <view class="page">
    <scroll-view scroll-y class="scroll" enable-flex>
      <image class="hero-bg" :src="heroBg" mode="aspectFill" />

      <view class="container">
        <view class="header-card">
          <view class="header-main">
            <view class="wallet-info">
              <image class="avatar" :src="walletInfo.avatar" mode="aspectFill" />
              <view class="wallet-text">
                <text class="wallet-id">{{ walletInfo.address }}</text>
                <view class="vip-icon">
                  <text class="vip-text">{{ walletInfo.vip }}</text>
                </view>
              </view>
            </view>
            <image class="wallet-hero" src="../../static/images/mine/wallet-hero.png" mode="widthFix" />
          </view>
        </view>

        <view class="asset-card">
          <view class="asset-heading">
            <text class="asset-title">我的资产</text>
            <view class="asset-chip">
              <text class="asset-chip-text">账户保障</text>
            </view>
          </view>
          <view class="asset-summary">
            <view v-for="item in assetSummary" :key="item.label" class="asset-item">
              <text class="asset-label">{{ item.label }}</text>
              <text class="asset-value">{{ item.value }}</text>
            </view>
            <image class="asset-graphic" src="https://picsum.photos/200/160" mode="aspectFit" />
          </view>
        </view>

        <view class="action-row">
          <view class="action-btn dark">充值</view>
          <view class="action-btn light">提现</view>
        </view>

        <view class="income-row">
          <view v-for="item in incomeStats" :key="item.title" class="income-card">
            <view class="income-icon-wrap">
              <image class="income-icon" :src="item.icon" mode="aspectFit" />
            </view>
            <text class="income-value">{{ item.value }}</text>
            <text class="income-title">{{ item.title }}</text>
          </view>
        </view>

        <view class="record-card">
          <view v-for="item in recordList" :key="item.title" class="record-row">
            <view class="record-left">
              <image class="record-icon" :src="item.icon" mode="aspectFit" />
              <view class="record-text">
                <text class="record-title">{{ item.title }}</text>
                <text class="record-desc">{{ item.desc }}</text>
              </view>
            </view>
            <text class="record-arrow">›</text>
          </view>
        </view>

        <view class="quick-card">
          <view v-for="item in quickActions" :key="item.title" class="quick-item">
            <image class="quick-icon" :src="item.icon" mode="aspectFit" />
            <text class="quick-title">{{ item.title }}</text>
          </view>
        </view>

        <view class="feature-card">
          <view v-for="item in featureList" :key="item.title" class="feature-item">
            <view class="feature-icon">★</view>
            <view class="feature-text">
              <text class="feature-title">{{ item.title }}</text>
              <text class="feature-desc">{{ item.desc }}</text>
            </view>
          </view>
        </view>

        <view class="promo-card">
          <text class="promo-title">{{ promo.title }}</text>
          <text class="promo-sub">{{ promo.subtitle }}</text>
          <text class="promo-desc">{{ promo.detail }}</text>
          <view class="promo-link">
            <text class="promo-url">{{ promo.link }}</text>
            <text class="promo-copy">{{ promo.copy }}</text>
          </view>
          <text class="promo-note">{{ promo.note }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { reactive } from 'vue'

const heroBg = '../../static/images/mine/hero-bg.png'

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
  { title: '今日收益', value: '3620', icon: 'https://picsum.photos/110/110' },
  { title: '昨日收益', value: '3620', icon: 'https://picsum.photos/111/110' }
]

const recordList = [
  { title: '投单记录', desc: '随时查看投单进度', icon: 'https://picsum.photos/64/64' },
  { title: '收支流水', desc: '每一笔资金清晰可见', icon: 'https://picsum.photos/65/64' }
]

const quickActions = [
  { title: '下载MAYPAY APP', icon: 'https://picsum.photos/70/70' },
  { title: '完成KYC', icon: 'https://picsum.photos/71/70' },
  { title: '随时随地提取现金', icon: 'https://picsum.photos/72/70' }
]

const featureList = [
  { title: '全球通行', desc: '随时随地提取现金' },
  { title: '多元配置', desc: '多币种资产自由搭配' },
  { title: '尊贵特权', desc: '专属客服全天候守候' },
  { title: '正规公司', desc: '严格遵守香港法规' }
]

const promo = reactive({
  title: 'VIRTU108-万事达U卡',
  subtitle: '108万付款计划全球通行',
  detail: '支持微信、支付宝、银联等多渠道结算，ATM取现便捷无忧。',
  link: 'https://vip.maypay.hk/?vCode=207167',
  copy: '复制',
  note: '金牌链接即将到期，请尽快完成申请'
})
</script>

<style lang="scss" scoped>
.page { min-height: 100vh; background: #fef7ef; }
.scroll { height: 100vh; }
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
  padding: 120rpx 32rpx 160rpx;
  display: flex;
  flex-direction: column;
  row-gap: 28rpx;
}
.header-card {
  display: flex;
  flex-direction: column;
  row-gap: 28rpx;
}
.header-main { display: flex; justify-content: space-between; align-items: center; column-gap: 24rpx; }
.wallet-info { display: flex; align-items: center; column-gap: 22rpx; }
.avatar { width: 140rpx; height: 140rpx; border-radius: 60rpx; }
.wallet-text { display: flex; flex-direction: column; row-gap: 24rpx; }
.wallet-id { font-size: 38rpx; font-weight: 700; color: #333; }
.vip-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 126rpx;
  height: 40rpx;
  background: url('../../static/images/mine/vip-icon.png') center/cover no-repeat;
}
.vip-text { font-size: 30rpx; font-weight: 700; color: #BA6A2D;margin-left: 18rpx; }
.wallet-hero { width: 240rpx; height: 209rpx; }

.asset-card {
  border-radius: 36rpx;
  padding: 36rpx 32rpx;
  background: linear-gradient(135deg, #ff9346, #ffc45f);
  box-shadow: 0 18rpx 44rpx rgba(255, 142, 59, 0.45);
  color: #fff;
}
.asset-heading { display: flex; justify-content: space-between; align-items: center; }
.asset-title { font-size: 36rpx; font-weight: 700; }
.asset-chip { padding: 8rpx 26rpx; border-radius: 999rpx; background: rgba(255, 255, 255, 0.25); }
.asset-chip-text { font-size: 24rpx; }
.asset-summary { margin-top: 30rpx; display: flex; align-items: center; justify-content: space-between; column-gap: 24rpx; }
.asset-item { display: flex; flex-direction: column; row-gap: 8rpx; }
.asset-label { font-size: 26rpx; opacity: 0.9; }
.asset-value { font-size: 52rpx; font-weight: 700; letter-spacing: 1rpx; }
.asset-graphic { width: 220rpx; height: 150rpx; }

.action-row { display: flex; column-gap: 24rpx; }
.action-btn {
  flex: 1;
  height: 100rpx;
  border-radius: 50rpx;
  text-align: center;
  line-height: 100rpx;
  font-size: 34rpx;
  font-weight: 700;
}
.action-btn.dark { background: #050505; color: #fff; }
.action-btn.light { background: linear-gradient(135deg, #ffe488, #ffb347); color: #743400; }

.income-row { display: flex; column-gap: 24rpx; }
.income-card {
  flex: 1;
  background: #fff;
  border-radius: 28rpx;
  padding: 32rpx 24rpx;
  box-shadow: 0 14rpx 36rpx rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 14rpx;
}
.income-icon-wrap { width: 94rpx; height: 94rpx; border-radius: 47rpx; background: linear-gradient(180deg, #fff7ea, #ffdcbf); display: flex; align-items: center; justify-content: center; }
.income-icon { width: 70rpx; height: 70rpx; }
.income-value { font-size: 42rpx; font-weight: 700; color: #3b220f; }
.income-title { font-size: 26rpx; color: #b18143; }

.record-card { border-radius: 28rpx; background: #fff; box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.06); }
.record-row {
  padding: 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #f2e3d6;
}
.record-row:last-child { border-bottom: none; }
.record-left { display: flex; column-gap: 22rpx; align-items: center; }
.record-icon { width: 64rpx; height: 64rpx; }
.record-text { display: flex; flex-direction: column; row-gap: 8rpx; }
.record-title { font-size: 30rpx; color: #341e0d; font-weight: 600; }
.record-desc { font-size: 24rpx; color: #b48d64; }
.record-arrow { font-size: 44rpx; color: #c7b39f; }

.quick-card {
  border-radius: 28rpx;
  background: #fff;
  padding: 26rpx 12rpx;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-around;
}
.quick-item { display: flex; flex-direction: column; align-items: center; row-gap: 14rpx; max-width: 200rpx; }
.quick-icon { width: 88rpx; height: 88rpx; border-radius: 44rpx; background: #fff6ec; }
.quick-title { font-size: 26rpx; color: #2f1a0b; text-align: center; line-height: 1.4; }

.feature-card {
  border-radius: 28rpx;
  background: #fff;
  padding: 28rpx 20rpx;
  box-shadow: 0 12rpx 32rpx rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 18rpx;
  grid-row-gap: 26rpx;
}
.feature-item { display: flex; column-gap: 16rpx; }
.feature-icon {
  width: 60rpx;
  height: 60rpx;
  border-radius: 30rpx;
  background: linear-gradient(135deg, #ffe9b7, #ffcf86);
  text-align: center;
  line-height: 60rpx;
  color: #c36f18;
  font-size: 32rpx;
}
.feature-text { display: flex; flex-direction: column; row-gap: 8rpx; }
.feature-title { font-size: 28rpx; color: #341d09; font-weight: 600; }
.feature-desc { font-size: 24rpx; color: #b4874d; }

.promo-card {
  border-radius: 32rpx;
  padding: 32rpx 28rpx;
  background: linear-gradient(165deg, #1f0d01 0%, #5b2b05 60%, #c57414 100%);
  color: #fff;
  box-shadow: 0 18rpx 40rpx rgba(0, 0, 0, 0.25);
}
.promo-title { font-size: 34rpx; font-weight: 700; }
.promo-sub { margin-top: 12rpx; font-size: 26rpx; color: #ffd9a0; }
.promo-desc { margin-top: 18rpx; font-size: 26rpx; line-height: 1.6; }
.promo-link {
  margin-top: 20rpx;
  padding: 16rpx 20rpx;
  border-radius: 16rpx;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.promo-url { font-size: 24rpx; color: #ffe1b0; }
.promo-copy { font-size: 24rpx; color: #ffb85c; }
.promo-note { margin-top: 18rpx; font-size: 22rpx; color: #fdd48e; }
</style>