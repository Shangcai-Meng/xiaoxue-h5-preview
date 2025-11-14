<template>
  <view class="page">
    <!-- 顶部导航栏 -->
    <uv-navbar :title="t('options.navbar.title')" titleStyle="font-size: 36rpx;color: #333;" :placeholder="true" :autoBack="false" leftIconSize="0">
      <template #right>
        <LanguageToggle />
      </template>
    </uv-navbar>

    <scroll-view scroll-y class="scroll">
      <view class="content">
        <!-- 交易对选择和涨跌幅 -->
        <view class="pair-section">
          <view class="pair-left">
            <text class="pair-name">{{ currentPair }}</text>
            <uv-icon name="arrow-down-fill" size="18rpx" color="#333"></uv-icon>
          </view>
          <view class="pair-right">
            <text class="rise-text">{{ t('options.pair.rise') }}: {{ risePercent }}%</text>
            <text class="fall-text">{{ t('options.pair.fall') }}: {{ fallPercent }}%</text>
          </view>
        </view>

        <!-- K线图区域 -->
        <view class="chart-container">
          <!-- 时间周期选择 -->
          <view class="time-tabs">
            <view
              v-for="(item, index) in timePeriods"
              :key="index"
              :class="['time-tab', { active: currentTimePeriod === item.value }]"
              @click="switchTimePeriod(item)">
              {{ t('options.timePeriods.' + item.key) }}
            </view>
          </view>

          <!-- MA指标显示 -->
          <view class="ma-indicators">
            <text class="ma-item ma5">MA(5):{{ ma5Price }}</text>
            <text class="ma-item ma10">MA(10):{{ ma10Price }}</text>
            <text class="ma-item ma30">MA(30):{{ ma30Price1 }}</text>
            <text class="ma-item ma60">MA(60):{{ ma30Price2 }}</text>
          </view>

          <!-- K线图容器 -->
          <view class="chart-wrapper" id="chartContainer"></view>
        </view>

        <!-- 时间单位标签 -->
        <view class="time-unit">{{ t('options.time.unit') }}</view>

        <!-- 时间周期按钮组 -->
        <view class="period-buttons">
          <view
            v-for="(period, index) in periods"
            :key="index"
            :class="['period-btn', { active: currentPeriod === period }]"
            @click="currentPeriod = period">
            {{ t('options.periods.' + period) }}
          </view>
        </view>

        <!-- 数量输入区域 -->
        <view class="quantity-section">
          <view class="quantity-label">{{ t('options.labels.quantity') }}</view>
          <view class="quantity-input-wrapper">
            <view class="quantity-controls">
              <input type="number" v-model="quantity" class="quantity-input" placeholder="50" />
              <view class="control-btn minus" @click="decreaseQuantity">
                <image
                  :src="quantity <= 0 ? '../../static/images/options/minus-disabled.png' : '../../static/images/options/minus.png'"
                  mode="widthFix"
                  class="btn-icon"
                  style="width: 55rpx; height: 55rpx" />
              </view>
              <view class="control-btn plus" @click="increaseQuantity">
                <image
                  :src="quantity >= 99 ? '../../static/images/options/plus-disabled.png' : '../../static/images/options/plus.png'"
                  mode="widthFix"
                  class="btn-icon"
                  style="width: 55rpx; height: 55rpx" />
              </view>
            </view>
          </view>
        </view>

        <!-- 订单列表标签页 -->
        <view class="order-tabs">
          <view
            v-for="(tab, index) in orderTabs"
            :key="index"
            :class="['order-tab', { active: currentOrderTab === tab.key }]"
            @click="currentOrderTab = tab.key">
            {{ t('options.orderTabs.' + tab.key) }}
            <view v-if="currentOrderTab === tab.key" class="tab-underline"></view>
          </view>
        </view>

        <!-- 订单列表 -->
        <view class="order-list">
          <view v-for="(order, index) in displayOrders" :key="index" class="order-item">
            <view class="order-header">
              <view class="order-left">
                <image
                  :src="order.type === 'up' ? '../../static/images/options/up.png' : '../../static/images/options/down.png'"
                  mode="widthFix"
                  class="order-icon" />
                <text class="order-coin">{{ order.coin }}</text>
              </view>
              <view class="order-right">
                <text class="order-amount">{{ order.amount }} USDT</text>
              </view>
            </view>
            <view class="order-details">
              <view class="detail-row">
                <text class="detail-label">{{ t('options.labels.quantity') }}</text>
                <text class="detail-value">{{ order.quantity }}</text>
              </view>
              <view class="detail-row">
                <text class="detail-label">{{ t('options.labels.openPrice') }}</text>
                <text class="detail-value">{{ order.openPrice }}</text>
              </view>
              <view class="detail-row">
                <text class="detail-label">{{ t('options.labels.openTime') }}</text>
                <text class="detail-value">{{ order.openTime }}</text>
              </view>
            </view>
            <view class="order-details">
              <view class="detail-row">
                <text class="detail-label">{{ t('options.labels.bonusRate') }}</text>
                <text class="detail-value rate">{{ order.bonusRate }}</text>
              </view>
              <view class="detail-row">
                <text class="detail-label">{{ t('options.labels.openPrice') }}</text>
                <text class="detail-value">{{ order.openPrice2 }}</text>
              </view>
              <view class="detail-row">
                <text class="detail-label">{{ t('options.labels.openTime') }}</text>
                <text class="detail-value">{{ order.openTime2 }}</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 底部操作按钮 -->
        <view class="action-buttons">
          <view class="action-btn rise" @click="handleRise">
            <image src="../../static/images/options/up-active.png" mode="widthFix" class="btn-icon" />
            <text class="btn-text">{{ t('options.actions.rise') }}</text>
          </view>
          <view class="action-btn fall" @click="handleFall">
            <image src="../../static/images/options/down-active.png" mode="widthFix" class="btn-icon" />
            <text class="btn-text">{{ t('options.actions.fall') }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts/core";
import { CandlestickChart, LineChart } from "echarts/charts";
import { GridComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import LanguageToggle from "@/components/LanguageToggle.vue";

import { useI18n } from '@/hooks/useI18n.js'

// 注册 ECharts 组件
echarts.use([CandlestickChart, LineChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

const { t } = useI18n()

// 当前交易对
const currentPair = ref("BTCUSDT");
const risePercent = ref("80");
const fallPercent = ref("80");

// ECharts 实例
let chartInstance = null;

// 时间周期配置
const timePeriods = ref([
  { key: '1m', value: 1, period: 4 },
  { key: '5m', value: 5, period: 4 },
  { key: '10m', value: 10, period: 4 },
  { key: '15m', value: 15, period: 4 },
  { key: '30m', value: 30, period: 4 },
  { key: '1h', value: 60, period: 4 },
  { key: '4h', value: 240, period: 4 },
  { key: 'day', value: 0, period: 0 },
  { key: 'indexPrice', value: 0, period: 0 },
]);
const currentTimePeriod = ref(1);

// MA指标数据
const ma5Price = ref("108,118.33");
const ma10Price = ref("108,553.11");
const ma30Price1 = ref("111, 111.72");
const ma30Price2 = ref("113, 260.26");

// 时间周期按钮
const periods = ref(['10m', '30m', '1h', '1d']);
const currentPeriod = ref('10m');

// 数量
const quantity = ref(50);

const decreaseQuantity = () => {
  if (quantity.value > 0) {
    quantity.value -= 10;
    if (quantity.value < 0) {
      quantity.value = 0;
    }
  }
};

const increaseQuantity = () => {
  if (quantity.value < 99) {
    quantity.value += 10;
    if (quantity.value > 99) {
      quantity.value = 99;
    }
  }
};

// 切换时间周期
const switchTimePeriod = (item) => {
  currentTimePeriod.value = item.value;
  console.log("切换周期:", item);
  // 重新渲染图表数据
  renderChart();
};

// 生成模拟K线数据（根据时间周期生成不同数量的数据）
const generateKlineData = () => {
  const data = [];
  const dates = [];
  let basePrice = 108000;

  // 根据当前时间周期决定数据点数量
  // 时间周期越短，显示的数据点越多
  let dataCount = 60;
  if (currentTimePeriod.value === 1) {
    dataCount = 60; // 1分钟显示60个数据点
  } else if (currentTimePeriod.value === 5) {
    dataCount = 72; // 5分钟显示72个数据点
  } else if (currentTimePeriod.value === 10) {
    dataCount = 60; // 10分钟显示60个数据点
  } else if (currentTimePeriod.value === 15) {
    dataCount = 48; // 15分钟显示48个数据点
  } else if (currentTimePeriod.value === 30) {
    dataCount = 48; // 30分钟显示48个数据点
  } else if (currentTimePeriod.value === 60) {
    dataCount = 48; // 1小时显示48个数据点
  } else if (currentTimePeriod.value === 240) {
    dataCount = 42; // 4小时显示42个数据点
  }

  for (let i = 0; i < dataCount; i++) {
    const open = basePrice + Math.random() * 5000 - 2500;
    const close = open + Math.random() * 4000 - 2000;
    const high = Math.max(open, close) + Math.random() * 1000;
    const low = Math.min(open, close) - Math.random() * 1000;

    data.push([open, close, low, high]);
    dates.push(`${String(i).padStart(2, "0")}:00`);

    basePrice = close;
  }

  return { data, dates };
};

// 计算MA均线
const calculateMA = (data, dayCount) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (i < dayCount - 1) {
      result.push("-");
      continue;
    }
    let sum = 0;
    for (let j = 0; j < dayCount; j++) {
      sum += data[i - j][1]; // 使用收盘价
    }
    result.push((sum / dayCount).toFixed(2));
  }
  return result;
};

// 渲染图表数据
const renderChart = () => {
  if (!chartInstance) {
    console.error("图表实例未初始化");
    return;
  }

  // 生成数据
  const { data: klineData, dates } = generateKlineData();
  const ma5Data = calculateMA(klineData, 5);
  const ma10Data = calculateMA(klineData, 10);
  const ma30Data = calculateMA(klineData, 30);
  const ma60Data = calculateMA(klineData, 60);

  // 更新MA指标显示
  const lastIndex = klineData.length - 1;
  ma5Price.value = ma5Data[lastIndex] !== "-" ? Number(ma5Data[lastIndex]).toLocaleString() : "-";
  ma10Price.value = ma10Data[lastIndex] !== "-" ? Number(ma10Data[lastIndex]).toLocaleString() : "-";
  ma30Price1.value = ma30Data[lastIndex] !== "-" ? Number(ma30Data[lastIndex]).toLocaleString() : "-";
  ma30Price2.value = ma60Data[lastIndex] !== "-" ? Number(ma60Data[lastIndex]).toLocaleString() : "-";

  // 配置ECharts选项
  const option = {
    backgroundColor: "#ffffff", // 白色背景
    grid: {
      left: "3%",
      right: "12%", // 右侧留出空间给Y轴
      top: "3%", // 减少顶部空白
      bottom: "5%",
    },
    xAxis: {
      type: "category",
      data: dates,
      position: "bottom", // X轴在底部
      axisLine: {
        lineStyle: { color: "#e0e0e0" }, // 浅灰色轴线
      },
      axisLabel: {
        show: false, // 隐藏X轴时间标签
      },
      axisTick: {
        show: false, // 隐藏刻度线
      },
    },
    yAxis: {
      type: "value",
      scale: true,
      position: "right", // Y轴移到右侧
      splitLine: {
        lineStyle: {
          color: "#f0f0f0", // 浅灰色网格线
          type: "dashed", // 虚线样式
        },
      },
      axisLine: {
        show: true,
        lineStyle: { color: "#e0e0e0" }, // 浅灰色轴线
      },
      axisLabel: {
        color: "#666", // 深灰色文字
        fontSize: 10,
        formatter: (value) => {
          // 格式化价格显示,使用千位分隔符
          return value.toLocaleString();
        },
      },
      axisTick: {
        show: false, // 隐藏刻度线
      },
    },
    series: [
      {
        name: "K线",
        type: "candlestick",
        data: klineData,
        itemStyle: {
          color: "#ffffff", // 红色镂空圆柱填充为白色(空心效果)
          color0: "#5DCD0B", // 绿色实心圆柱填充
          borderColor: "#ED4E53", // 红色镂空圆柱边框
          borderColor0: "#5DCD0B", // 绿色实心圆柱边框
          borderWidth: 2, // 增加边框宽度,在白色背景下更清晰
        },
        barWidth: "70%",
      },
      {
        name: "MA5",
        type: "line",
        data: ma5Data,
        smooth: true,
        lineStyle: {
          width: 1.5,
          color: "#ff9800", // 橙色(保持原有颜色)
        },
        showSymbol: false,
      },
      {
        name: "MA10",
        type: "line",
        data: ma10Data,
        smooth: true,
        lineStyle: {
          width: 1.5,
          color: "#96356B", // 紫色线
        },
        showSymbol: false,
      },
      {
        name: "MA30",
        type: "line",
        data: ma30Data,
        smooth: true,
        lineStyle: {
          width: 1.5,
          color: "#3C85AE", // 蓝色线
        },
        showSymbol: false,
      },
      {
        name: "MA60",
        type: "line",
        data: ma60Data,
        smooth: true,
        lineStyle: {
          width: 1.5,
          color: "#8F93C0", // 浅蓝紫色线
        },
        showSymbol: false,
      },
    ],
  };

  chartInstance.setOption(option);
  console.log("K线图渲染完成");
};

// 初始化K线图
const initKlineChart = () => {
  console.log("开始初始化ECharts K线图");

  // 直接使用 DOM 元素
  const container = document.getElementById("chartContainer");
  if (!container) {
    console.error("图表容器未找到");
    return;
  }

  console.log("图表容器尺寸:", container.offsetWidth, container.offsetHeight);

  // 初始化ECharts
  chartInstance = echarts.init(container);

  // 渲染图表
  renderChart();

  console.log("ECharts实例已创建");
};

// 初始化
onMounted(() => {
  setTimeout(() => {
    initKlineChart();
  }, 300);
});

// 订单标签页
const orderTabs = ref([
  { key: 'open' },
  { key: 'closed' },
]);
const currentOrderTab = ref("closed");

// 订单列表数据
const orders = ref([
  {
    type: "up",
    coin: "BTC",
    amount: "0.00 USDT",
    quantity: "125",
    openPrice: "4746.5034",
    openTime: "08-24 01:02:52",
    bonusRate: "80%",
    openPrice2: "4746.5742",
    openTime2: "08-24 01:12:56",
  },
  {
    type: "down",
    coin: "BTC",
    amount: "0.00 USDT",
    quantity: "125",
    openPrice: "4746.5034",
    openTime: "08-24 01:02:52",
    bonusRate: "80%",
    openPrice2: "4746.5742",
    openTime2: "08-24 01:12:56",
  },
]);

// 根据当前标签页显示订单
const displayOrders = ref(orders.value);

// 操作方法
const handleRise = () => {
  console.log("上涨");
};

const handleFall = () => {
  console.log("下跌");
};
</script>

<style lang="scss" scoped>
.page {
  background: #fff;
  display: flex;
  flex-direction: column;
}

.scroll {
  flex: 1;
  height: 0;
}

.content {
  padding: 0 0 140rpx 0;
}

/* 交易对选择区域 */
.pair-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 32rpx;
  background: #fff;
  border-bottom: 1rpx solid #f0f0f0;
}

.pair-left {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.pair-name {
  font-size: 34rpx;
  font-weight: 600;
  color: #333;
}

.arrow-down {
  width: 24rpx;
  height: 24rpx;
}

.pair-right {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.rise-text {
  font-size: 28rpx;
  color: #24a980;
}

.fall-text {
  font-size: 28rpx;
  color: #24a980;
}

/* K线图容器 */
.chart-container {
  background: #fff;
  padding: 24rpx 0 0 0;
  position: relative;
}

/* 时间周期选择 */
.time-tabs {
  display: flex;
  align-items: center;
  padding: 0 32rpx 16rpx;
  gap: 26rpx;
  overflow-x: auto;
  white-space: nowrap;
}

.time-tab {
  font-size: 24rpx;
  color: #666;
  padding: 8rpx 0;
  flex-shrink: 0;
}

.time-tab.active {
  color: #333;
  font-weight: 600;
}

/* MA指标 */
.ma-indicators {
  display: flex;
  flex-wrap: wrap;
  gap: 24rpx;
  padding: 0 32rpx;
}

.ma-item {
  font-size: 24rpx;
}

.ma5 {
  color: #f6a622;
}

.ma10 {
  color: #9c27b0;
}

.ma30 {
  color: #999;
}

/* K线图容器 */
.chart-wrapper {
  width: 100%;
  height: 500rpx;
  position: relative;
  overflow: hidden;
  background-color: #ffffff; /* 白色背景 */
}

.kline-canvas {
  width: 100%;
  height: 100%;
}

/* 时间单位标签 */
.time-unit {
  padding: 14rpx 32rpx 16rpx;
  font-size: 26rpx;
  color: #666666;
  background: #fff;
}

/* 时间周期按钮组 */
.period-buttons {
  display: flex;
  gap: 24rpx;
  padding: 0 32rpx 32rpx;
  background: #fff;
}

.period-btn {
  flex: 1;
  height: 62rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1rpx solid #c8c8c8;
  border-radius: 10rpx;
  font-size: 28rpx;
  color: #666;
}

.period-btn.active {
  background: linear-gradient(90deg, #fb5954 0%, #f9bd2a 100%);
  color: #fff;
  border: none;
}

/* 数量输入区域 */
.quantity-section {
  padding: 0 32rpx;
  background: #fff;
}

.quantity-label {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 24rpx;
}

.quantity-input-wrapper {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 24rpx;
  background-color: #eeeeee;
  padding-right: 25rpx;
  border-radius: 10rpx;
}

.control-btn {
  width: 55rpx;
  height: 55rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.control-btn.minus {
  background: #ff6b3d;
}

.control-btn.plus {
  background: #999;
}

.quantity-input {
  flex: 1;
  height: 88rpx;
  background: #eeeeee;
  border-radius: 12rpx;
  padding: 0 32rpx;
  font-size: 32rpx;
  color: #333;
}

/* 订单标签页 */
.order-tabs {
  display: flex;
  align-items: center;
  gap: 48rpx;
  padding: 32rpx 32rpx 0;
  background: #fff;
  border-bottom: 1rpx solid #d2d2d2;
}

.order-tab {
  position: relative;
  padding-bottom: 24rpx;
  font-size: 30rpx;
  color: #333;
}

.order-tab.active {
  color: #333;
}

.tab-underline {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 51rpx;
  height: 7rpx;
  background: linear-gradient(90deg, #fb5954 0%, #f9bd2a 100%);
  border-radius: 3rpx;
}

/* 订单列表 */
.order-list {
  background: #fff;
  padding: 0 32rpx;
}

.order-item {
  padding: 32rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
}

.order-item:last-child {
  border-bottom: none;
}

.order-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
}

.order-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.order-icon {
  width: 32rpx;
  height: 32rpx;
}

.order-coin {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
}

.order-right {
  font-size: 34rpx;
  font-weight: 600;
  color: #09132c;
}

.order-details {
  display: flex;
  gap: 32rpx;
  margin-bottom: 16rpx;
}

.order-details:last-child {
  margin-bottom: 0;
}

.detail-row {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.detail-label {
  font-size: 24rpx;
  color: #666;
}

.detail-value {
  font-size: 28rpx;
  color: #333;
}

.detail-value.rate {
  color: #24a980;
}

/* 底部操作按钮 */
.action-buttons {
  position: fixed;
  bottom: calc(var(--window-bottom));
  left: 0;
  right: 0;
  display: flex;
  gap: 32rpx;
  padding: 24rpx 32rpx;
}

.action-btn {
  flex: 1;
  height: 96rpx;
  border-radius: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #fff;
}

.action-btn.rise {
  background: linear-gradient(135deg, #3ecf8e 0%, #20a36b 100%);
}

.action-btn.fall {
  background: linear-gradient(135deg, #ff7b7b 0%, #ff5a47 100%);
}

.btn-icon {
  width: 33rpx;
  height: 20rpx;
}

.btn-text {
  font-size: 32rpx;
  font-weight: 600;
}
</style>
