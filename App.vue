<script>
import { checkForUpdates } from '@/utils/updateApp';
import { resetLoginState } from '@/utils/request';
export default {
  onLaunch: function () {
    // 检查版本更新
    checkForUpdates();
    // 重置登录状态
    resetLoginState();
  },
  onShow: function () {},
  onHide: function () {},
};
</script>

<style lang="scss">
/* 引入uv-ui主题 */
@import "@climblee/uv-ui/theme.scss";

/* 引入公共样式库 */
@import "@/styles/common.scss";
</style>
