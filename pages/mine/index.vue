<template>
  <view class="page">
    <scroll-view scroll-y class="scroll">
      <view class="bg" />
      <view class="content">
        <view class="profile" />
        <view class="assets" />
        <view class="actions">
          <view class="btn black" />
          <view class="btn orange" />
        </view>
        <view class="grid" />
        <view class="banner" />
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.page { height: 100vh; background: #f7f7f7; }
.scroll { height: 100vh; }
.bg { position:absolute; left:0; right:0; top:0; height: 420rpx; background: url('https://picsum.photos/750/420') center/cover no-repeat; }
.content { position: relative; padding: 24rpx; }
.profile { height: 120rpx; }
.assets { height: 220rpx; border-radius: 20rpx; background: url('https://picsum.photos/702/220') center/cover no-repeat; box-shadow: 0 6rpx 24rpx rgba(0,0,0,.06); }
.actions { display: flex; gap: 24rpx; margin: 20rpx 0; }
.btn { flex:1; height: 84rpx; border-radius: 42rpx; background: #eee; }
.btn.black { background: #000; opacity:.9; }
.btn.orange { background: linear-gradient(180deg,#ffcc7a,#ff9f3c); }
.grid { height: 280rpx; border-radius: 16rpx; background: #fff; box-shadow: 0 6rpx 24rpx rgba(0,0,0,.06); }
.banner { margin-top: 20rpx; height: 200rpx; border-radius: 16rpx; background: url('https://picsum.photos/702/200') center/cover no-repeat; }
</style>
