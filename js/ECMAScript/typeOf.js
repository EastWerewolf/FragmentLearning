function typeOf(obj) {
    // let res = Object.prototype.toString.call(obj).split(' ')[1]
    // res = res.substring(0, res.length - 1).toLowerCase()
    // return res
    // 更好的写法
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
