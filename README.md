# tm3 项目

一个基于 Vue 3 的 UniApp 应用，旨在构建能够运行在 H5、微信小程序和原生 App (iOS/Android) 平台上的应用程序。

## 技术栈

* **框架**: [UniApp](https://uniapp.dcloud.io/) (采用 Vue 3 Composition API `<script setup>` 语法)
* **状态管理**: [Pinia](https://pinia.vuejs.org/)
    * 集成 [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/) 实现状态持久化 (默认使用 `uni.storage`)
* **UI 库**: [@climblee/uv-ui](https://www.uvui.cn/) (基于 uView 2.x 的 Vue 3 版本)
* **HTTP 客户端**: [luch-request](https://github.com/lei-mu/luch-request)
* **样式**: SCSS (`.scss`)

## 核心功能

* **跨平台开发**: 通过 UniApp 一套代码编译到 H5、微信小程序及 App 等多个平台。
* **现代化前端**: 全面使用 Vue 3 的组合式 API (`<script setup>`).
* **模块化架构**: 采用模块化的组织方式，按功能分类存放工具函数、API 接口和状态管理。
* **集中式状态管理**: 使用 Pinia 管理全局状态，按功能模块划分，并支持状态持久化。
* **封装的 HTTP 请求**: 基于 `luch-request` 在 `utils/request.js` 中进行封装，包含请求和响应拦截器。
* **通用分页功能**: 提供 `usePagination` Hook，封装了分页相关的状态和方法，便于在列表页面中使用。
* **丰富的 UI 组件**: 使用 `@climblee/uv-ui` 提供的 UI 组件库构建界面。
* **分包机制**: 利用 UniApp 的分包功能 (`pages.json` 配置) 优化小程序主包体积和启动性能。
* **SCSS 样式系统**: 使用 SCSS 编写样式，全局变量定义于 `uni.scss`，通用 Mixins 和工具类定义于 `styles/common.scss`。
* **微信用户信息获取**: 集成了微信小程序获取用户头像和昵称的功能，适配了微信最新的API变更。

## 目录结构

```
项目根目录/
├── api/                # API 接口目录
│   ├── modules/        # API 模块目录（按业务划分）
│   │   ├── user.js      # 用户相关 API
│   │   └── upload.js    # 文件上传相关 API
│   └── index.js         # API 统一导出入口
├── config/             # 配置目录
│   └── env.js           # 环境配置
├── hooks/              # 自定义 Hooks 目录
│   └── usePagination.js # 分页 Hook
├── pages/              # 【主包】页面目录（仅包含 TabBar 页面和登录页）
│   ├── index/          # 首页 (TabBar)
│   └── login/          # 登录页
├── pagesA/             # 【分包A】示例（按业务或功能命名）
├── pagesB/             # 【分包B】示例
├── static/             # 静态资源目录
├── store/              # 状态管理目录
│   ├── modules/        # 状态管理模块目录
│   │   ├── user.js      # 用户状态管理
│   │   └── app.js       # 应用状态管理
│   └── index.js         # 状态管理统一导出入口
├── styles/             # 样式目录
├── utils/              # 工具目录
│   ├── common/          # 通用工具目录
│   │   ├── ui.js         # UI 交互相关函数
│   │   ├── device.js     # 设备相关函数
│   │   ├── file.js       # 文件相关函数
│   │   ├── format.js     # 格式化相关函数
│   │   ├── helper.js     # 辅助函数
│   │   ├── navigation.js # 导航相关函数
│   │   └── index.js      # 通用工具统一导出入口
│   ├── auth.js           # 授权相关函数
│   ├── request.js        # 请求相关函数
│   ├── updateApp.js      # 应用更新相关函数
│   └── index.js          # 工具统一导出入口
├── App.vue             # 应用入口
├── main.js             # 主入口
├── manifest.json       # 项目配置文件
├── pages.json          # 页面配置文件
├── package.json        # 项目依赖
├── uni.scss            # UniApp 全局 SCSS 变量
├── 项目开发规范与指南V1.1.md # 开发规范与指南
└── README.md           # 项目说明文档 (本文件)
```

## 功能模块

### 1. 环境配置 (config/env.js)
统一管理环境配置，包括API地址、token配置、状态码等。

```javascript
// 使用示例
import env from '@/config/env'

// 获取当前环境
console.log(env.ENV_TYPE)  // 'development' 或 'production'

// 获取API地址
console.log(env.baseUrl)   // 'http://localhost:3000'

// 使用状态码
if (res.code === env.code.success) {
  // 处理成功情况
}
```

### 2. API 模块化 (api/modules/)

API 接口采用模块化的组织方式，按功能分类存放在 `api/modules` 目录下的不同文件中。

```javascript
// api/modules/user.js
import http from '@/utils/request'

// 用户登录
export function login(data) {
  return http.post('/user/login', data)
}

// 获取用户信息
export function getUserInfo() {
  return http.get('/user/info')
}

// api/index.js
import * as user from './modules/user'
import * as upload from './modules/upload'

// 创建 API 对象
const api = {
  user,
  upload
}

// 导出所有模块
export {
  user,
  upload
}

// 导出所有方法
export * from './modules/user'
export * from './modules/upload'

// 默认导出 API 对象
export default api
```

在组件中使用示例：

```javascript
<script setup>
// 方式一：统一导入所有 API
import api from '@/api'

// 方式二：按模块导入
import { user } from '@/api'

// 方式三：直接导入特定方法（推荐，可减小包体积）
import { login, getUserInfo } from '@/api'

import { ref } from 'vue'
import { showToast } from '@/utils/common/ui'

const loading = ref(false)
const userInfo = ref(null)

// 获取用户信息
const fetchUserInfo = async () => {
  loading.value = true
  try {
    // 三种使用方式
    // const res = await api.user.getUserInfo()
    // const res = await user.getUserInfo()
    const res = await getUserInfo()

    userInfo.value = res.data
  } catch (error) {
    showToast(error.message || '获取用户信息失败')
  } finally {
    loading.value = false
  }
}
</script>
```

### 3. 状态管理 (store/modules/)

状态管理采用 Pinia 库，并按功能模块分类存放在 `store/modules` 目录下的不同文件中。

```javascript
// store/modules/user.js
import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    userInfo: null
  }),

  getters: {
    /**
     * 用户是否已登录
     * @returns {boolean} 登录状态
     */
    isLogin: (state) => !!state.token,

    /**
     * 获取用户名
     * @returns {string} 用户名
     */
    username: (state) => state.userInfo?.username || '',

    /**
     * 获取用户头像
     * @returns {string} 头像URL
     */
    avatar: (state) => state.userInfo?.avatar || ''
  },

  actions: {
    /**
     * 用户登录
     * @param {Object} userInfo - 用户登录信息
     * @returns {Promise<Object>} 登录结果
     */
    async login(userInfo) {
      const res = await login(userInfo)
      const { token } = res.data
      this.token = token
      setToken(token)
      return res
    },

    /**
     * 获取用户信息
     * @returns {Promise<Object>} 用户信息
     */
    async getUserInfo() {
      const res = await getUserInfo()
      this.userInfo = res.data
      return res
    },

    /**
     * 退出登录
     */
    logout() {
      this.token = ''
      this.userInfo = null
      removeToken()
    }
  },

  // 持久化配置
  persist: {
    key: 'user-store', // 存储的key
    storage: {
      // 存储到本地存储
      setItem(key, value) {
        uni.setStorageSync(key, value)
      },
      getItem(key) {
        return uni.getStorageSync(key)
      },
      removeItem(key) {
        uni.removeStorageSync(key)
      }
    },
    paths: ['token', 'userInfo'] // 需要持久化的数据
  }
})

// store/modules/app.js
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // 主题设置
    theme: 'light',
    // 语言设置
    language: 'zh-CN',
    // 字体大小
    fontSize: 'normal'
  }),

  getters: {
    isDarkTheme: (state) => state.theme === 'dark'
  },

  actions: {
    setTheme(theme) {
      this.theme = theme
    },
    setLanguage(language) {
      this.language = language
    },
    setFontSize(size) {
      this.fontSize = size
    }
  },

  persist: {
    key: 'app-store',
    storage: {
      setItem(key, value) { uni.setStorageSync(key, value) },
      getItem(key) { return uni.getStorageSync(key) },
      removeItem(key) { uni.removeStorageSync(key) }
    }
  }
})

// store/index.js
export { useUserStore } from './modules/user'
export { useAppStore } from './modules/app'
```

在组件中使用示例：

```javascript
<script setup>
// 方式一：从统一入口导入
import { useUserStore, useAppStore } from '@/store'

// 方式二：直接从模块导入
// import { useUserStore } from '@/store/modules/user'

import { ref } from 'vue'
import { showToast } from '@/utils/common/ui'

const userStore = useUserStore()
const appStore = useAppStore()
const loading = ref(false)
const formData = ref({
  username: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  try {
    await userStore.login(formData.value)
    await userStore.getUserInfo()
    uni.switchTab({
      url: '/pages/index/index'
    })
  } catch (error) {
    showToast(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}

// 使用应用设置
const toggleTheme = () => {
  appStore.setTheme(appStore.theme === 'light' ? 'dark' : 'light')
}
</script>
```

### 4. 工具函数库 (utils/common/)

工具函数采用模块化的组织方式，按功能分类存放在 `utils/common` 目录下的不同文件中。

```javascript
// utils/common/ui.js
/**
 * 显示消息提示
 * @param {string} title - 提示内容
 * @param {string} [icon='none'] - 图标类型，可选值：'success', 'error', 'none'
 * @param {number} [duration=2000] - 显示时长（毫秒）
 * @param {boolean} [mask=false] - 是否显示透明蒙层
 */
export function showToast(title, icon = 'none', duration = 2000, mask = false) {
  uni.showToast({
    title,
    icon,
    duration,
    mask
  })
}

// utils/common/helper.js
/**
 * 节流函数
 * @param {Function} fn - 要节流的函数
 * @param {number} delay - 节流时间（毫秒）
 * @returns {Function} 节流后的函数
 */
export function throttle(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

// utils/common/format.js
/**
 * 格式化日期
 * @param {Date|string|number} date - 要格式化的日期
 * @param {string} [format='YYYY-MM-DD'] - 格式化模板
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  // 函数实现...
  return format; // 简化示例
}

// utils/common/index.js
export * from './ui';
export * from './device';
export * from './file';
export * from './format';
export * from './helper';
export * from './navigation';
```

在组件中使用示例：

```javascript
<script setup>
// 方式一：直接从具体文件导入（推荐，减小包体积）
import { showToast } from "@/utils/common/ui";
import { throttle } from "@/utils/common/helper";
import { formatDate } from "@/utils/common/format";

// 方式二：从 common 统一入口导入
import { showToast, throttle, formatDate } from "@/utils/common";

// 方式三：从全局入口导入
import { showToast, throttle, formatDate } from "@/utils";

// 节流函数
const throttledFn = throttle(() => {
  console.log('节流函数执行')
}, 1000)

// 日期格式化
const date = formatDate(new Date(), 'YYYY-MM-DD')

// 消息提示
showToast('操作成功', 'success')
</script>
```

### 5. 支付模块 (utils/payment.js)
```javascript
// 创建支付订单示例
import { createOrder } from '@/utils/payment'

const orderData = {
  amount: 99.9,
  goodsId: '2025',
  payType: 'wechat' // 或 'alipay'
}

createOrder(orderData).then(res => {
  uni.showToast({ title: '支付成功' })
})
```

### 6. 应用更新检测 (utils/updateApp.js)
```javascript
// 在App.vue中初始化
import { checkUpdate } from '@/utils/updateApp'

export default {
  onLaunch() {
    checkUpdate({
      silent: true, // 静默检测
      force: false  // 非强制更新
    })
  }
}
```

### 7. 微信用户信息获取

项目集成了微信小程序获取用户头像和昵称的功能，适配了微信最新的API变更（官方回收了getUserProfile接口，现在使用button的开放能力chooseAvatar来获取头像和昵称）。

```javascript
// 1. 引入组件
import CuiUserProfileDialog from "@/components/cui-userprofiledialog/cui-userprofiledialog.vue";

// 2. 在模板中使用组件
// <cui-userprofiledialog ref="userProfileDialog"></cui-userprofiledialog>

// 3. 在登录成功后检查用户信息是否完整
async handleLogin() {
  const userStore = useUserStore();

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
}

// 4. 显示用户资料设置对话框
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

    // 5. 更新用户资料
    await updateUserInfo({
      avatar: res.avatarUrl,
      nickname: res.nickName
    });

  } catch (err) {
    // 注意：这里不需要显示错误提示框，因为request已经全局提示过了
    console.log("用户取消设置资料");
  }
}
```

### 8. 页面示例

#### 登录页面 (pages/login/login.vue)
```vue
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

    <!-- 用户资料设置对话框 -->
    <cui-userprofiledialog ref="userProfileDialog"></cui-userprofiledialog>
  </view>
</template>

<script>
import { useUserStore } from '@/store/user'
import CuiUserProfileDialog from "@/components/cui-userprofiledialog/cui-userprofiledialog.vue";

export default {
  components: {
    CuiUserProfileDialog
  },
  data() {
    return {
      loading: false,
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    async handleLogin() {
      const userStore = useUserStore()

      // 表单验证
      try {
        await this.$refs.form.validate()
      } catch (error) {
        return
      }

      this.loading = true
      try {
        await userStore.login(this.formData)
        await userStore.getUserInfo()
        uni.switchTab({
          url: '/pages/index/index'
        })
      } catch (error) {
        this.$refs.uToast.show({
          type: 'error',
          message: error.message || '登录失败'
        })
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
```

### 9. 分页功能 (hooks/usePagination.js)

项目提供了通用的分页 Hook，可以在任何列表页面中使用。

```javascript
// hooks/usePagination.js
import { ref, reactive, onMounted } from 'vue';
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app';
import { showToast } from '@/utils/common/ui';

/**
 * 使用分页 Hook
 * @param {Function} fetchFunction - 获取数据的函数，接收 {page, limit} 参数，返回 Promise
 * @param {Object} options - 配置选项
 * @param {number} options.limit - 每页数量，默认 10
 * @param {boolean} options.autoLoad - 是否自动加载第一页，默认 true
 * @param {boolean} options.pullDownRefresh - 是否启用下拉刷新，默认 true
 * @param {boolean} options.reachBottom - 是否启用上拉加载更多，默认 true
 * @returns {Object} 分页相关的状态和方法
 */
export function usePagination(fetchFunction, options = {}) {
  // 分页状态
  const state = reactive({
    list: [],
    page: 1,
    limit: options.limit || 10,
    hasMore: true,
    loading: false,
    refreshing: false,
    firstLoad: true,
    total: 0
  });

  // 加载数据
  const loadData = async (isRefresh = false) => {
    if (!state.hasMore && !isRefresh) return;

    state.loading = true;

    if (isRefresh) {
      state.page = 1;
      state.refreshing = true;
    }

    try {
      const res = await fetchFunction({
        page: state.page,
        limit: state.limit
      });

      const { list, total } = res.data;

      if (isRefresh) {
        state.list = list || [];
      } else {
        state.list = [...state.list, ...(list || [])];
      }

      state.total = total || 0;
      state.hasMore = state.list.length < state.total;
      state.firstLoad = false;

      if (state.hasMore) {
        state.page += 1;
      }
    } catch (err) {
      showToast(err.message || '加载失败');
    } finally {
      state.loading = false;
      state.refreshing = false;

      if (isRefresh) {
        uni.stopPullDownRefresh();
      }
    }
  };

  // 刷新数据
  const refresh = () => loadData(true);

  // 加载更多
  const loadMore = () => {
    if (!state.loading) {
      loadData();
    }
  };

  // 组件挂载时自动加载第一页
  onMounted(() => {
    if (options.autoLoad !== false) {
      loadData();
    }
  });

  // 如果启用了下拉刷新，监听下拉刷新事件
  if (options.pullDownRefresh !== false) {
    onPullDownRefresh(() => {
      refresh();
    });
  }

  // 如果启用了上拉加载更多，监听触底事件
  if (options.reachBottom !== false) {
    onReachBottom(() => {
      loadMore();
    });
  }

  return {
    state,
    loadData,
    refresh,
    loadMore
  };
}
```

在列表页面中使用示例：

```vue
<template>
  <view class="list-container">
    <!-- 列表内容 -->
    <view class="list-content">
      <!-- 列表项 -->
      <view v-for="(item, index) in pagination.state.list" :key="index" class="list-item">
        <image class="item-image" :src="item.image || 'https://picsum.photos/600/400'" mode="aspectFill"></image>
        <view class="item-info">
          <text class="item-title">{{ item.title }}</text>
          <text class="item-desc">{{ item.description }}</text>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="loading-status">
        <view v-if="pagination.state.loading" class="loading">
          <text>加载中...</text>
        </view>
        <view v-else-if="!pagination.state.hasMore && pagination.state.list.length > 0" class="no-more">
          <text>没有更多数据了</text>
        </view>
        <view v-else-if="!pagination.state.hasMore && pagination.state.list.length === 0" class="empty">
          <text>暂无数据</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { usePagination } from '@/hooks/usePagination';

// 获取列表数据的函数
const fetchListData = async (params) => {
  // 调用实际的 API
  // return api.getList(params);

  // 模拟数据
  return new Promise((resolve) => {
    setTimeout(() => {
      const { page, limit } = params;
      const total = 35; // 总数据量

      // 生成模拟数据
      const list = [];
      const startIndex = (page - 1) * limit;
      const endIndex = Math.min(startIndex + limit, total);

      for (let i = startIndex; i < endIndex; i++) {
        list.push({
          id: i + 1,
          title: `标题 ${i + 1}`,
          description: `这是第 ${i + 1} 条数据的描述信息，可以包含更多详细内容。`,
          image: `https://picsum.photos/600/400?random=${i + 1}`
        });
      }

      resolve({
        code: 200,
        data: {
          list,
          total,
          page,
          limit
        }
      });
    }, 500); // 模拟网络延迟
  });
};

// 使用分页Hook
const pagination = usePagination(fetchListData, {
  limit: 10, // 每页10条数据
  autoLoad: true, // 自动加载第一页
  pullDownRefresh: true, // 启用下拉刷新
  reachBottom: true // 启用上拉加载更多
});
</script>
```

### 10. 应用更新 (utils/updateApp.js)
提供了统一的应用更新机制，支持APP和微信小程序：

```javascript
import { checkForUpdates } from '@/utils/updateApp'

export default {
  onLaunch: function() {
    // #ifdef APP-PLUS
    const currentVersion = plus.runtime.version
    checkForUpdates(currentVersion)
    // #endif

    // #ifdef MP-WEIXIN
    checkForUpdates()  // 小程序不需要传入版本号
    // #endif
  }
}
```

#### APP更新特性
- 支持完整包更新（APK/IPA）
- 支持热更新（WGT）
- 支持强制更新
- 显示下载进度
- iOS跳转App Store
- 适配Android/iOS平台

```javascript
// APP更新配置示例
{
  version: '1.2.3',        // 新版本号
  updateType: 'APK',       // 更新类型：APK或WGT
  url: 'download-url',     // 更新包下载地址
  forceUpdate: false       // 是否强制更新
}
```

#### 微信小程序更新特性
- 自动检查新版本
- 提示用户重启应用
- 支持更新失败提示
- 版本检查回调

```javascript
// 单独检查小程序更新
import { checkMiniProgramUpdate } from '@/utils/updateApp'

// 在需要检查更新的地方调用
checkMiniProgramUpdate()
```

#### 使用建议
1. APP更新：
   - 普通更新使用WGT包，体积小，下载快
   - 大版本更新使用完整包
   - 建议配置CDN加速下载

2. 小程序更新：
   - 在`onLaunch`中调用更新检查
   - 更新完成后自动重启生效
   - 注意提示用户更新进度

3. 更新接口：
   ```javascript
   // 接口返回格式
   {
     code: 200,
     data: {
       version: '1.2.3',
       updateType: 'WGT',
       url: 'https://example.com/update.wgt',
       forceUpdate: false
     }
   }
   ```

### 11. 支付模块 (utils/payment.js)
提供了统一的支付接口，支持微信支付、支付宝支付和苹果应用内购买：

```javascript
import { pay, checkPaymentEnvironment } from '@/utils/payment'

// 检查支付环境
const canPay = await checkPaymentEnvironment('wxpay')
if (!canPay) {
  uni.showToast({ title: '当前环境不支持该支付方式', icon: 'none' })
  return
}

// 发起支付
try {
  const result = await pay({
    type: 'wxpay',
    data: {
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: ''
    }
  })
  console.log('支付成功', result)
} catch (error) {
  console.error('支付失败', error)
}
```

#### 支持的支付方式
1. 微信支付
   - 小程序支付
   - APP支付

2. 支付宝支付
   - APP支付

#### 主要特性
- 统一的支付接口
- 支付环境检测
- Promise风格API
- 完整的类型注释
- 自动判断平台

#### 接口说明
1. `pay(options)`: 统一支付接口
   ```javascript
   options: {
     type: 'wxpay' | 'alipay' | 'applepay',
     data: Object // 支付参数
   }
   ```

2. `checkPaymentEnvironment(payType)`: 检查支付环境
   ```javascript
   payType: 'wxpay' | 'alipay' | 'applepay'
   ```

3. `getPaymentMethods()`: 获取支持的支付方式
   ```javascript
   // 返回支持的支付方式数组
   ['wxpay', 'alipay', 'applepay']
   ```

4. 单独的支付方法
   - `wxPay(paymentData)`: 微信支付（小程序/APP）
   - `aliPay(paymentData)`: 支付宝支付（APP）
   - `applePay(productId)`: 苹果应用内购买

#### 使用建议
1. 调用支付前先检查环境
2. 处理好支付异常情况
3. 在APP端提供多种支付方式
4. 遵循各平台支付规范

## 快速开始

1. 安装依赖
```bash
npm install
```

2. 运行项目
```bash
# 运行到H5
npm run dev:h5

# 运行到微信小程序
npm run dev:mp-weixin

# 运行到APP
npm run dev:app
```

3. 生产构建
```bash
# H5
npm run build:h5

# 微信小程序
npm run build:mp-weixin

# APP
npm run build:app
```

## 常用样式库 (styles/common.scss)
提供了一套常用的SCSS样式库，包含布局、文本、边距等常用样式。

#### 使用方式
样式库已在`App.vue`中全局引入，可以直接使用类名：
```html
<template>
  <view class="flex-between px-20 py-10">
    <view class="text-ellipsis flex-1 mr-10">这是一段很长的文本</view>
    <view class="color-primary">详情</view>
  </view>

  <view class="position-center">
    <view class="bg-primary color-white radius-pill px-30 py-10">
      按钮
    </view>
  </view>
</view>
</template>

<style lang="scss">
@import '@/styles/common.scss';
</style>

```

#### 常用类名参考

1. Flex布局
```scss
.flex           // display: flex
.flex-1         // flex: 1
.flex-column    // 纵向排列
.flex-wrap      // 自动换行
.flex-center    // 居中对齐
.flex-between   // 两端对齐
.flex-around    // 环绕对齐
.flex-end       // 尾部对齐
```

2. 文本样式
```scss
.text-ellipsis   // 单行省略
.text-ellipsis-2 // 两行省略
.text-ellipsis-3 // 三行省略

.fs-24           // 字体大小24rpx (20-40)
.fw-400          // 字体粗细
.fw-500
.fw-600
.fw-bold

.text-left       // 文本对齐
.text-center
.text-right
```

3. 边距（0-30，步进1）
```scss
.m-10            // 外边距10rpx
.mt-10           // 上外边距
.mr-10           // 右外边距
.mb-10           // 下外边距
.ml-10           // 左外边距
.mx-10           // 左右外边距
.my-10           // 上下外边距

.p-10            // 内边距
.pt-10           // 上内边距
.pr-10           // 右内边距
.pb-10           // 下内边距
.pl-10           // 左内边距
.px-10           // 左右内边距
.py-10           // 上下内边距
```

4. 定位
```scss
.position-relative
.position-absolute
.position-fixed
.position-center  // 绝对定位居中
.position-top     // 固定在顶部
.position-bottom  // 固定在底部
```

5. 尺寸
```scss
.w-100           // 宽度100%
.h-100           // 高度100%
.w-50            // 宽度50%
.h-50            // 高度50%
```

6. 圆角（0-20，步进1）
```scss
.radius-10       // 圆角10rpx
.radius-circle   // 圆形（50%）
.radius-pill     // 胶囊形状（9999rpx）
```

7. 边框
```scss
.border          // 0.5px边框
.border-top      // 上边框
.border-bottom   // 下边框
```

8. 颜色
```scss
/* 文本颜色 */
.color-primary   // 主色
.color-success   // 成功色
.color-warning   // 警告色
.color-error     // 错误色
.color-white     // 白色
.color-black     // 黑色
.color-gray      // 灰色

/* 背景色 */
.bg-primary      // 主色背景
.bg-success      // 成功色背景
.bg-warning      // 警告色背景
.bg-error        // 错误色背景
.bg-white        // 白色背景
.bg-black        // 黑色背景
.bg-gray         // 灰色背景
```

9. 阴影
```scss
.shadow          // 常规阴影
.shadow-sm       // 小阴影
.shadow-lg       // 大阴影
```

10. 动画
```scss
.transition      // 过渡动画（0.3s）
.transition-fast // 快速过渡（0.2s）
.transition-slow // 慢速过渡（0.4s）
```

11. 状态
```scss
.disabled        // 禁用状态
```

12. 页面布局
```scss
.page            // 最小高度100vh，灰色背景
.page-white      // 白色背景
.safe-area-inset-bottom  // 底部安全区适配
```

#### 最佳实践
1. 优先使用预定义类名，避免重复编写样式
2. 组合使用类名，实现复杂布局
3. 需要复用的自定义样式，使用混合宏封装
4. 颜色、尺寸等通用变量统一管理
5. 保持类名语义化，便于维护
