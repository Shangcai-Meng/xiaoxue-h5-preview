<template>
  <view class="lang" @click="toggle">
    <image class="lang-icon" :src="icon" mode="widthFix" />
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app.js'

const app = useAppStore()
const icon = computed(() => app.language.startsWith('zh')
  ? '/static/images/index/lang-zh.png'
  : '/static/images/index/lang-en.png')

const toggle = () => {
  const next = app.language.startsWith('zh') ? 'en-US' : 'zh-CN'
  app.setLanguage(next)
}
</script>

<style scoped lang="scss">
.lang { display:flex; align-items:center; }
.lang-icon { width: 50rpx; height: 48rpx; border-radius: 10rpx; }
</style>
