
/**
 * 实现apply
 * @param context
 * @returns {*}
 */
Function.prototype.apply2 = function(context = window) {
    context.fn = this;
    let result;
    // 判断是否有第二个参数
    if(arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn;
    return result
};
/**
 * 实现call
 * @param context
 * @returns {*}
 */
Function.prototype.call2 = function(context = window) {
    context.fn = this;
    let args = [...arguments].slice(1);
    let result = context.fn(...args);
    delete context.fn;
    return result;
};
/**
 * 实现bind
 * @param context
 * @param args
 * @returns {function(): *}
 */
Function.prototype.bind2 = function(context,...args){
    return ()=>this.call2(context,args)
}
let ff = 11;
let sb ={
    ff:22,
    num:function(){
        console.log(this.ff)
    }
}
let getB = sb.num;
getB();
let getC = getB.bind2(sb);
getC()

Function.prototype.bind2 = function(content) {
    if(typeof this != "function") {
        throw Error("not a function")
    }
    // 若没问参数类型则从这开始写
    let fn = this;
    let args = [...arguments].slice(1);

    let resFn = function() {
        return fn.apply(this instanceof resFn ? this : content,args.concat(...arguments) )
    }
    function tmp() {}
    tmp.prototype = this.prototype;
    resFn.prototype = new tmp();

    return resFn;
}
