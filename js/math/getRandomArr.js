/**
 * 用于验证 shuffle 方法是否完全随机
 */
function test_shuffle(shuffleFn) {
    // 多次乱序数组的次数
    let n = 100000;
    // 保存每个元素在每个位置上出现的次数
    let countObj = {
        a:Array.from({length:10}).fill(0),
        b:Array.from({length:10}).fill(0),
        c:Array.from({length:10}).fill(0),
        d:Array.from({length:10}).fill(0),
        e:Array.from({length:10}).fill(0),
        f:Array.from({length:10}).fill(0),
        g:Array.from({length:10}).fill(0),
        h:Array.from({length:10}).fill(0),
        i:Array.from({length:10}).fill(0),
        j:Array.from({length:10}).fill(0),
    }
    for (let i = 0; i < n; i ++) {
        let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        shuffleFn(arr);
        countObj.a[arr.indexOf('a')]++;
        countObj.b[arr.indexOf('b')]++;
        countObj.c[arr.indexOf('c')]++;
        countObj.d[arr.indexOf('d')]++;
        countObj.e[arr.indexOf('e')]++;
        countObj.f[arr.indexOf('f')]++;
        countObj.g[arr.indexOf('g')]++;
        countObj.h[arr.indexOf('h')]++;
        countObj.i[arr.indexOf('i')]++;
        countObj.j[arr.indexOf('j')]++;
    }
    console.table(countObj);
}
// function shuffle(arr) {
//     console.time('测试')
//     let newArr = arr.map(item=>({val:item,ram:Math.random()}));
//     newArr.sort((a,b)=>a.ram-b.ram);
//     arr.splice(0,arr.length,...newArr.map(i=>i.val));
//     console.timeEnd('测试');
//     return arr;
// }
/**
 * 打乱数组
 * @param arr
 * @returns {*}
 */
function shuffle(arr) {
    console.time('测试')
    let m = arr.length;
    while (m > 1){
        let index = Math.floor(Math.random() * m--);
        [arr[m] , arr[index]] = [arr[index] , arr[m]]
    }
    console.timeEnd('测试');
    return arr;
}
test_shuffle(shuffle);