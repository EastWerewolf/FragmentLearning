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
console.log(longestPalindrome(str))
