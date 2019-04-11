/**
 * 实现new
 * @param origin
 * @param args
 * @returns {*}
 */
// new操作符做了这些事：
// 它创建了一个全新的对象。
// 它会被执行[[Prototype]]（也就是__proto__）链接。
// 它使this指向新创建的对象。。
// 通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
// 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回该对象引用
function New(origin,...args){
    const obj = {};
    Object.setPrototypeOf(obj,origin.prototype);
    const result = origin.apply(obj,args)
    return result instanceof Object ? result :obj;
}
function Test(name,age){
    this.name = name;
    // return {age}
}
Test.prototype.sayName = function(){
    console.log(this.name)
}
const a = New(Test,'abc',11);
const b = new Test('aaa',222);
b.sayName();
console.log(a,b);
