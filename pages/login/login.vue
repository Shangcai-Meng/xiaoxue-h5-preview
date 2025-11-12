<template>
  <view class="container">
    <view class="login-form">
      <uv-form :model="formData" ref="form">
        <uv-form-item label="账号" prop="username">
          <uv-input v-model="formData.username" placeholder="请输入账号" />
        </uv-form-item>
        <uv-form-item label="密码" prop="password">
          <uv-input v-model="formData.password" type="password" placeholder="请输入密码" />
        </uv-form-item>
      </uv-form>
      <view class="btn-group">
        <uv-button type="primary" :loading="loading" @click="handleLogin">登录</uv-button>
      </view>
    </view>
    <cui-userprofiledialog ref="userProfileDialog" paddingBottom="92rpx"></cui-userprofiledialog>
  </view>
</template>

<script>
import { useUserStore } from "@/store/modules/user";
import CuiUserProfileDialog from "@/components/cui-userprofiledialog/cui-userprofiledialog.vue";
import { showToast, showLoading, hideLoading } from "@/utils/common/ui";
import { updateUserInfo } from "@/api/modules/user";
import { resetLoginState } from '@/utils/request';

export default {
  components: { CuiUserProfileDialog },
  data() {
    return {
      loading: false,
      formData: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: ["blur", "change"] }],
        password: [{ required: true, message: "请输入密码", trigger: ["blur", "change"] }],
      },
    };
  },
  methods: {
    async handleLogin() {
      const userStore = useUserStore();

      // 表单验证
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      this.loading = true;
      try {
        // 登录并获取用户信息
        await userStore.login(this.formData);
        await userStore.getUserInfo();

        // 检查用户头像和昵称是否完整
        const userInfo = userStore.userInfo;
        if (!userInfo.avatar || !userInfo.nickname) {
          await this.showProfileDialog(userInfo);
        } else {
          // 用户资料完整，直接跳转到首页
          this.navigateToHome();
        }
      } catch (error) {
        showToast(error.message || "登录失败");
      } finally {
        this.loading = false;
      }
    },

    // 显示用户资料设置对话框
    async showProfileDialog(userInfo) {
      try {
        const res = await this.$refs["userProfileDialog"].show({
          desc: "请完善个人资料",
          avatarUrl: {
            requried: true,
            disable: !!userInfo.avatar,
          },
          nickName: {
            requried: true,
            disable: !!userInfo.nickname,
          },
        });

        await this.updateUserProfile(res);
      } catch (err) {
        console.log("用户取消设置资料");
        // 用户取消设置资料，仍然跳转到首页
        this.navigateToHome();
      }
    },

    // 更新用户资料
    async updateUserProfile(profileData) {
      try {
        showLoading("正在更新资料");
        const data = {};

        // 如果有头像需要上传
        if (profileData.avatarUrl) {
          data.avatar = profileData.avatarUrl;
        }

        // 如果有昵称需要更新
        if (profileData.nickName) {
          data.nickname = profileData.nickName;
        }

        // 更新用户资料
        await updateUserInfo(data);

        // 更新本地用户信息
        const userStore = useUserStore();
        userStore.userInfo = {
          ...userStore.userInfo,
          avatar: data.avatar,
          nickname: data.nickname
        };

        showToast("资料更新成功");

        // 更新成功后跳转到首页
        this.navigateToHome();
      } catch (error) {
        console.error("更新资料失败:", error);
        showToast(error.message || "更新资料失败");
        this.navigateToHome();
      } finally {
        hideLoading();
      }
    },

    // 跳转到首页
    navigateToHome() {
      // 重置登录状态
      resetLoginState();
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30rpx;
}

.login-form {
  width: 100%;
  background-color: #fff;
  border-radius: 12rpx;
  padding: 40rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.btn-group {
  margin-top: 60rpx;
}
</style>
