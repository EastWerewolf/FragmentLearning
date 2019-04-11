function newK(origin,...args){
    const obj = {};
    Object.setPrototypeOf(obj,origin.prototype);
    const result = origin.apply(obj,args)
    return result instanceof Object ? result :obj;
}
function test(name,age){
    this.name = name;
    this.age = age;
}
test.prototype.sayName = function(){
    console.log(this.name)
}
const a = newK(test,'abc',11);
const b = new test('aaa',222);
a.sayName();
console.log(a.age,a,b);