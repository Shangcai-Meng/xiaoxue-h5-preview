# TM3 样式指南

## 目录
1. [快速开始](#快速开始)
2. [混合宏](#混合宏)
3. [预设类](#预设类)
4. [变量](#变量)
5. [最佳实践](#最佳实践)

## 快速开始

### 基础使用
样式库已在`App.vue`中全局引入，可以直接使用预设类：
```html
<template>
  <view class="flex-between px-20">
    <view class="text-ellipsis flex-1">标题文本</view>
    <view class="color-primary">详情</view>
  </view>
</template>
```

### 使用混合宏
如果需要使用混合宏，需要在组件中引入：
```html
<style lang="scss">
@import '@/styles/common.scss';

.custom {
  @include flex-center;
  @include text-overflow(2);
}
</style>
```

## 混合宏

### 1. 文本省略 @include text-overflow
```scss
// 单行省略
.title {
  @include text-overflow;
}

// 多行省略
.desc {
  @include text-overflow(2);  // 两行
}
```

### 2. Flex居中 @include flex-center
```scss
.container {
  @include flex-center;  // 水平垂直居中
}
```

### 3. 正方形 @include square
```scss
.avatar {
  @include square(100rpx);  // 宽高都是100rpx
}
```

### 4. 0.5px边框 @include hairline
```scss
// 底部边框
.item {
  @include hairline(bottom);
}

// 四周边框
.card {
  @include hairline(all, #eee);  // 可以指定颜色
}

// 指定位置
.custom {
  @include hairline(top);    // 上边框
  @include hairline(right);  // 右边框
  @include hairline(left);   // 左边框
}
```

## 预设类

### 1. Flex布局
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

### 2. 间距（0-100，步进1）
```scss
// 外边距
.m-10    // margin: 10rpx
.mt-10   // margin-top: 10rpx
.mr-10   // margin-right: 10rpx
.mb-10   // margin-bottom: 10rpx
.ml-10   // margin-left: 10rpx
.mx-10   // margin-left: 10rpx; margin-right: 10rpx
.my-10   // margin-top: 10rpx; margin-bottom: 10rpx

// 内边距（同上）
.p-10
.pt-10
.pr-10
.pb-10
.pl-10
.px-10
.py-10
```

### 3. 文本
```scss
// 文本省略
.text-ellipsis   // 单行省略
.text-ellipsis-2 // 两行省略
.text-ellipsis-3 // 三行省略

// 字体大小（20-40）
.fs-24           // font-size: 24rpx

// 字体粗细
.fw-400
.fw-500
.fw-600
.fw-bold

// 对齐
.text-left
.text-center
.text-right
```

### 4. 颜色
```scss
// 文本颜色
.color-primary          // 主题色
.color-success         // 成功色
.color-warning         // 警告色
.color-error          // 错误色
.color-text-base      // 主要文字
.color-text-normal    // 常规文字
.color-text-light     // 次要文字
.color-text-disabled  // 禁用文字

// 背景色
.bg-primary          // 主题背景
.bg-primary-light    // 主题背景淡色
.bg-success         // 成功背景
.bg-warning         // 警告背景
.bg-error          // 错误背景
.bg-white          // 白色背景
.bg-grey           // 灰色背景
.bg-page           // 页面背景色
```

### 5. 按钮
```scss
// 基础类
.btn            // 基础按钮样式
.btn-block      // 块级按钮（宽度100%）

// 主题
.btn-primary    // 主要按钮（黄色背景）
.btn-default    // 默认按钮（灰色背景）
.btn-danger     // 危险按钮（红色背景）

// 朴素按钮
.btn-plain      // 镂空按钮，搭配主题使用

// 禁用状态
.btn-disabled   // 禁用状态，搭配主题使用

// 尺寸
.btn-lg        // 大按钮 96rpx
.btn-sm        // 小按钮 64rpx
.btn-mini      // 迷你按钮 48rpx
```

### 6. 其他
```scss
// 圆角（0-20）
.radius-10
.radius-circle   // 50%
.radius-pill     // 9999rpx

// 边框
.border
.border-top
.border-bottom

// 阴影
.shadow
.shadow-sm
.shadow-lg

// 过渡
.transition      // 过渡动画 0.3s
.transition-fast // 快速过渡 0.2s
.transition-slow // 慢速过渡 0.4s

// 状态
.disabled
```


```scss
// 安全区适配
.safe-top      // 顶部安全区
.safe-status   // 状态栏
.safe-bottom   // 底部安全区
.safe-all      // 全部安全区
.safe-header   // 顶部+状态栏
```

## 变量
```scss
// 颜色
$uni-primary: #2979ff;
$uni-success: #19be6b;
$uni-warning: #ff9900;
$uni-error: #fa3534;

// 文字
$uni-main-color: #303133;
$uni-content-color: #606266;
$uni-tips-color: #909399;
$uni-light-color: #c0c4cc;

// 背景
$uni-bg-color: #f5f5f5;
$uni-border-color: #e5e5e5;

// 尺寸
$uni-font-size-sm: 24rpx;
$uni-font-size-base: 28rpx;
$uni-font-size-lg: 32rpx;

// 圆角
$uni-border-radius-sm: 4rpx;
$uni-border-radius-base: 8rpx;
$uni-border-radius-lg: 12rpx;

// 间距
$uni-spacing-sm: 16rpx;
$uni-spacing-base: 24rpx;
$uni-spacing-lg: 32rpx;
```

## 最佳实践

### 1. 类名组合
```html
<!-- 推荐：组合使用预设类 -->
<view class="flex-between px-20 py-10 radius-10 bg-white">
  <view class="text-ellipsis flex-1 mr-10">标题</view>
  <view class="color-primary">详情</view>
</view>

<!-- 不推荐：重复编写样式 -->
<view class="custom">...</view>
<style>
.custom {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  background: #fff;
  border-radius: 10rpx;
}
</style>
```

### 2. 混合宏复用
```scss
// 推荐：封装常用样式组合
@mixin card-style {
  @include flex-center;
  @include hairline(all, #eee);
  padding: 20rpx;
  background: #fff;
}

// 使用
.card {
  @include card-style;
}
```

### 3. 响应式设计
```scss
// 推荐：使用rpx单位
.container {
  padding: 20rpx;
  font-size: 28rpx;
}

// 不推荐：使用px单位
.container {
  padding: 10px;
  font-size: 14px;
}
```

### 4. 变量使用
```scss
// 推荐：使用变量
.title {
  color: $uni-main-color;
  font-size: $uni-font-size-lg;
}

// 不推荐：硬编码
.title {
  color: #303133;
  font-size: 32rpx;
}
```

### 5. BEM命名规范
```scss
// 推荐：使用BEM命名
.card {
  &__header {
    @include flex-between;
  }
  
  &__title {
    @include text-overflow;
  }
  
  &--active {
    background: $uni-primary;
  }
}
```

### 6. 使用预设类优先
尽量使用预设类来构建页面，这样可以保持样式的一致性：
```html
<template>
  <view class="page">
    <view class="flex-between px-20 py-10">
      <text class="fs-28 fw-500">标题</text>
      <text class="color-primary">更多</text>
    </view>
  </view>
</template>
```

### 7. 合理使用混合宏
对于需要复用的复杂样式，使用混合宏：
```scss
.card {
  @include hairline(all);
  @include flex-center;
  padding: 20rpx;
}
```

### 8. 响应式设计
统一使用rpx作为单位，保证在不同设备上的一致性。

### 9. 性能优化
- 避免过度嵌套选择器
- 合理使用预设类，减少重复代码
- 使用flex布局代替float

### 10. 主题定制
如需修改主题色等变量，请在`uni.scss`中覆盖相应变量。
