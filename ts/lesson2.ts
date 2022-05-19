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



// 从T中，选择一组类型可分配给U的属性。

// 答案
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

// 例如

type OnlyBoolean = PickByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { isReadonly: boolean; isEnable: boolean; }


// 实现 StartsWith<T, U> ，它接受两个确切的字符串类型并返回 T 是否以 U 开头

// 答案
type StartsWith<T extends string, U extends string> = T extends `${U}${infer R}` ? true : false

// 例如

type a = StartsWith<'abc', 'ac'> // expected to be false
type b = StartsWith<'abc', 'ab'> // expected to be true
type c = StartsWith<'abc', 'abcd'> // expected to be false


// 实现 EndsWith<T, U> ，它接受两个确切的字符串类型并返回 T 是否以 U 结尾
type EndsWith<T extends string, U extends string> = T extends `${string}${U}` ? true : false;


// 实现一个通用的 PartialByKeys<T, K>，它接受两个类型参数 T 和 K。K 指定应设置为可选的 T 的属性集。 当没有提供 K 时，它应该使所有属性都是可选的，就像普通的 Partial<T> 一样。

//答案
type Raw<O> = {
  [K in keyof O]: O[K]
}

type PartialByKeys<T, K = keyof any> = Raw<{
  [Key in Exclude<keyof T, K>]: T[Key]
} & {
  // 这里不能使用 T[Key]，需要加个判断，这是为什么？
  [Key in K as Key extends keyof T ? Key : never]?: Key extends keyof T ? T[Key] : never;
}>

interface User {
  name: string
  age: number
  address: string
}

type UserPartialName1 = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }

// 实现一个通用的RequiredByKeys<T，K>，它接受两个类型参数T和K。 K指定应设置为必需的T的属性集。如果未提供K，则应使所有所需的属性与正常所需的<T>相同。

// 答案
type Copy<T> = {
  [K in keyof T]: T[K]
}

type RequiredByKeys<T, K extends keyof any = ''> = [K] extends ['']
  ? Required<T>
  : Copy<
    {
      [Key in K as Key extends keyof T ? Key : never]: Key extends keyof T ? Required<T>[Key] : never
    } & {
      [Key in Exclude<keyof T, K>]?:T[Key]
    }
  >;

  // 例如
interface User {
  name?: string
  age?: number
  address?: string
}

type UserPartialName2 = RequiredByKeys<User, 'name'> // { name: string; age?: number; address?: string }


// 实现generic Mutable<T>，它使T中的所有属性都是可变的（而不是只读的）。

type Mutable<T> = {
  -readonly [key in keyof T]: T[key];
};

// 例如
interface Todo {
  readonly title: string
  readonly description: string
  readonly completed: boolean
}

type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }

// 从 T 中选择一组其类型不可分配给 U 的属性。

// 答案
type OmitByType<T, P> = {
  [key in keyof T as T[key] extends P ? never : key]: T[key];
};

// 例如
type OmitBoolean = OmitByType<{
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}, boolean> // { name: string; count: number }


// 实现 Object.entries 的类型版本

// 答案
type ObjectEntries<T, U extends keyof T = keyof T> = U extends unknown 
? [U, T[U] extends (infer F | undefined) 
  ? F extends never 
    ? undefined
    : F
  : T[U] ] 
: never

// 例如
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}
type modelEntries = ObjectEntries<Model> // ['name', string] | ['age', number] | ['locations', string[] | null];

// 实现 Array.shift 的类型版本

type Shift<T> = T extends [infer _F,...infer R] ? R : never

// 例如

type Result = Shift<[3, 2, 1]> // [2, 1]


// 给定一个只包含字符串类型的元组类型 T 和一个类型 U，递归地构建一个对象。

// 答案

type TupleToNestedObject<T extends string[] | unknown[], U> =
  T extends [infer F, ...infer Rest]
    ? Record<F & string, TupleToNestedObject<Rest, U>>
    : U

// 例如
type a = TupleToNestedObject<['a'], string> // {a: string}
type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type


// 实现数组的类型版本。逆序

type Reverse<T extends unknown[], Result extends unknown[] = []> =
  T extends [infer F, ...infer Rest]
    ? Reverse<Rest, [F, ...Result]>
    : Result

// 例如：

type a = Reverse<['a', 'b']> // ['b', 'a']
type b = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']



// 实现 lodash 的 _.flip 的类型版本。

// 类型 FlipArguments<T> 需要函数类型 T 并返回一个新函数类型，该函数类型与 T 的返回类型相同，但参数相反。

// 答案
type FlipArguments<T extends Function> =
  T extends (...args: infer ArgsType) => infer ReturnType
    ? (...args: Reverse<ArgsType) => ReturnType
    : never

// 例如：
type Flipped = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> 
// (arg0: boolean, arg1: number, arg2: string) => void

// 递归地将数组展平到深度倍。

// 答案
type FlattenDepth<T extends any[], I extends number = 1, EI extends any[] = [], EV extends any[] = []> = 
  EI['length'] extends I
    ? [...EV, ...T]
    : T extends [infer R1, ...infer R2] 
      ? R1 extends any[]
        ? FlattenDepth<R2, I, EI, FlattenDepth<R1, I, [...EI, 1], EV>>
        : FlattenDepth<R2, I, EI, [...EV, R1]>
      : EV
// 例如：
type a11 = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
type b11 = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1


// 块、元素、修饰符方法（BEM）是CSS中类的常用命名约定。

// 例如，块组件将表示为btn，依赖于块的元素将表示为btn__价格，更改块样式的修改器将表示为btn--大或btn__价格--警告。

// 实现BEM<B，E，M>，从这三个参数生成字符串并集。其中B是字符串文字，E和M是字符串数组（可以为空）。

type EmptyOrBEM<T extends any[], SP extends string> = [T[number]] extends [never] 
  ? '' 
  : `${SP}${T[number]}`

type BEM<B extends string, E extends string[], M extends string[]> = 
  `${B}${EmptyOrBEM<E, '__'>}${EmptyOrBEM<M, '--'>}`

 
 
 
//  实现二叉树的类型版本以便遍历。

// your answers
type InorderTraversal<T extends TreeNode | null> = [T] extends [TreeNode] ? [...InorderTraversal<T['left']>, T['val'], ...InorderTraversal<T['right']>] : [];
// 例如：
const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

type A = InorderTraversal<typeof tree1> // [1, 3, 2]


// 实现just flip对象的类型。

// 答案
type Flip<T extends Record<string, string | number | bigint | boolean | null | undefined>> = {
  [K in keyof T as `${T[K]}`]: K;
}

//示例：
Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}