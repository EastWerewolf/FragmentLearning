/**
 *寻找字符串中最大数字 考虑科学计数法和16进制
 * @param str
 * @returns {string}
 */
function getBiggestNum(str){
    let biggest=-1,
        last = 0,
        strNum='',
        bigStr='',
        sample='1234567890abcdefx+-.';
    for(let i = 0;i <str.length;i++){
        if(sample.indexOf(str[i])>-1){
            strNum = i - last===1?strNum+str[i]:str[i];//积累连续可能转化为数字的strNum
            last = i;//确保断点时重置strNum
            let isTop = '';
            if(Number(strNum)===Number(strNum)){//可以直接转化的情况
                isTop = 'top';
                if(strNum.indexOf('.')>-1){//考虑小数点前后的数字大小比较
                    let newNum =strNum.split('.')[1];
                    let bigger = Number(newNum) > Number(strNum)?Number(newNum):Number(strNum);
                    let str = Number(newNum) > Number(strNum)?newNum:strNum;
                    biggest = biggest < bigger?bigger:biggest;
                    bigStr = biggest === bigger?str:bigStr;//记录字符串数字
                }else{
                    biggest = biggest < Number(strNum)?Number(strNum):biggest;
                    bigStr = biggest === Number(strNum)?strNum:bigStr;//记录字符串数字
                }
            }else{//16进制或科学计数法的转换
                isTop='bottom';
                for(let j = 0;j < strNum.length;j++){
                    for(let k = j + 1;k < strNum.length;k++){
                        const newNumStr = strNum.substr(j,k);
                        if(Number(newNumStr)===Number(newNumStr)&&!!newNumStr){
                            biggest = biggest < Number(newNumStr)?Number(newNumStr):biggest;
                            bigStr = biggest === Number(newNumStr)?newNumStr:bigStr;//记录字符串数字
                        }
                    }
                }
            }
            console.log('目前最大数子',biggest>-1?biggest:'暂无','字符串',biggest>-1?bigStr:'暂无',isTop,strNum)
        }
    }
    console.log('最终最大数字',biggest>-1?biggest:'未找到','||最终最大字符串',biggest>-1?bigStr:'未找到','原字符串',str);
    return bigStr
}
let str0 = 'acfha1.3e+4fd54skjf123';//输出3e+4
let str = 'pppp.12bbbbbb12.31cc11.56cc';//输出56
let str1 = '54.4..6Ⅲ-44.4+++5-4';//输出54.4
let str2 = 'assssc23423v234'//输出233423
let str3 = '3.2.41.5a.71.2e+5.8.3.9.2.1';//输出71.2e+5
let str4 = 'aacc1.3e+45sscc567' //输出3e+45//
let str5 = 'asd485s0xbfcdabfvc456' //输出0xbdcdabf
let str6 = 'd4'
getBiggestNum(str4);
