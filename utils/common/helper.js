/**
 * 辅助工具函数
 * 包含节流、防抖、深拷贝等通用辅助功能
 * 
 * @module helper
 */

/**
 * 节流函数 - 限制函数的执行频率
 * 在指定的时间间隔内只执行一次函数，常用于滚动事件、页面缩放等高频触发的事件
 * 
 * @param {Function} fn - 需要节流的函数
 * @param {Number} delay - 延迟时间，单位毫秒
 * @returns {Function} - 返回节流后的函数
 * 
 * @example
 * // 使用节流函数处理滚动事件
 * const handleScroll = throttle(function() {
 *   console.log('scroll event triggered');
 * }, 200);
 * 
 * // 添加滚动事件监听
 * window.addEventListener('scroll', handleScroll);
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

/**
 * 防抖函数 - 延迟执行函数
 * 在指定时间内多次触发事件，只执行最后一次，常用于搜索输入、表单验证、防止重复请求等
 * 
 * @param {Function} fn - 需要防抖的函数
 * @param {Number} delay - 延迟时间，单位毫秒
 * @param {Boolean} [immediate=false] - 是否在触发事件后立即执行函数，然后等待延迟时间再次执行
 * @returns {Function} - 返回防抖后的函数
 * 
 * @example
 * // 使用防抖函数处理搜索输入（延迟执行）
 * const handleSearch = debounce(function(value) {
 *   console.log('searching for:', value);
 *   // 调用搜索API
 * }, 500);
 * 
 * // 使用立即执行模式（适用于需要立即响应的场景）
 * const handleButtonClick = debounce(function() {
 *   console.log('立即响应点击，但防止短时间内重复点击');
 * }, 500, true);
 * 
 * // 在输入框中使用
 * <input type="text" @input="e => handleSearch(e.target.value)" />
 * 
 * // 防止重复请求或重复点击的示例
 * // 1. 创建一个状态标记
 * let isSubmitting = false;
 * 
 * // 2. 创建防止重复提交的函数
 * const submitForm = debounce(function() {
 *   if (isSubmitting) {
 *     showToast('正在提交中，请勿重复操作');
 *     return;
 *   }
 *   
 *   isSubmitting = true;
 *   api.submitData(formData)
 *     .then(res => {
 *       showToast('提交成功');
 *     })
 *     .catch(err => {
 *       showToast('提交失败');
 *     })
 *     .finally(() => {
 *       isSubmitting = false;
 *     });
 * }, 300);
 * 
 * // 3. 在按钮点击事件中使用
 * <button @click="submitForm">提交</button>
 */
export function debounce(fn, delay, immediate = false) {
  let timer = null;
  return function (...args) {
    // 如果需要立即执行且当前没有定时器，记录这个状态
    const callNow = immediate && !timer;
    
    // 清除之前的定时器
    if (timer) clearTimeout(timer);
    
    // 设置新的定时器
    timer = setTimeout(() => {
      timer = null; // 定时器执行完后清除
      if (!immediate) fn.apply(this, args); // 如果不是立即执行模式，在定时器触发时执行
    }, delay);
    
    // 如果是立即执行模式且应该立即调用，则立即执行函数
    if (callNow) fn.apply(this, args);
  };
}

/**
 * 深拷贝 - 创建对象的深度复制
 * 可以复制对象、数组等引用类型，并且不会影响原始对象
 * 
 * @param {Object|Array} obj - 需要深拷贝的对象或数组
 * @returns {Object|Array} - 返回拷贝后的新对象或数组
 * 
 * @example
 * // 深拷贝对象
 * const originalObj = { 
 *   name: '张三', 
 *   age: 30,
 *   address: {
 *     city: '北京',
 *     district: '海淀区'
 *   }
 * };
 * 
 * const clonedObj = deepClone(originalObj);
 * clonedObj.address.city = '上海'; // 修改克隆对象
 * 
 * console.log(originalObj.address.city); // 输出：北京 (原始对象不受影响)
 * console.log(clonedObj.address.city);  // 输出：上海
 * 
 * // 深拷贝数组
 * const originalArray = [1, 2, [3, 4]];
 * const clonedArray = deepClone(originalArray);
 * clonedArray[2][0] = 5;
 * 
 * console.log(originalArray[2][0]); // 输出：3 (原始数组不受影响)
 * console.log(clonedArray[2][0]);  // 输出：5
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  
  // 处理日期对象
  if (obj instanceof Date) return new Date(obj);
  
  // 处理正则表达式
  if (obj instanceof RegExp) return new RegExp(obj);
  
  // 处理数组和普通对象
  const clone = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}
