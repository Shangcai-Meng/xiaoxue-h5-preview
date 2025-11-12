<template>
  <view class="page">
    <scroll-view scroll-y class="scroll">
      <view class="bg" />
      <view class="content">
        <view class="header">
          <view class="title">期权合约</view>
          <view class="pair">BTCUSDT</view>
        </view>
        <view class="chart" />
        <view class="tabs" />
        <view class="order">
          <view class="qty" />
          <view class="actions">
            <view class="btn up">上涨</view>
            <view class="btn down">下跌</view>
          </view>
        </view>
        <view class="list" />
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page { height: 100vh; background: #f7f7f7; }
.scroll { height: 100vh; }
.bg { position: absolute; inset: 0 0 auto 0; height: 260rpx; background: url('https://picsum.photos/750/260') center/cover no-repeat; }
.content { position: relative; padding: 24rpx; }
.header { display:flex; align-items:center; justify-content:space-between; padding: 12rpx 4rpx; }
.title { font-size: 36rpx; font-weight: 600; color:#222; }
.pair { font-size: 28rpx; color:#16a085; }
.chart { margin-top: 12rpx; height: 420rpx; border-radius: 16rpx; background: url('https://picsum.photos/702/420') center/cover no-repeat; box-shadow: 0 6rpx 24rpx rgba(0,0,0,.06); }
.tabs { margin-top: 16rpx; height: 92rpx; border-radius: 16rpx; background: #fff; box-shadow: 0 6rpx 24rpx rgba(0,0,0,.06); }
.order { margin-top: 16rpx; padding-bottom: 20rpx; }
.qty { height: 140rpx; border-radius: 16rpx; background: #fff; box-shadow: 0 6rpx 24rpx rgba(0,0,0,.06); }
.actions { display: flex; gap: 24rpx; margin-top: 24rpx; }
.btn { flex:1; height: 100rpx; border-radius: 50rpx; color:#fff; font-size: 32rpx; display:flex; align-items:center; justify-content:center; }
.btn.up { background: linear-gradient(180deg,#3ecf8e,#20a36b); }
.btn.down { background: linear-gradient(180deg,#ff7b7b,#ff5a47); }
.list { margin-top: 20rpx; height: 480rpx; border-radius: 16rpx; background: #fff; box-shadow: 0 6rpx 24rpx rgba(0,0,0,.06); }
</style>
