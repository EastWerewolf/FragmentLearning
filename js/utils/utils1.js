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


// 3. 合并两个数组
// 可以使用下面两个方法来合并两个数组：

const merge = (a, b) => a.concat(b);

const merge = (a, b) => [...a, ...b];


// . 判断一个数是奇数还是偶数
// 该方法用于判断一个数字是奇数还是偶数：

const isEven = num => num % 2 === 0;

isEven(996); 

// 2. 获得一组数的平均值
const average = (...args) => args.reduce((a, b) => a + b) / args.length;

average(1, 2, 3, 4, 5);   // 3


// 3. 获取两个整数之间的随机整数
// 该方法用于获取两个整数之间的随机整数
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

random(1, 50);


// 指定位数四舍五入
// 该方法用于将一个数字按照指定位进行四舍五入：
const round = (n, d) => Number(Math.round(n + "e" + d) + "e-" + d)

round(1.005, 2) //1.01
round(1.555, 2) //1.56


// 将RGB转化为十六机制
// 该方法可以将一个RGB的颜色值转化为16进制值：
const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

rgbToHex(255, 255, 255);  // '#ffffff'


// . 获取随机十六进制颜色
// 该方法用于获取一个随机的十六进制颜色值：
const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;

randomHex();


// 1. 复制内容到剪切板
// 该方法使用 navigator.clipboard.writeText 来实现将文本复制到剪贴板：
const copyToClipboard = (text) => navigator.clipboard.writeText(text);

copyToClipboard("Hello World");


// 2. 清除所有cookie
// 该方法可以通过使用 document.cookie 来访问 cookie 并清除存储在网页中的所有 cookie：
const clearCookies = document.cookie.split(';').forEach(cookie => document.cookie = cookie.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`))


// 获取选中的文本
// 该方法通过内置的 getSelection 属性获取用户选择的文本：

const getSelectedText = () => window.getSelection().toString();

getSelectedText();


// 4. 检测是否是黑暗模式
// 该方法用于检测当前的环境是否是黑暗模式，它是一个布尔值：
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

console.log(isDarkMode)


// . 滚动到页面顶部
// 该方法用于在页面中返回顶部：

const goToTop = () => window.scrollTo(0, 0);

goToTop();

// 判断当前标签页是否激活
// 该方法用于检测当前标签页是否已经激活：

const isTabInView = () => !document.hidden; 


// 7. 判断当前是否是苹果设备
// 该方法用于检测当前的设备是否是苹果的设备：
const isAppleDevice = () => /Mac|iPod|iPhone|iPad/.test(navigator.platform);

isAppleDevice();


// . 是否滚动到页面底部
// 该方法用于判断页面是否已经底部：
const scrolledToBottom = () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight;


// . 重定向到一个URL
// 该方法用于重定向到一个新的URL：

const redirect = url => location.href = url

redirect("https://www.google.com/")


// 打开浏览器打印框
// 该方法用于打开浏览器的打印框：

const showPrintDialog = () => window.print()


// . 随机布尔值
// 该方法可以返回一个随机的布尔值，使用Math.random()可以获得0-1的随机数，与0.5进行比较，就有一半的概率获得真值或者假值。
const randomBoolean = () => Math.random() >= 0.5;

randomBoolean();


// . 变量交换
// 可以使用以下形式在不适用第三个变量的情况下，交换两个变量的值：

[foo, bar] = [bar, foo];


// 3. 获取变量的类型
// 该方法用于获取一个变量的类型：
const trueTypeOf = (obj) => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

trueTypeOf('');     // string
trueTypeOf(0);      // number
trueTypeOf();       // undefined
trueTypeOf(null);   // null
trueTypeOf({});     // object
trueTypeOf([]);     // array
trueTypeOf(0);      // number
trueTypeOf(() => {});  // function


// 5. 检测对象是否为空
// 该方法用于检测一个JavaScript对象是否为空：

const isEmpty = obj => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;


// `date` is a Date object
const isWeekday = (date = new Date()) => date.getDay() % 6 !== 0;

//Check if a string contains upper case characters
const containsUpperCase = (str) => str !== str.toLowerCase();

// Check if a path is relative
const isRelative = (path) => !/^([a-z]+:)?[\\/]/i.test(path);

// Check if a string is a palindrome
const isPalindrome = (str) => str === str.split('').reverse().join('');

// Check if a URL is absolute
const isAbsoluteUrl = (url) => /^[a-z][a-z0-9+.-]*:/.test(url);

// Check if two strings are anagram
const areAnagram = (str1, str2) => str1.toLowerCase().split('').sort().join('') === str2.toLowerCase().split('').sort().join('');

// Convert a base64 encoded string to an uint8 array
const base64ToUint8 = (str) => Uint8Array.from(atob(str), (c) => c.charCodeAt(0));

// Check if a string consists of a repeated character sequence
const consistsRepeatedSubstring = (str) => `${str}${str}`.indexOf(str, 1) !== str.length;

// Convert a string to camelCase
const toCamelCase = (str) => str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));

// Convert a letter to associate emoji
const letterToEmoji = (c) => String.fromCodePoint(c.toLowerCase().charCodeAt(0) + 127365);

// Convert a string to PascalCase
const toPascalCase = (str) => (str.match(/[a-zA-Z0-9]+/g) || []).map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');

// Convert a string to URL slug
const slugify = (str) =>
    str
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');
slugify('Chapter One: Once upon a time...'); // 'chapter-one-once-upon-a-time'      



// Convert a Windows file path to Unix path
const toUnixPath = (path) => path.replace(/[\\/]+/g, '/').replace(/^([a-zA-Z]+:|\.\/)/, '');

toUnixPath('./foo/bar/baz'); // foo/bar/baz
toUnixPath('C:\\foo\\bar\\baz'); // /foo/bar/baz



// Convert an uint8 array to a base64 encoded string
const uint8ToBase64 = (arr) =>
    btoa(
        Array(arr.length)
            .fill('')
            .map((_, i) => String.fromCharCode(arr[i]))
            .join('')
    );

// For Node.js
const uint8ToBase64 = (arr) => Buffer.from(arr).toString('base64');


// Convert camelCase to kebab-case and vice versa
const kebabToCamel = (str) => str.replace(/-./g, (m) => m.toUpperCase()[1]);

const camelToKebab = (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();


kebabToCamel('background-color'); // 'backgroundColor'
camelToKebab('backgroundColor'); // 'background-color'



// Convert snake_case to camelCase
const snakeToCamel = (str) => str.toLowerCase().replace(/(_\w)/g, (m) => m.toUpperCase().substr(1));

// Convert the name of an Excel column to number
const getIndex = (col) => col.split('').reduce((prev, next) => prev * 26 + parseInt(next, 36) - 9, 0);

// Count the number of words in a string
const countWords = (str) => str.trim().split(/\s+/).length;


// Count the occurrences of a character in a string

const countOccurrences = (str, char) => [...str].reduce((a, v) => (v === char ? a + 1 : a), 0);

// Or
const countOccurrences = (str, char) => str.split('').reduce((a, v) => (v === char ? a + 1 : a), 0);

// Or
const countOccurrences = (str, char) => [...str].filter((item) => item === char).length;

// Or
const countOccurrences = (str, char) => str.split('').filter((item) => item === char).length;

countOccurrences('a.b.c.d.e', '.'); // 4

// Decapitalize a string

const decapitalize = (str) => `${str.charAt(0).toLowerCase()}${str.slice(1)}`;

// Or
const decapitalize = ([first, ...rest]) => `${first.toLowerCase()}${rest.join('')}`;



// Decode HTML entities
const decodeHtmlEntities = (str) => str.replace(/&#(\w+)(^\w|;)?/g, (_, dec) => String.fromCharCode(dec));



// Escape HTML special characters
const escape = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');

// Or
const escape = (str) => str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));

// Generate a hash of a string

const hash = (str) => str.split('').reduce((prev, curr) => (Math.imul(31, prev) + curr.charCodeAt(0)) | 0, 0);

// Or
const hash = (str) => str.split('').reduce((prev, curr) => ((prev << 5) - prev + curr.charCodeAt(0)) | 0, 0);



// Get the base URL without any parameters

const baseUrl = (url) => (url.indexOf('?') === -1 ? url : url.slice(0, url.indexOf('?')));

// Or
// Note that `includes` isn't supported in IE 11
const baseUrl = (url) => (url.includes('?') ? url.slice(0, url.indexOf('?')) : url);

// Or
const baseUrl = (url) => url.split('?')[0];



//  Format a string             

const format = (str, ...vals) => vals.reduce((s, v, i) => s.replace(new RegExp('\\{' + i + '\\}', 'g'), v), str);

const template = 'My name is {0} and I am {1} years old';

format(template, 'John', 30);
// My name is John and I am 30 years old

format(template, 'Jane', 20);
// My name is Jane and I am 20 years old


// Get the file extension from a file name

const ext = (fileName) => fileName.split('.').pop();



// Get the file name from a URL

const fileName = (url: string): string => url.substring(url.lastIndexOf('/') + 1);


// Get the length of a string in bytes

const bytes = (str) => new Blob([str]).size;



// Get the number of a character in a string

const characterCount = (str, char) => str.split(char).length - 1;

// Or
const characterCount = (str, char) => str.replace(new RegExp(String.raw`[^${char}]`, 'g'), '').length;



//Make the first character of a string lowercase
const lowercaseFirst = (str) => `${str.charAt(0).toLowerCase()}${str.slice(1)}`;


// Normalize file path slashes
const normalizePath = (path) => path.replace(/[\\/]+/g, '/');


// Prepend a line number to each line of a text document


const prependNumbers = (str) =>
    str
        .split(/\r?\n/)
        .map((line, i) => `${(i + 1).toString().padStart(2, ' ')} ${line}`)
        .join('\n');


prependNumbers(`one
two
three
four`);

/* Output */
/*
1 one
2 two
3 three
4 four
*/


// Remove duplicate lines of a text document


const removeDuplicateLines = (str) => Array.from(new Set(str.split(/\r?\n/))).join('\n');



// Remove spaces from a string
const removeSpaces = (str) => str.replace(/\s/g, '');


// Remove empty lines of a text document

const removeEmptyLines = (str) =>
    str
        .split(/\r?\n/)
        .filter((line) => line.trim() !== '')
        .join('\n');

// Repeat a string

const repeat = (str, numberOfTimes) => str.repeat(numberOfTimes);

// Or
const repeat = (str, numberOfTimes) => Array(numberOfTimes + 1).join(str);



// Replace all line breaks with br elements

const nl2br = (str) => str.replace(new RegExp('\r?\n', 'g'), '<br>');

// In React
str.split('\n').map((item, index) => (
    <React.Fragment key={index}>
        {item}
        <br />
    </React.Fragment>
));


// Replace multiple spaces with a single space


// Replace spaces, tabs and new line characters
const replaceSpaces = (str) => str.replace(/\s\s+/g, ' ');

// Only replace spaces
const replaceOnlySpaces = (str) => str.replace(/  +/g, ' ');


// Replace the first given number of characters of a string with another character


const mask = (str, num, mask) => `${str}`.slice(num).padStart(`${str}`.length, mask);

// Replace all tab characters with spaces

const replace = (str, numSpaces = 4) => str.replaceAll('\t', ' '.repeat(numSpaces));


// Reverse the order of lines of a text

const reverseLines = (str) => str.split(/\r?\n/).reverse().join('\n');


// Reverse a string

const reverse = (str) => str.split('').reverse().join('');

// Or
const reverse = (str) => [...str].reverse().join('');

// Or
const reverse = (str) => str.split('').reduce((rev, char) => `${char}${rev}`, '');

// Or
const reverse = (str) => (str === '' ? '' : `${reverse(str.substr(1))}${str.charAt(0)}`);

// Sort lines of a text document in the alphabetical order

const sortLines = (str) => str.split(/\r?\n/).sort().join('\n');

// Reverse the order
const reverseSortedLines = (str) => str.split(/\r?\n/).sort().reverse().join('\n');


// Sort the characters of a string in the alphabetical order

const sort = (str) =>
    str
        .split('')
        .sort((a, b) => a.localeCompare(b))
        .join('');


//Swap case of characters in a string
const swapCase = (str) =>
str
.split('')
.map((c) => (c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase()))
.join('');


// Trim slashes at the beginning and the end of a string

const trimSlashes = (str) => str.replace(/^\/+|\/+$/g, '');

// Or
const trimSlashes = (str) => str.split('/').filter(Boolean).join('/')

// Trim some character

const trim = (str, char) => str.split(char).filter(Boolean).join();

// Strip ANSI codes from a string

const stripAnsiCodes = (str) => str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');


stripAnsiCodes('\u001B[4mcake\u001B[0m'); // 'cake'
stripAnsiCodes('\u001B[0m\u001B[4m\u001B[42m\u001B[31mfoo\u001B[39m\u001B[49m\u001B[24mfoo\u001B[0m'); // 'foofoo'


// Truncate a string at full words

const truncate = (str, max, suffix) => (str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`);


truncate('This is a long message', 20, '...'); // 'This is a long...'


// Trim the file extension from a file name

const trimExt = (fileName) => (fileName.indexOf('.') === -1 ? fileName : fileName.split('.').slice(0, -1).join('.'));


// 

const unescape = (str) =>
    str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#0*39;/g, "'")
        .replace(/&quot;/g, '"');




// Uppercase the first character of each word in a string

const uppercaseWords = (str) =>
    str
        .split(' ')
        .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
        .join(' ');

// Or
const uppercaseWords = (str) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());


// Check if a date is a weekend

// `date` is a Date object
const isWeekend = (date = new Date()) => date.getDay() % 6 === 0;



// Check if a character is a digit

const isDigit = (char) => char < 10;

// Or
const isDigit = (char) => char.length === 1 && c >= '0' && c <= '9';

// Or
const isDigit = (char) => Boolean([true, true, true, true, true, true, true, true, true, true][char]);




// Check if a date is between two dates


// `min`, `max` and `date` are `Date` instances
const isBetween = (date, min, max) => date.getTime() >= min.getTime() && date.getTime() <= max.getTime();


// Check if a date is today

// `date` is a Date object
const isToday = (date) => date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);