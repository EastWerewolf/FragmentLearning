function curry(fn){
    let parmas = []
    return function sum(...args){
        if(args.length){//判断是否有参数
            parmas = [...parmas,...args]
            return sum
        }
        return fn(parmas)
    }
}
function add(arr){
    return arr.reduce((acc,item)=>{
        return acc+item
    })
}

let curried = curry(add)
console.log(curried(1)(2)(3)(4)(10,20)())//40
// 注意最后的调用用方式，()调用不传递参数，会跳出判断，调用累加函数

//在方法内部定义一个tostring方法，返回计算的值
function curry(...args){
    let parmas = args
    function sum(){
        parmas = [...parmas,...arguments]
        return  sum
    }
    sum.toString=function(){
        return parmas.reduce((acc,item)=>{
            return acc+item
        })
    }
    return sum
}
console.log(curry(1)(2)(3)(10)(10,20).toString()) // 40

function currying(func) {
    const args = [];
    return function result(...rest) {
        if (rest.length === 0)
            return func(...args);

        args.push(...rest);
        return result;
    }
}
