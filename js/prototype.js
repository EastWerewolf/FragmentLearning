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
