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


