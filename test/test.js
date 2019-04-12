
function red(){
    console.log('red')
}
function yellow(){
    console.log('yellow')
}
function green(){
    console.log('green')
}
const next = function *arr(){
    yield {count:3,fun:red};
    yield {count:2,fun:yellow};
    yield {count:1,fun:green};
    yield* arr()
};
const array = next();
(function loop(array){
    const {count,fun} = array.next().value;
    console.log(`${count} seconds later`);
    const timer = setTimeout(()=>{
        fun&&fun();
        clearTimeout(timer);
        loop(array)
    },count*1000)
})(array);
// loop(array)

// setInterval(()=>{
//     console.log(array.next())
// },1000)












