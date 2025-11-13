<template>
  <view class="page">
    <image class="bg" src="../../static/images/team/bg.png" mode="widthFix" />

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

    <scroll-view
      scroll-y
      class="scroll-view"
      @scroll="handleScroll"
    >
      <!-- 导航栏占位 -->
      <view class="navbar-placeholder"></view>
      <view class="container">
      <image class="hero" src="../../static/images/team/hero.png" mode="widthFix" />

      <view class="stats-card">
        <image class="stats-bg" src="../../static/images/team/stats-bg.png" mode="aspectFill" />
        <view class="stats-top">
          <view class="cell">
            <text class="num">60</text>
            <text class="label">团队账户</text>
          </view>
          <view class="cell">
            <text class="num">23</text>
            <text class="label">直推账户</text>
          </view>
        </view>
        <view class="stats-bottom">
          <view class="item">
            <text class="lab">团队业绩</text>
            <text class="val">0 USDT</text>
          </view>
          <view class="item">
            <text class="lab">直推业绩</text>
            <text class="val">3000.00 USDT</text>
          </view>
        </view>
        <image class="stats-bottom-bg" src="../../static/images/team/stats-bottom-bg.png" mode="aspectFill" />
      </view>

      <view class="cards-2">
        <view class="card">
          <image class="card-bg" src="../../static/images/team/earnings-card-bg.png" mode="aspectFill" />
          <view class="card-content">
            <text class="title">累计收益</text>
            <text class="amount">0 USDT</text>
            <view class="btn hollow">明细</view>
          </view>
        </view>
        <view class="card">
          <image class="card-bg" src="../../static/images/team/earnings-card-bg2.png" mode="aspectFill" />
          <view class="card-content">
            <text class="title">待领取收益</text>
            <text class="amount">0 USDT</text>
            <view class="btn solid">领取</view>
          </view>
        </view>
      </view>

      <view class="level-card">
        <image class="level-bg" src="../../static/images/team/level-card-bg.png" mode="widthFix" />
        <view class="level-row">
          <text class="h">当前等级</text>
          <text class="addr">0X0A...DD9A</text>
        </view>
        <view class="upgrade-reward-card">
          <view class="col">
            <text class="lab">可领取升级奖励</text>
            <text class="val number">{{ claimableUpgradeU }}U</text>
          </view>
          <view class="col">
            <text class="lab">已损失升级奖励</text>
            <text class="val number">{{ missedUpgradeU }}U</text>
          </view>
        </view>
        <view class="tips">
          <view class="tip">
            <image class="dot" src="../../static/images/team/dot.png" />
            <text class="txt">直推满2人升级后享受收益人数增加到2人</text>
          </view>
          <view class="tip">
            <image class="dot" src="../../static/images/team/dot.png" />
            <text class="txt" style="color: #FD6946;">直推满15人后，可享受领导人团队奖励</text>
          </view>
        </view>
      </view>

      <view class="invite-card">
        <image class="invite-bg" src="../../static/images/team/invite-card-bg.png" mode="widthFix" />
        <text class="label">邀请链接：</text>
        <view class="invite-row">
          <text class="link">{{ inviteLink }}</text>
          <image class="copy" src="../../static/images/team/copy.png" mode="widthFix" @click="copyLink" />
        </view>
      </view>

      <view class="table">
        <view class="thead">
          <text class="th addr">钱包地址</text>
          <text class="th join">加入时间</text>
          <text class="th val">贡献值(USDT)</text>
        </view>
        <view class="tr" v-for="(r,i) in rows" :key="i">
          <text class="td addr">{{ r.address }}</text>
          <text class="td join">{{ r.time }}</text>
          <text class="td val">{{ r.value }}</text>
        </view>
        <view class="empty" v-if="rows.length === 0">
          <image class="empty-ill" src="../../static/images/team/empty.png" mode="widthFix" />
          <text class="empty-tip">暂无更多内容</text>
        </view>
      </view>

    </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import LanguageToggle from '@/components/LanguageToggle.vue'

const inviteLink = ref('HTTPS://WEBN13.COM.CC/#/CODE=...')
const rows = ref([
  { address: '12233213121...', time: '2025-11-19', value: '26390' },
  { address: '12233213121...', time: '2025-11-19', value: '26390' },
  { address: '12233213121...', time: '2025-11-19', value: '26390' },
  { address: '12233213121...', time: '2025-11-19', value: '26390' },
])
const claimableUpgradeU = ref(0)
const missedUpgradeU = ref(0)

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

const copyLink = () => {
  // #ifdef H5
  navigator.clipboard && navigator.clipboard.writeText(inviteLink.value)
  uni.showToast({title:"复制成功"})
  // #endif
}
</script>

<style lang="scss" scoped>
.page {
  min-height:100vh;
  position: relative;
  background:#f7f7f7;
}

.scroll-view {
  height: 100vh;
  width: 100%;
}

.bg {
  position:absolute;
  left:0;
  right:0;
  top:0;
  width:100%;
  height: 440rpx;
  z-index: 0;
}

/* 导航栏占位 */
.navbar-placeholder {
  height: 88rpx;
}

.container {
  position: relative;
  padding: 24rpx;
}
.hero { width:519rpx; height: 436rpx; margin: 0 auto; display: block;position: relative; z-index: 1; }

.stats-card { height: 351rpx; margin-top: -70rpx; position: relative; border-radius: 16rpx; padding: 20rpx; color:#fff; overflow: hidden; }
.stats-bg { position:absolute; left:0; top:0; width:100%; height:100%; border-radius: 16rpx; z-index: 0; }
.stats-top { position: absolute; top: 0; left: 20rpx; right: 20rpx; height: 55%; display:flex; justify-content: space-between; align-items: center; z-index: 1; }
.cell { display:flex; flex-direction: column; align-items: left; justify-content: center; gap: 12rpx; flex: 1; padding-left: 34rpx; }
.num { font-size: 42rpx; font-weight: 700; color: #FDDD2B; }
.label { font-size: 28rpx; color: rgba(255,255,255,.8); }
.stats-bottom { position: absolute; bottom: 0; left: 20rpx; right: 20rpx; height: 45%; display:flex; justify-content: space-between; gap: 12rpx; align-items: center; z-index: 1; }
.stats-bottom-bg { position:absolute; left:0; right:0; bottom:0; width:100%; height:45%; border-radius: 0 0 16rpx 16rpx; z-index: 0; border-radius: 12rpx; }
.item { position: relative; flex:1; display:flex; flex-direction: column; align-items: left; justify-content: center; padding: 0 34rpx; border-radius: 12rpx; }
.lab { font-size: 24rpx; color: #fff; }
.val { font-size: 24rpx; font-weight: 600; margin-top: 12rpx; }

.cards-2 { margin-top: 24rpx; display:grid; grid-template-columns: 1fr 1fr; gap: 14rpx; }
.card { position: relative; height: 211rpx; border-radius: 16rpx; overflow: hidden; }
.card-bg { position:absolute; left:0; top:0; width:100%; height:100%; }
.card-content { position: relative; padding: 24rpx 24rpx 0; display:flex; flex-direction: column; justify-content: space-between; }
.title { font-size: 24rpx; color:#666666;}
.amount { font-size: 42rpx; color:#333333; font-weight: 700; }
.btn { align-self:flex-end; min-width: 130rpx; height: 52rpx; line-height: 52rpx; border-radius: 24rpx; text-align:center; font-size: 24rpx; margin-top: 12rpx; }
.btn.hollow { color:#09132C; background: rgba(255,255,255,.6); }
.btn.solid { color:#fff; background: #FFC4B7; color: #333333; }

.level-card { margin-top: 20rpx; padding: 20rpx; background:#fff; border-radius: 16rpx; position: relative; overflow: hidden; }
.level-row { display:flex; flex-direction: column; align-items: left; gap: 0rpx; }
.h { font-size: 26rpx; color:#232A28;}
.addr { font-size: 28rpx; color:#333333; }
.level-bg { position:absolute; left:0; top:0; width:100%; height:100%; z-index:0; border-radius: 16rpx; }
.level-row, .upgrade-reward-card, .tips { position: relative; z-index: 1; }
.upgrade-reward-card { margin-top: 24px; padding: 30rpx 21rpx; border-radius: 10rpx; background: rgba(253,105,70,0.1); display:grid; grid-template-columns: 1fr 1fr; column-gap: 24rpx; align-items: center; }
.upgrade-reward-card .col { display:flex; flex-direction: column; }
.upgrade-reward-card .lab { font-size: 24rpx; color:#666666; }
.upgrade-reward-card .number { font-size: 32rpx; color:#FD6946; font-weight: 700; }
.tips { margin-top: 14rpx; display:flex; flex-direction: column; gap: 10rpx; }
.tip { display:flex; align-items:center; gap: 10rpx; color:#09132C; }
.dot { width: 20rpx; height: 20rpx; }
.txt { font-size: 26rpx; color:#666666; flex:1; }

.invite-card { margin-top: 16rpx; height: 158rpx; padding: 0 20rpx; background:#fff; border-radius: 16rpx; display:flex; flex-direction: column; align-items: stretch; justify-content: center; gap: 0rpx; position: relative; overflow: hidden; }
.invite-bg { position:absolute; left:0; top:0; width:100%; height:100%; z-index:0; border-radius: 16rpx; pointer-events: none; }
.invite-card .label { color:#FD6946; font-size: 32rpx; display:block; position: relative; z-index:1;font-weight: 600; }
.invite-row { display:flex; align-items:center; gap: 12rpx; position: relative; z-index:1;margin-bottom: 16rpx; }
.link { flex:1; color:#333333; font-size: 30rpx; word-break: break-all; }
.copy { width: 32rpx; height: 32rpx; border-radius: 8rpx; }

.table { margin-top: 16rpx; background:#fff; border-radius: 16rpx; overflow: hidden; }
.thead { height: 72rpx; display:grid; grid-template-columns: 2fr 1.4fr 1.4fr; align-items:center; padding: 0 16rpx; color:#888; font-size: 24rpx;background: linear-gradient(90deg, #FFDFD8 0%, #FFF8D2 100%); }
.tr { height: 66rpx; display:grid; grid-template-columns: 2fr 1.4fr 1.4fr; align-items:center; margin: 0 16rpx; }
.tr + .tr {border-top: 1rpx dashed #f0f0f0; }
.td, .th { overflow:hidden; white-space: nowrap; text-overflow: ellipsis; }
.tr > .val , .thead .val{
  margin-top: 0;
  font-size: 28rpx;
  color: #333333;
  font-weight: 400;
}
.join{font-size: 28rpx; color: #333;}
.table .empty { padding: 30rpx 0 40rpx; display:flex; flex-direction: column; align-items:center; }

.empty-ill { width: 299rpx; height: 194rpx; margin-top: 40rpx; }
.empty-tip { display:block; text-align:center; color:#999999; font-size: 28rpx; margin: 10rpx 0 30rpx; }
</style>
