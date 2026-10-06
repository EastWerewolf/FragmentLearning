/**
 * 字符串压缩：相邻重复字符合并，只出现 1 次的不写数字 ////////////////
 * aabcccccaaa -> a2bc5a3
 * 用 [...str] 而不是 str[i] 取值，避免把 emoji 之类的代理对拆成两半
 */
export const compress = (str) => {
  if (typeof str !== 'string') return ''
  const chars = [...str]
  let ret = ''
  let count = 1
  for (let i = 1; i <= chars.length; i++) {
    // i 取到 chars.length 时 chars[i] 是 undefined，正好把最后一段游程收尾
    if (chars[i] === chars[i - 1]) {
      count++
    } else {
      ret += count === 1 ? chars[i - 1] : `${chars[i - 1]}${count}`
      count = 1
    }
  }
  return ret
}

/**
 * 统计每个字符出现的总次数，不相邻的也会累加
 * aabcccccaaa -> Map { a => 5, b => 1, c => 5 }
 */
export const countChars = (str) => {
  if (typeof str !== 'string') return new Map()
  return [...str].reduce((map, char) => map.set(char, (map.get(char) || 0) + 1), new Map())
}
