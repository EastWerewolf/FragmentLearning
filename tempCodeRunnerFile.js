let baseStr = 'aGdho1TLOKp2AsxCBQYyIwmgfRXVWjucbU5MSekZr3nN86viEqzJPD4l97Ht0F';
function set(arr){
    return Array.from(new Set(arr))
}
function randomNumber(){
    return Math.floor(Math.random()*62)
}
function uniqueArray(length){
    let arr = [];
    function b(){
        let num = randomNumber();
        arr.push(num);
        arr = set(arr);
        if(arr.length>=length){
            return arr
        }else{
            return b(length)
        }
    }
    return b()
}
function hash(length,unique){
    let str = '';
    if(length>0){
        let u = uniqueArray(length);
        console.log(u)
        for(let i = 0;i<length;i++){
            if(unique){
                str +=baseStr[u[i]]
            }else{
                str +=baseStr[randomNumber()]
            }
        }
        return str
    }else{
        return '请输入合法数字'
    }
}

console.log('随机哈希码',hash(5,true));

function createArray(length){
    let arr = [];
    function push(){
        arr.push(Math.floor(Math.random()*271));
        arr = Array.from(new Set(arr));
        if(arr.length>=length) return arr;
        return push()
    }
    return push()
}
const url = 'https://activity-pics.themobiyun.com/wx/'