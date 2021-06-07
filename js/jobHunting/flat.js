// 方案 1
function recursionFlat(ary = []) {
    const res = []
    ary.forEach(item => {
        if (Array.isArray(item)) {
            res.push(...recursionFlat(item))
        } else {
            res.push(item)
        }
    })
    return res
}
// 方案 2
function reduceFlat(ary = []) {
    return ary.reduce((res, item) => res.concat(Array.isArray(item) ? reduceFlat(item) : item), [])
}

// 测试
const source = [1, 2, [3, 4, [5, 6]], '7']
console.log(recursionFlat(source))
console.log(reduceFlat(source))

function objectFlat(obj = {}) {
    const res = {}
    function flat(item, preKey = '') {
        Object.entries(item).forEach(([key, val]) => {
            const newKey = preKey ? `${preKey}.${key}` : key
            if (val && typeof val === 'object') {
                flat(val, newKey)
            } else {
                res[newKey] = val
            }
        })
    }
    flat(obj)
    return res
}

// 测试
const source1 = { a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } }
console.log(objectFlat(source1));
