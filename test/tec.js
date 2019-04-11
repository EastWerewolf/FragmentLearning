// var currying = function(fn) {
//     // fn 指官员消化老婆的手段
//     var args = [].slice.call(arguments, 1);
//     // args 指的是那个合法老婆
//     return function() {
//         // 已经有的老婆和新搞定的老婆们合成一体，方便控制
//         var newArgs = args.concat([].slice.call(arguments));
//         // 这些老婆们用 fn 这个手段消化利用，完成韦小宝前辈的壮举并返回
//         return fn.apply(null, newArgs);
//     };
// };
//
// // 下为官员如何搞定7个老婆的测试
// // 获得合法老婆
// var getWife = currying(function() {
//     var allWife = [].slice.call(arguments);
//     // allwife 就是所有的老婆的，包括暗渡陈仓进来的老婆
//     console.log(allWife.join(";"));
// }, "合法老婆");
//
// // 获得其他6个老婆
// getWife("大老婆","小老婆","俏老婆","刁蛮老婆","乖老婆","送上门老婆");
//
// // 换一批老婆
// getWife("超越韦小宝的老婆");
// let num = 1
// function ccc(x){
//     x = x+1
// }
// ccc(num);
// console.log(num)
// let obj = {};
// obj.a = 1;
// function ddd(obj){
//     obj.a = obj.a+1
// }
// ddd(obj)
// console.log(obj.a)
function tryToAddPrivate(obj) {
    obj[Symbol('Pseudo Private')] = 42;
}

const obj = { prop: 'hello' };
tryToAddPrivate(obj);

console.log(Reflect.ownKeys(obj));

console.log(obj[Reflect.ownKeys(obj)[1]]); // 42
function useState(x=null){
    function changeState(newState){
        x = newState
        console.log(x)
    }
    return [x,changeState]
}
const [c,d] = useState(1)
console.log(c,d)
d(22)
console.log(c)













