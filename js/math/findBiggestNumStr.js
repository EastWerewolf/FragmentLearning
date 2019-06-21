/**
 *寻找字符串中最大数字 考虑科学计数法和16进制
 * @param str
 * @returns {string}
 */
function getBiggestNum(str){
    let last = 0,//记录当前符合样本字符串距离上一个的距离
        strNum='',//记录连续符合样本字符串的最大长度
        bigStr='',//记录能转化成最大数的字符串
        sample='1234567890abcdefABCDEFx+-.';//有可能转化成数字的字符串样本
    for(let i = 0;i <str.length;i++){
        if(sample.indexOf(str[i])>-1){
            strNum = i - last===1?strNum+str[i]:str[i];//积累连续可能转化为数字的strNum
            last = i;//确保断点时重置strNum
            if(Number(strNum)===Number(strNum)){//可以直接转化的情况
                if(strNum.indexOf('.')>-1){//考虑小数点前后的数字大小比较
                    let newNum =strNum.split('.')[1];
                    let str = Number(newNum) > Number(strNum)?newNum:strNum;
                    bigStr = Number(bigStr)>Number(str)?bigStr:str;
                }else{
                    bigStr = Number(bigStr)>Number(strNum)?bigStr:strNum;
                }
            }else{//不能直接转化的情况
                for(let j = 0;j < strNum.length;j++){
                    for(let k = j + 1;k < strNum.length;k++){
                        const newNumStr = strNum.substr(j,k);
                        if(Number(newNumStr)===Number(newNumStr)&&!!newNumStr){
                            bigStr = Number(bigStr)>Number(newNumStr)?bigStr:newNumStr;
                        }
                    }
                }
            }
            console.log('目前含有最大数字最大字符串',bigStr,strNum)
        }
    }
    console.log('含有最大数字的字符串',bigStr,'原字符串',str);
    return bigStr
}
let str0 = 'acfha1.3e+4fd54skjf123';//输出3e+4
let str = 'pppp.12bbbbbb12.31cc11.56cc';//输出56
let str1 = '54.4..6Ⅲ-44.4+++5-4';//输出54.4
let str2 = 'assssc23423v234'//输出23423
let str3 = '3.2.41.5a.71.2e+5.8.3.9.2.1';//输出71.2e+5
let str4 = 'aacc1.3e+45sscc567' //输出3e+45//
let str5 = 'asd485s0xbfcdabfvc456' //输出0xbdcdabf
let str6 = 'd4'
getBiggestNum(str5);
