
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



// 将第一个匹配提取到变量
// 使用该.match()功能
const match = "Hello World!".match(/hello/i); // "Hello"



// 提取数组中的所有匹配项

// 使用g标志

const testString = "Repeat repeat rePeAT";
const regexWithAllMatches = /Repeat/gi;
testString.match(regexWithAllMatches); // ["Repeat", "repeat", "rePeAT"]



// 任何字符

// 使用通配符.作为任何字符的占位符

// To match "cat", "BAT", "fAT", "mat"
const regexWithWildcard = /.at/gi;
const testString = "cat BAT cupcake fAT mat dog";
const allMatchingWords = testString.match(regexWithWildcard); // ["cat", "BAT", "fAT", "mat"]




// 匹配具有多种可能性的单个字符

// 使用字符类，您可以使用它来定义要匹配的一组字符
// 你把它们放在方括号内 []

// Match "cat" "fat" and "mat" but not "bat"
const regexWithCharClass = /[cfm]at/g;
const testString = "cat fat bat mat";
const allMatchingWords = testString.match(regexWithCharClass); // ["cat", "fat", "mat"]




// 匹配字母表的字母

// 使用字符集中的范围 [a-z]

const regexWithCharRange = /[a-e]at/;
const catString = "cat";
const batString = "bat";
const fatString = "fat";

regexWithCharRange.test(catString); // true
regexWithCharRange.test(batString); // true
regexWithCharRange.test(fatString); // false



// 匹配特定的数字和字母

// 您还可以使用连字符匹配数字

const regexWithLetterAndNumberRange = /[a-z0-9]/ig;
const testString = "Emma19382";
testString.match(regexWithLetterAndNumberRange) // true

