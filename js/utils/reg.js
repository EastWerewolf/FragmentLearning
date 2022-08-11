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