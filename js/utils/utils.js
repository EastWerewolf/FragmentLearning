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
/**
 * Convert seconds to hh:mm:ss format 时间格式化
 * @param s
 * @returns {string}
 */
const formatSeconds = (s) => new Date(s * 1000).toISOString().substr(11, 8);
/**
 * Get the day of the year from a date 获取日期在一年中的第几天
 * @param date
 * @returns {number}
 */
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
/**
 * Get the month name of a date 获取当前月份名称
 * @param date
 * @returns {string}
 */
const getMonthName = (date) => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', ' November', 'December'][date.getMonth()];
/**
 * Get the weekday of a date 获取当前星期名称
 * @param date
 * @returns {string}
 */
const getWeekday = (date) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
/**
 * Check if an element is a descendant of another 检查一个元素是否在另一个元素之内
 * @param child
 * @param parent
 * @returns {boolean}
 */
const isDescendant = (child, parent) => parent.contains(child);
/**
 *  Check if an element is focused 交检查元素是否聚焦
 * @param ele
 * @returns {boolean}
 */
const hasFocus = (ele) => ele === document.activeElement;
/**
 * Check if user scrolls to the bottom of the page 检查用户是否滚动到底部
 * @returns {boolean}
 */
const isAtBottom = () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight;
/**
 * Get the selected text 获取选中的文字
 * @returns {string}
 */
const getSelectedText = () => window.getSelection().toString();
/**
 * Check if a value is a generator function
 * @param v
 * @returns {boolean}
 */
const isGeneratorFunction = (v) => Object.prototype.toString.call(v) === '[object GeneratorFunction]';
/**
 * Check if a value is an async function
 * @param v
 * @returns {boolean}
 */
const isAsyncFunction = (v) => Object.prototype.toString.call(v) === '[object AsyncFunction]';

/**
 * Box handler
 * @param x
 * @returns {any}
 */
const boxHandler = (x) => ({ next: (f) => boxHandler(f(x)), done: (f) => f(x) });
// First example
const getPercentNumber = (str) =>
    boxHandler(str)
        .next((str) => str.replace(/\%/, ''))
        .next((str) => parseFloat(str))
        .done((res) => res * 0.01);
getPercentNumber('50%'); // 0.5
// example
const getMoney = (price) => Number.parseFloat(price.replace(/\$/, ''));
const getPercent = (percent) => Number.parseFloat(percent.replace(/\%/)) * 0.01;

const getDiscountPrice = (price, discount) =>
    boxHandler(getMoney(price))
        .done((cents) => boxHandler(getPercent(discount)).next((save) => cents - cents * save))
        .done((res) => res);

getDiscountPrice('$6.00', '20%'); // 4.8
/**
 * Check if a value is a function
 * @param v
 * @returns {boolean}
 */
const isFunction = (v) => ['[object Function]', '[object GeneratorFunction]', '[object AsyncFunction]', '[object Promise]'].includes(Object.prototype.toString.call(v));
/**
 * Execute a function once
 * @param fn
 * @returns {function(): *}
 */
const once = (fn) => ((ran = false) => () => ran ? fn : ((ran = !ran), (fn = fn())))();
/**
 * Memoize a function
 * @param fn
 * @returns {function(*=): *}
 */
const memoize = (fn) =>
    (
        (cache = Object.create(null)) =>
            (arg) =>
                cache[arg] || (cache[arg] = fn(arg))
    )();
/**
 * Clear all cookies
 */
const clearCookies = () => document.cookie.split(';').forEach((c) => (document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)));

const uppercaseWords = (str) =>
    str
        .split(' ')
        .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
        .join(' ');

// Or
const uppercaseWords = (str) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

/**
 * Generate a random hex color
 * @returns {string}
 */
const randomColor = () => `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;

/**
 * Check if an object is empty
 * @param obj
 * @returns {boolean|boolean}
 */
const isEmpty = (obj) => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
// Or for enumerable property names only
const isEmpty = (obj) => JSON.stringify(obj) === '{}';

/**
 * Check if an array contains a value matching some criterias
 * @param arr
 * @param criteria
 * @returns {boolean}
 */
const contains = (arr, criteria) => arr.some((v) => criteria(v));
// Or
const contains = (arr, criteria) => arr.some(criteria);
// Or
const contains = (arr, criteria) => arr.filter(criteria).length > 0;
// example
contains([10, 20, 30], (v) => v > 25); // true
contains([10, 20, 30], (v) => v > 100 || v < 15); // true
contains([10, 20, 30], (v) => v > 100); // false

/**
 * Check if a year is leap year
 * @param year
 * @returns {boolean}
 */
const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
// Or
// Get the number of days in February
const isLeapYear = (year) => new Date(year, 1, 29).getDate() === 29;

/**
 * Check if a value is base64 encoded
 * @param value
 * @returns {boolean}
 */
const isBase64 = (value) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);

/**
 * Check if a value is an object
 * @param v
 * @returns {boolean|boolean}
 */
const isObject = (v) => v !== null && typeof v === 'object';

/**
 * 获取链接c参数
 * @param {*} url 
 * @returns 
 */

const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
    ),
    {}
  );
getURLParameters('google.com'); // {}
getURLParameters('http://url.com/page?name=Adam&surname=Smith');