/**
 * 数字转换千分位金额数字
 * @param v 要转换的数字
 * @param len 保留几位小数
 * @param split 千分位符号
 * @returns {string}
 */
export function formatMoney(v, len, split) {
    split = split || ','
    len = Math.abs(+len % 20 || 2)
    v = parseFloat((v + '').replace(/[^\d\.-]/g, '')).toFixed(len) + ''
    return v.replace(/\d+/, function(v) {
        var lit = v.length % 3 === 0
        var index = lit ? v.length - 3 : -1
        return v
            .split('')
            .reverse()
            .join('')
            .replace(/\d{3}/g, function(k, l) {
                return k + (l === index && lit ? '' : split)
            })
            .split('')
            .reverse()
            .join('')
    })
}
