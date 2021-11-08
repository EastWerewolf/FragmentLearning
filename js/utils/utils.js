/**
 * 输出arr最大值最小值
 * @param arr
 * @returns {{min: number, max: number}}
 */
function maxAndMin(arr){
    return {
        max:Math.max.apply(null,arr),
        min:Math.min.apply(null,arr)
    }
}

/**
 * 判断数组是否相同
 * @param array1
 * @param array2
 * @returns {boolean}
 */
export function scalarArrayEquals(array1, array2) {
    return array1.length === array2.length && array1.every(function(v, i) { return v ===array2[i]})
}

/**
 *  输出数组
 * @param value
 * @returns {*}
 */
const castArray = (value) => (Array.isArray(value) ? value : [value]);
/**
 * Check if an array is empty  检查数组是否为空
 * @param arr
 * @returns {boolean}
 */
const isEmpty = (arr) => !Array.isArray(arr) || arr.length === 0;
/**
 * Compare two arrays regardless of order 比较两个数字是否相同
 * @param a
 * @param b
 * @returns {boolean}
 */
// `a` and `b` are arrays
const isEqual = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort());
/**
 * Count the occurrences of a value in an array // 计算一个值在数组中出现的次数
 * @param arr
 * @param val
 * @returns {*}
 */
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
/**
 * Calculate the number of difference days between two dates 计算两个日期的差值
 * @param date
 * @param otherDate
 * @returns {number}
 */
const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
/**
 * Calculate the number of months between two dates 计算两个日期的月份差值
 * @param startDate
 * @param endDate
 * @returns {number}
 */

const monthDiff = (startDate, endDate) => Math.max(0, (endDate.getFullYear() - startDate.getFullYear()) * 12 - startDate.getMonth() + endDate.getMonth());
/**
 * Convert a date to YYYY-MM-DD format 时间格式化
 * @param date
 * @returns {string}
 */
const formatYmd = (date) => date.toISOString().slice(0, 10);
