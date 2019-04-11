/**
 *寻找字符串中最大数字 考虑科学计数法和16进制
 * @param str
 * @returns {string}
 */
function getBiggestNum(str){
    let biggest=-1,strNum='',last = 0,bigStr='';
    for(let i = 0;i <str.length;i++){
        if(Number(str[i])===Number(str[i])||str[i]==='.'||str[i]==='a'||str[i]==='b'||str[i]==='c'||str[i]==='d'||str[i]==='e'||str[i]==='f'||str[i]==='+'||str[i]==='-'||str[i]==='x'){
            if(i - last===1){
                strNum +=str[i];
            }else{
                strNum = str[i];
            }
            last = i;
            let isTop = '';
            if(Number(strNum)===Number(strNum)){
                isTop = 'top';
                if(strNum.indexOf('.')>-1){
                    let newNum =strNum.split('.')[1];
                    let bigger = Number(newNum) > Number(strNum)?Number(newNum):Number(strNum);
                    let str = Number(newNum) > Number(strNum)?newNum:strNum;
                    biggest = biggest < bigger?bigger:biggest;
                    bigStr = biggest === bigger?str:bigStr;//记录字符串数字
                }else{
                    biggest = biggest < Number(strNum)?Number(strNum):biggest;
                    bigStr = biggest === Number(strNum)?strNum:bigStr;//记录字符串数字
                }
            }else{
                isTop='bottom';
                for(let j = 0;j <strNum.length;j++){
                    for(let k = j;k<strNum.length;k++){
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
getBiggestNum(str5);
