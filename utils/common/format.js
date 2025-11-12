/**
 * 格式化相关函数
 * 包含日期格式化等功能
 * 
 * @module format
 */

/**
 * 格式化日期 - 将日期对象转换为指定格式的字符串
 * 支持年、月、日、时、分、秒、毫秒、季度等的格式化
 * 
 * @param {Date|String|Number} date - 日期对象、日期字符串或时间戳
 * @param {String} fmt - 格式化模式，例如：'yyyy-MM-dd hh:mm:ss'
 * @returns {String} - 格式化后的日期字符串
 * 
 * @example
 * // 格式化当前日期
 * const now = new Date();
 * const formattedDate = formatDate(now, 'yyyy-MM-dd hh:mm:ss');
 * console.log(formattedDate); // 输出如：2025-04-17 16:30:45
 * 
 * // 格式化时间戳
 * const timestamp = Date.now();
 * const dateStr = formatDate(timestamp, 'yyyy年MM月dd日');
 * console.log(dateStr); // 输出如：2025年04月17日
 * 
 * // 格式化日期字符串
 * const dateStr = formatDate('2025/04/17', 'yyyy-MM-dd');
 * console.log(dateStr); // 输出：2025-04-17
 */
export function formatDate(date, fmt) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}
