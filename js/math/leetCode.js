let str = 'abb',ttf = 'abcba'
let longestPalindrome = function(s) {
    let str = s.split('').reverse().join(''),arr = [];
    for(let i = 0;i <s.length;i++){
        for(let j = 0;j<s.length;j++){
            let newStr = str.substring(i,j+1);
            let oldStr = s.substring(Math.abs(s.length-i),Math.abs(s.length-j-1))
            console.log(newStr,oldStr,i,j+1)
            if(s.indexOf(newStr)!==-1&&newStr===oldStr){
                arr.push(newStr)
            }
        }
    }
    arr = arr.sort((a,b)=>{
        return a.length-b.length
    })
    return arr
};
// console.log(longestPalindrome(str))


// 输入： 3(x)2(yz2(az))1(x) 输出：xxxyzazazyzazazx
const str1 = '3(x)2(yz2(az))1(x)'
const getStr = (str, index = 0) => {
    const l = str.length;
    let res = "";
    let v = "";
    for (let i = index; i < l; i++) {
        if (str[i] === "(") {
            const [nextValue, nextIndex] = getStr(str, i + 1);
            const multi = Number(v) || 1;
            res += `${nextValue.repeat(multi)}`;
            i = nextIndex;
            v = "";
        } else if (str[i] === ")") {
            // console.log(res,'res')
            return [res, i];
        } else if (/\d/.test(str[i])) {
            v += str[i];
        } else {
            res += str[i];
        }
    }
    return res;
};

console.log(getStr(str1))
