<template>
  <view class="page">
    <!-- 自定义导航栏 -->
    <uv-navbar :title="pageTitle" :placeholder="true" :autoBack="true" />

    <!-- 富文本内容 -->
    <view class="content-wrap">
      <rich-text :nodes="content"></rich-text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const pageTitle = ref("");
const content = ref("");
const type = ref("");

// 页面标题映射
const titleMap = {
  userAgreement: "用户协议",
  privacyAgreement: "隐私协议",
  about: "关于我们",
  policy: "协议与政策",
  rechargeAgreement: "积分充值协议",
};

// API接口映射
const apiMap = {
  userAgreement: "/api/agreement/user",
  privacyAgreement: "/api/agreement/privacy",
  about: "/api/about",
  policy: "/api/agreement/policy",
  rechargeAgreement: "/api/agreement/recharge",
};

// 获取富文本内容
const getContent = async () => {
  if (!type.value || !apiMap[type.value]) {
    uni.showToast({
      title: "参数错误",
      icon: "none",
    });
    return;
  }

  try {
    uni.showLoading({
      title: "加载中...",
    });

    // TODO: 替换为实际的接口调用
    // const res = await uni.$u.http.get(apiMap[type.value]);
    // content.value = res.data;

    // 模拟接口返回数据
    setTimeout(() => {
      content.value = `
        <div style="padding: 32rpx;">
          <h1 style="font-size: 36rpx; font-weight: bold; margin-bottom: 32rpx;">
            ${titleMap[type.value]}
          </h1>
          <p style="font-size: 28rpx; color: #333; line-height: 1.8;">
            这是${titleMap[type.value]}的内容，请替换为实际的接口返回数据。
            这是${titleMap[type.value]}的内容，请替换为实际的接口返回数据。
            这是${titleMap[type.value]}的内容，请替换为实际的接口返回数据。
          </p>
        </div>
      `;
      uni.hideLoading();
    }, 500);
  } catch (error) {
    uni.showToast({
      title: "获取内容失败",
      icon: "none",
    });
  }
};

// 页面加载
onLoad((options) => {
  type.value = options.type;
  pageTitle.value = titleMap[type.value] || "";
  getContent();
});
</script>

<style lang="scss" scoped>
.content-wrap {
  padding: 32rpx;
}

:deep(rich-text) {
  width: 100%;
}
</style>
