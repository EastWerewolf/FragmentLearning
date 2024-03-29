
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


// 匹配单个未知字符

// 要匹配你不希望有的字符集，使用否定的字符集.
// 要排除字符集，请使用插入符号 ^

const allCharsNotVowels = /[^aeiou]/gi;
const allCharsNotVowelsOrNumbers = /[^aeiou0-9]/gi;



// 匹配连续出现一次或多次的字符

// 使用+符号

const oneOrMoreAsRegex = /a+/gi;
const oneOrMoreSsRegex = /s+/gi;
const cityInFlorida = "Tallahassee";

cityInFlorida.match(oneOrMoreAsRegex); // ['a', 'a', 'a'];
cityInFlorida.match(oneOrMoreSsRegex); // ['ss'];




// 匹配连续出现零次或多次的字符

// 使用星号 *

const zeroOrMoreOsRegex = /hi*/gi;
const normalHi = "hi";
const happyHi = "hiiiiii";
const twoHis = "hiihii";
const bye = "bye";

normalHi.match(zeroOrMoreOsRegex); // ["hi"]
happyHi.match(zeroOrMoreOsRegex); // ["hiiiiii"]
twoHis.match(zeroOrMoreOsRegex); // ["hii", "hii"]
bye.match(zeroOrMoreOsRegex); // null



// 懒惰匹配

// 符合给定要求的字符串的最小部分
// 默认情况下，正则表达式是贪婪的（匹配满足给定要求的字符串的最长部分）
// 使用?角色进行懒惰匹配

const testString = "catastrophe";
const greedyRexex = /c[a-z]*t/gi;
const lazyRegex = /c[a-z]*?t/gi;

testString.match(greedyRexex); // ["catast"]
testString.match(lazyRegex); // ["cat"]



// 匹配起始字符串模式

// 要测试字符串开头的字符匹配，请使用插入符号^，但不要使用字符集

const emmaAtFrontOfString = "Emma likes cats a lot.";
const emmaNotAtFrontOfString = "The cats Emma likes are fluffy.";
const startingStringRegex = /^Emma/;

startingStringRegex.test(emmaAtFrontOfString); // true
startingStringRegex.test(emmaNotAtFrontOfString); // false





// 匹配结束字符串模式

// 使用$正则表达式末尾的美元符号来检查字符串末尾是否存在

const emmaAtBackOfString = "The cats do not like Emma";
const emmaNotAtBackOfString = "Emma loves the cats";
const startingStringRegex = /Emma$/;

startingStringRegex.test(emmaAtBackOfString); // true
startingStringRegex.test(emmaNotAtBackOfString); // false





// 匹配所有字母和数字

// 使用\word速记

const longHand = /[A-Za-z0-9_]+/;
const shortHand = /\w+/;
const numbers = "42";
const myFavoriteColor = "magenta";

longHand.test(numbers); // true
shortHand.test(numbers); // true
longHand.test(myFavoriteColor); // true
shortHand.test(myFavoriteColor); // true



// 除了字母和数字之外的所有内容

// 您可以使用相反的\w用\W

const noAlphaNumericCharRegex = /\W/gi;
const weirdCharacters = "!_$!!";
const alphaNumericCharacters = "ab283AD";

noAlphaNumericCharRegex.test(weirdCharacters); // true
noAlphaNumericCharRegex.test(alphaNumericCharacters); // false



// 匹配所有数字

// 您可以使用字符集[0-9]，也可以使用速记\d

const digitsRegex = /\d/g;
const stringWithDigits = "My cat eats $20.00 worth of food a week.";

stringWithDigits.match(digitsRegex); // ["2", "0", "0", "0"]



// 匹配所有非数字

// 您可以使用相反的\d用\D

const nonDigitsRegex = /\D/g;
const stringWithLetters = "101 degrees";

stringWithLetters.match(nonDigitsRegex); // [" ", "d", "e", "g", "r", "e", "e", "s"]





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



// 匹配单个未知字符

// 要匹配你不希望有的字符集，使用否定的字符集.
// 要排除字符集，请使用插入符号 ^

const allCharsNotVowels = /[^aeiou]/gi;
const allCharsNotVowelsOrNumbers = /[^aeiou0-9]/gi;




// 匹配连续出现一次或多次的字符

// 使用+符号

const oneOrMoreAsRegex = /a+/gi;
const oneOrMoreSsRegex = /s+/gi;
const cityInFlorida = "Tallahassee";

cityInFlorida.match(oneOrMoreAsRegex); // ['a', 'a', 'a'];
cityInFlorida.match(oneOrMoreSsRegex); // ['ss'];





// 匹配连续出现零次或多次的字符

// 使用星号 *

const zeroOrMoreOsRegex = /hi*/gi;
const normalHi = "hi";
const happyHi = "hiiiiii";
const twoHis = "hiihii";
const bye = "bye";

normalHi.match(zeroOrMoreOsRegex); // ["hi"]
happyHi.match(zeroOrMoreOsRegex); // ["hiiiiii"]
twoHis.match(zeroOrMoreOsRegex); // ["hii", "hii"]
bye.match(zeroOrMoreOsRegex); // null




// 懒惰匹配

// 符合给定要求的字符串的最小部分
// 默认情况下，正则表达式是贪婪的（匹配满足给定要求的字符串的最长部分）
// 使用?角色进行懒惰匹配

const testString = "catastrophe";
const greedyRexex = /c[a-z]*t/gi;
const lazyRegex = /c[a-z]*?t/gi;

testString.match(greedyRexex); // ["catast"]
testString.match(lazyRegex); // ["cat"]




// 匹配起始字符串模式

// 要测试字符串开头的字符匹配，请使用插入符号^，但不要使用字符集

const emmaAtFrontOfString = "Emma likes cats a lot.";
const emmaNotAtFrontOfString = "The cats Emma likes are fluffy.";
const startingStringRegex = /^Emma/;

startingStringRegex.test(emmaAtFrontOfString); // true
startingStringRegex.test(emmaNotAtFrontOfString); // false




// 匹配结束字符串模式

// 使用$正则表达式末尾的美元符号来检查字符串末尾是否存在

const emmaAtBackOfString = "The cats do not like Emma";
const emmaNotAtBackOfString = "Emma loves the cats";
const startingStringRegex = /Emma$/;

startingStringRegex.test(emmaAtBackOfString); // true
startingStringRegex.test(emmaNotAtBackOfString); // false




// 匹配所有字母和数字

// 使用\word速记

const longHand = /[A-Za-z0-9_]+/;
const shortHand = /\w+/;
const numbers = "42";
const myFavoriteColor = "magenta";

longHand.test(numbers); // true
shortHand.test(numbers); // true
longHand.test(myFavoriteColor); // true
shortHand.test(myFavoriteColor); // true




// 除了字母和数字之外的所有内容

// 您可以使用相反的\w用\W

const noAlphaNumericCharRegex = /\W/gi;
const weirdCharacters = "!_$!!";
const alphaNumericCharacters = "ab283AD";

noAlphaNumericCharRegex.test(weirdCharacters); // true
noAlphaNumericCharRegex.test(alphaNumericCharacters); // false



// 匹配所有数字

// 您可以使用字符集[0-9]，也可以使用速记\d

const digitsRegex = /\d/g;
const stringWithDigits = "My cat eats $20.00 worth of food a week.";

stringWithDigits.match(digitsRegex); // ["2", "0", "0", "0"]



// 匹配所有非数字

// 您可以使用相反的\d用\D

const nonDigitsRegex = /\D/g;
const stringWithLetters = "101 degrees";

stringWithLetters.match(nonDigitsRegex); // [" ", "d", "e", "g", "r", "e", "e", "s"]



// 匹配空格

// 使用\s匹配空格和回车

const sentenceWithWhitespace = "I like cats!"
var spaceRegex = /\s/g;
whiteSpace.match(sentenceWithWhitespace); // [" ", " "]



// 匹配非空格

// 您可以使用相反的\s用\S

const sentenceWithWhitespace = "C a t"
const nonWhiteSpaceRegex = /\S/g;
sentenceWithWhitespace.match(nonWhiteSpaceRegex); // ["C", "a", "t"]



// 匹配字符数

// 您可以使用指定一行中的特定字符数 {lowerBound, upperBound}

const regularHi = "hi";
const mediocreHi = "hiii";
const superExcitedHey = "heeeeyyyyy!!!";
const excitedRegex = /hi{1,4}/;

excitedRegex.test(regularHi); // true
excitedRegex.test(mediocreHi); // true
excitedRegex.test(superExcitedHey); //false


// 匹配最少的字符数

// 您只能定义最少数量的字符要求 {lowerBound,}
// 这称为数量说明符

ini复制代码const regularHi = "hi";
const mediocreHi = "hiii";
const superExcitedHey = "heeeeyyyyy!!!";
const excitedRegex = /hi{2,}/;

excitedRegex.test(regularHi); // false
excitedRegex.test(mediocreHi); // true
excitedRegex.test(superExcitedHey); //false



// 匹配确切数量的字符数

// 您可以使用指定确切的字符要求数 {requiredCount}

const regularHi = "hi";
const bestHi = "hii";
const mediocreHi = "hiii";
const excitedRegex = /hi{2}/;

excitedRegex.test(regularHi); // false
excitedRegex.test(bestHi); // true
excitedRegex.test(mediocreHi); //false




// 匹配全部或不匹配的字符

// 要检查字符是否存在，请使用 ?

const britishSpelling = "colour";
const americanSpelling = "Color";
const languageRegex = /colou?r/i;

languageRegex.test(britishSpelling); // true
languageRegex.test(americanSpelling); // true



// 高级内容
// 边界匹配  \b \B
// \babc\b 执行单词边界匹配(^\w|\w$|\W\w|\w\W)。
// \ b表示像插入符号（它类似于$和^）的匹配位置，其中一侧是单词字符（如\ w）而另一侧不是单词字符（例如它可能是字符串的开头或空格字符）。
// 相反，\ B。 它匹配\ b不匹配的所有位置，如果我们想要找到完全被单词字符包围的搜索模式，则可以匹配。
// \Babc\B  仅在模式完全被单词字符包围时才匹配。



// 反向引用  \1
// ([abc])\1  使用\1匹配第一个捕获组匹配的相同文本
// ([abc])([de])\2\1 我们可以用\2 (\3, \4, 等) 来识别第二（第三、第四， 等）捕获组匹配的相同文本。
// (?<foo>[abc])\k<foo>   我们将命名foo放到组中，稍后我们引用它（\ k ）。 结果与上面第一个正则表达式相同。


// 前瞻 后顾
// d(?=r)  仅匹配如果后面跟着r的d，但r不会成为整体正则表达式匹配的一部分
// (?<=r)d   仅匹配如果前面有r的d，但r不会成为整体正则表达式匹配的一部分
// 同理，否定操作符：
// d(?!r)  仅匹配如果后面不跟着r的d，但r不会成为整体正则表达式匹配的一部分
// (?<!r)d   仅匹配如果前面没有r的d，但r不会成为整体正则表达式匹配的一部分





