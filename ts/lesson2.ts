// 实现PercentageParser。根据/^（\+\\-）？（\d*）？(\%)?$/ 规律性匹配T并获得三个匹配。
// 结构应该是：[加号或减号、数字、单位]如果未捕获，则默认为空字符串。

// 答案 
type TSplitPm<S extends string> = S extends `${infer H}${infer R}` ? (H extends '+' | '-' ? [H, R] : ['', S]) : ['', '']
type PercentageParser<A extends string> = A extends `${infer F}%` ? [...TSplitPm<F>, '%'] : [...TSplitPm<A>, '']

// 例如：
type PString1 = ''
type PString2 = '+85%'
type PString3 = '-85%'
type PString4 = '85%'
type PString5 = '85'

type R1 = PercentageParser<PString1>  // expected ['', '', '']
type R2 = PercentageParser<PString2>  // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3>  // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4>  // expected ["", "85", "%"]
type R5 = PercentageParser<PString5>  // expected ["", "85", ""]


// 从字符串中删除指定的字符。

// 答案
type DropChar<S, C, T extends string = ''> = S extends `${infer H}${infer R}` ? (H extends C ? DropChar<R, C, T> : DropChar<R, C , `${T}${H}`>) : T

// 例如：
type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'


// 给定一个数字（总是正数）作为类型。你的类型应该返回减少1的数字。

// 答案
type MinusOne<T extends number, P extends any[] = []> = [...P, unknown]['length'] extends T ? P['length'] : MinusOne<T, [...P, unknown]>

// 例如：
type Zero = MinusOne<1> // 0
type FiftyFour = MinusOne<55> // 54

