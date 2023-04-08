
// 使用该.test()方法


let testString = "My test string";
let testRegex = /string/;
testRegex.test(testString);

// 使用OR运算符（|）
const regex = /yes|no|maybe/;



// 忽略大小写

// 使用i标志不区分大小写

const caseInsensitiveRegex = /ignore case/i;
const testString = 'We use the i flag to iGnOrE CasE';
caseInsensitiveRegex.test(testString); // true
