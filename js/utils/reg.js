// 千分位格式化
// 在项目中经常碰到关于货币金额的页面显示，为了让金额的显示更为人性化与规范化，需要加入货币格式化策略。也就是所谓的数字千分位格式化。

// 123456789 => 123,456,789
// 123456789.123 => 123,456,789.123

const formatMoney = (money) => {
  return money.replace(new RegExp(`(?!^)(?=(\\d{3})+${money.includes('.') ? '\\.' : '$'})`, 'g'), ',')  
}

formatMoney('123456789') // '123,456,789'
formatMoney('123456789.123') // '123,456,789.123'
formatMoney('123') // '123'

/* 
解析链接参数
你一定常常遇到这样的需求，要拿到 url 的参数的值，像这样： */

// url <https://qianlongo.github.io/vue-demos/dist/index.html?name=fatfish&age=100#/home>

// const name = getQueryByName('name') // fatfish
// const age = getQueryByName('age') // 100
// 复制代码
// 通过正则，简单就能实现 getQueryByName 函数：
const getQueryByName = (name) => {
  const queryNameRegex = new RegExp(`[?&]${name}=([^&]*)(&|$)`)
  const queryNameMatch = window.location.search.match(queryNameRegex)
  // Generally, it will be decoded by decodeURIComponent
  return queryNameMatch ? decodeURIComponent(queryNameMatch[1]) : ''
}

const name = getQueryByName('name')
const age = getQueryByName('age')

console.log(name, age) // fatfish, 100


// 驼峰字符串

// JS 变量最佳是驼峰风格的写法，怎样将类似以下的其它声明风格写法转化为驼峰写法？
// 1. foo Bar => fooBar
// 2. foo-bar---- => fooBar
// 3. foo_bar__ => fooBar
// 复制代码
// 正则表达式分分钟教做人：
const camelCase = (string) => {
  const camelCaseRegex = /[-_\s]+(.)?/g
  return string.replace(camelCaseRegex, (match, char) => {
    return char ? char.toUpperCase() : ''
  })
}

console.log(camelCase('foo Bar')) // fooBar
console.log(camelCase('foo-bar--')) // fooBar
console.log(camelCase('foo_bar__')) // fooBar



// 小写转大写
// 这个需求常见，无需多言，用就完事儿啦：
const capitalize = (string) => {
  const capitalizeRegex = /(?:^|\s+)\w/g
  return string.toLowerCase().replace(capitalizeRegex, (match) => match.toUpperCase())
}

console.log(capitalize('hello world')) // Hello World
console.log(capitalize('hello WORLD')) // Hello World


// 实现 trim()
// trim() 方法用于删除字符串的头尾空白符，用正则可以模拟实现 trim：
const trim1 = (str) => {
  return str.replace(/^\s*|\s*$/g, '') // 或者 str.replace(/^\s*(.*?)\s*$/g, '$1')
}

const string = '   hello medium   '
const noSpaceString = 'hello medium'
const trimString = trim1(string)

console.log(string)
console.log(trimString, trimString === noSpaceString) // hello medium true
console.log(string)


// HTML 转义
// 防止 XSS 攻击的方法之一是进行 HTML 转义，符号对应的转义字符：
// 正则处理如下：
const escape = (string) => {
  const escapeMaps = {
    '&': 'amp',
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    "'": '#39'
  }
  // The effect here is the same as that of /[&amp;<> "']/g
  const escapeRegexp = new RegExp(`[${Object.keys(escapeMaps).join('')}]`, 'g')
  return string.replace(escapeRegexp, (match) => `&${escapeMaps[match]};`)
}

console.log(escape(`
  <div>
    <p>hello world</p>
  </div>
`))
/*
&lt;div&gt;
  &lt;p&gt;hello world&lt;/p&gt;
&lt;/div&gt;
*/


// HTML 反转义
// 有了正向的转义，就有反向的逆转义，操作如下：
const unescape = (string) => {
  const unescapeMaps = {
    'amp': '&',
    'lt': '<',
    'gt': '>',
    'quot': '"',
    '#39': "'"
  }
  const unescapeRegexp = /&([^;]+);/g
  return string.replace(unescapeRegexp, (match, unescapeKey) => {
    return unescapeMaps[ unescapeKey ] || match
  })
}

console.log(unescape(`
  &lt;div&gt;
    &lt;p&gt;hello world&lt;/p&gt;
  &lt;/div&gt;
`))
/*
<div>
  <p>hello world</p>
</div>
*/


// 校验 24 小时制
// 处理时间，经常要用到正则，比如常见的：校验时间格式是否是合法的 24 小时制：
const check24TimeRegexp = /^(?:(?:0?|1)\d|2[0-3]):(?:0?|[1-5])\d$/
console.log(check24TimeRegexp.test('01:14')) // true
console.log(check24TimeRegexp.test('23:59')) // true
console.log(check24TimeRegexp.test('23:60')) // false
console.log(check24TimeRegexp.test('1:14')) // true
// console.log(check24TimeRegexp.test('1:1')) // true


// 校验日期格式
// 常见的日期格式有：yyyy-mm-dd, yyyy.mm.dd, yyyy/mm/dd 这 3 种，如果有符号乱用的情况，比如2021.08/22，这样就不是合法的日期格式，我们可以通过正则来校验判断：
const checkDateRegexp = /^\d{4}([-\.\/])(?:0[1-9]|1[0-2])\1(?:0[1-9]|[12]\d|3[01])$/

console.log(checkDateRegexp.test('2021-08-22')) // true
console.log(checkDateRegexp.test('2021/08/22')) // true
console.log(checkDateRegexp.test('2021.08.22')) // true
console.log(checkDateRegexp.test('2021.08/22')) // false
console.log(checkDateRegexp.test('2021/08-22')) // false


// 匹配颜色值
// 在字符串内匹配出 16 进制的颜色值：
const matchColorRegex = /#(?:[\da-fA-F]{6}|[\da-fA-F]{3})/g
const colorString = '#12f3a1 #ffBabd #FFF #123 #586'

console.log(colorString.match(matchColorRegex))
// [ '#12f3a1', '#ffBabd', '#FFF', '#123', '#586' ]


// 判断 HTTPS/HTTP
// 这个需求也是很常见的，判断请求协议是否是 HTTPS/HTTP
const checkProtocol = /^https?:/

console.log(checkProtocol.test('https://medium.com/')) // true
console.log(checkProtocol.test('http://medium.com/')) // true
console.log(checkProtocol.test('//medium.com/')) // false


// 校验版本号
// 版本号必须采用 x.y.z 格式，其中 XYZ 至少为一位，我们可以用正则来校验：
// x.y.z
const versionRegexp = /^(?:\d+\.){2}\d+$/

console.log(versionRegexp.test('1.1.1'))
console.log(versionRegexp.test('1.000.1'))
console.log(versionRegexp.test('1.000.1.1'))


// 获取网页 img 地址
// 这个需求可能爬虫用的比较多，用正则获取当前网页所有图片的地址。在控制台打印试试，太好用了~~
const matchImgs = (sHtml) => {
  const imgUrlRegex = /<img[^>]+src="((?:https?:)?\/\/[^"]+)"[^>]*?>/gi
  let matchImgUrls = []
  
  sHtml.replace(imgUrlRegex, (match, $1) => {
    $1 && matchImgUrls.push($1)
  })
  return matchImgUrls
}

console.log(matchImgs(document.body.innerHTML))



// 格式化电话号码
// 这个需求也是常见的一匹，用就完事了：
let mobile = '18379836654' 
let mobileReg = /(?=(\d{4})+$)/g 

console.log(mobile.replace(mobileReg, '-')) // 183-7983-6654



// 测试正则表达式
// 使用该.test()方法
let testString = "My test string";
let testRegex = /string/;
testRegex.test(testString);

// 测试多项匹配
// 使用OR运算符（|）
const regex = /yes|no|maybe/;


// 忽略大小写

// 使用i标志不区分大小写

const caseInsensitiveRegex = /ignore case/i;
const testString = 'We use the i flag to iGnOrE CasE';
caseInsensitiveRegex.test(testString); // true


// 将第一个匹配提取到变量
// 使用该.match()功能
const match = "Hello World!".match(/hello/i); // "Hello"


// 提取数组中的所有匹配项

// 使用g标志

const testString = "Repeat repeat rePeAT";
const regexWithAllMatches = /Repeat/gi;
testString.match(regexWithAllMatches); // ["Repeat", "repeat", "rePeAT"]

