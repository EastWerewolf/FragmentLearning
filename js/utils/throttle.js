/**
 * 节流
 * @param {*} fn 将执行的函数
 * @param {*} time 节流规定的时间
 */
function throttle(fn, time) {
    let timer = null
    return (...args) => {
        // 若timer === false，则执行，并在指定时间后将timer重制
        if(!timer){
            fn.apply(this, args)

            timer = setTimeout(() => {
                timer = null
            }, time)
        }
    }
}

function debounce(fn, time) {
    let timer = null

    return (...args) => {
        // 重新执行并停止上次执行（若上次还未执行则会被清除）
        if(timer){
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            timer = null
            fn.apply(this, args)
        }, time)
    }
}
function New(func) {
    var res = {};
    if (func.prototype !== null) {
        res.__proto__ = func.prototype;
    }
    var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
    if ((typeof ret === "object" || typeof ret === "function") && ret !== null) {
        return ret;
    }
    return res;
}
var obj = New(A, 1, 2);
// equals to
var obj = new A(1, 2);

