// 1. 检查日期是否有效
// 该方法用于检测给出的日期是否有效：
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

isDateValid("December 17, 1995 03:24:00");  // true


// 2. 计算两个日期之间的间隔
// 该方法用于计算两个日期之间的间隔时间：
const dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)
    
dayDif(new Date("2021-11-3"), new Date("2022-2-1"))  // 90


// 3. 查找日期位于一年中的第几天
// 该方法用于检测给出的日期位于今年的第几天：
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

dayOfYear(new Date());   // 307


// 4. 时间格式化
// 该方法可以用于将时间转化为hour:minutes:seconds的格式：
const timeFromDate = date => date.toTimeString().slice(0, 8);
    
timeFromDate(new Date(2021, 11, 2, 12, 30, 0));  // 12:30:00
timeFromDate(new Date());  // 返回当前时间 09:00:00


// 1. 字符串首字母大写
// 该方法用于将英文字符串的首字母大写处理：
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

capitalize("hello world")  // Hello world


// 2. 翻转字符串
// 该方法用于将一个字符串进行翻转操作，返回翻转后的字符串：
const reverse = str => str.split('').reverse().join('');

reverse('hello world');   // 'dlrow olleh'


// 3. 随机字符串
// 该方法用于生成一个随机的字符串：

const randomString = () => Math.random().toString(36).slice(2);

randomString();


// 4. 截断字符串
// 该方法可以从指定长度处截断字符串:
const truncateString = (string, length) => string.length < length ? string : `${string.slice(0, length - 3)}...`;

truncateString('Hi, I should be truncated because I am too loooong!', 36)   // 'Hi, I should be truncated because



// 5. 去除字符串中的HTML
// 该方法用于去除字符串中的HTML元素：
const stripHtml = html => (new DOMParser().parseFromString(html, 'text/html')).body.textContent || '';


// 1. 从数组中移除重复项
// 该方法用于移除数组中的重复项：
const removeDuplicates = (arr) => [...new Set(arr)];

console.log(removeDuplicates([1, 2, 2, 3, 3, 4, 4, 5, 5, 6]));

// 2. 判断数组是否为空
// 该方法用于判断一个数组是否为空数组，它将返回一个布尔值：
const isNotEmpty = arr => Array.isArray(arr) && arr.length > 0;

isNotEmpty([1, 2, 3]);  // true
