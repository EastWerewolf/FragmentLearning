function Father(name){
    this.name = name;
}
Father.prototype.sayName= function(){
    console.log(this.name)
}
function Son(age){
    this.age = age
}
Son.prototype = new Father('father')
let s = new Son(11);
s.sayName();

function Animal(name) {
    this.name = name
    this.colors = ['black', 'white']
}
function Animal(name) {
    this.name = name
    this.getName = function() {
        return this.name
    }
}
function Dog(name) {
    Animal.call(this, name)
}
// 寄生式组合继承
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}
function inheritPrototype(child, parent) {
    let prototype = object(parent.prototype)
    prototype.constructor = child
    child.prototype = prototype
}
inheritPrototype(Dog, Animal)
