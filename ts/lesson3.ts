// 实现类似Vue的类型支持的简化版本。

// 通过提供一个函数SimpleVue（类似于Vue.extend或defineComponent），它应该正确地推断出 computed 和 methods 内部的this类型。

// 在此挑战中，我们假设SimpleVue接受只带有data，computed和methods字段的Object作为其唯一的参数，

// -data是一个简单的函数，它返回一个提供上下文this的对象，但是你无法在data中获取其他的计算属性或方法。

// -computed是将this作为上下文的函数的对象，进行一些计算并返回结果。在上下文中应暴露计算出的值而不是函数。

// -methods是函数的对象，其上下文也为this。函数中可以访问data，computed以及其他methods中的暴露的字段。 computed与methods的不同之处在于methods在上下文中按原样暴露为函数。

// SimpleVue的返回值类型可以是任意的。

// 答案 
// your answers
type SimpleVue<D, C, M> = {
  data(): D
  computed: C & ThisType<C & D>
  methods: M & ThisType<D & M & {
    [key in keyof C]: C[key] extends (...args: any) => infer R ? R : never
  }>
} & ThisType<{}>
declare function SimpleVue<D, C, M, Fn>(options: {
  data: (this: unknown) => D,
  computed: C & ThisType<D>,
  methods: M & ThisType<D & M & {
    [
      P in keyof C as C[P] extends (...args: any[]) => any ? P : never
    ]: C[P] extends (...args: any[]) => any ? ReturnType<C[P]> : never
  }>,
}): unknown

// 例如
const instance = SimpleVue({
  data() {
    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return this.firstname + ' ' + this.lastname
    }
  },
  methods: {
    hi() {
      alert(this.fullname.toLowerCase())
    }
  }
})




// [Currying]（https://en.wikipedia.org/wiki/Currying）是一种将带有多个参数的函数转换为每个带有一个参数的函数序列的技术。

// 答案

declare function Currying<T>(arg: T):
  T extends (...args: infer P) => infer R ? (
    P extends [infer P1, ...infer P2] ? (
      (arg: P1) => ReturnType<typeof Currying<(...args: P2) => R>>
    ) : R
  ) : never

// 例如：

const add = (a: number, b: number) => a + b
const three = add(1, 2)

const curriedAdd = Currying(add)
// const five = curriedAdd(2)(3)
// 传递给Currying的函数可能有多个参数，您需要正确键入它。

// 在此挑战中，curried函数一次仅接受一个参数。分配完所有参数后，它应返回其结果。


// 实现高级util类型UnionToIntersection<U>

// 答案
type UnionToIntersection<U> =
  (U extends infer V ? (_: V) => 0 : never) extends (_: infer V) => 0 ? V : never;

// 例如
type I = Union2Intersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true


// 实现高级util类型GetRequired<T>，该类型保留所有必填字段

// 答案
type GetRequired<T extends Record<string, any>> = {
  [K in keyof T as {} extends Pick<T, K> ? never : K]: T[K];
};

// 例如
type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }


// 实现高级util类型GetOptional<T>，该类型保留所有可选字段

// 答案
type GetOptional<T> = {[
  P in keyof T as
  undefined extends {[P in keyof T]: 1}[P] ? P : never
  ]: T[P]}

// 例如
type I = GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }

// 实现高级util类型RequiredKeys<T>，该类型将所有必需的键都选择为一个并集。


// 答案
type RequiredKeys<T> = keyof {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};

// 例如

type Result = RequiredKeys<{ foo: number; bar?: string }>;
// expected to be “foo”

// 实现高级 util 类型OptionalKeys<T>，该类型将 T 中所有可选属性的键合并为一个联合类型。

// 答案
type OptionalKeys<T> = keyof {
  [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K];
};

type Result1 = OptionalKeys<{ foo: number; bar?: string }>;
// expected to be “bar”


// 实现CapitalizeWords，它将字符串中每个单词的第一个字母转换为大写，其余字母保持原样。

// 答案
type CapitalizeWord<S> = S extends `${infer First}${infer Rest}`
  ? `${First}${CapitalizeWord<
      Uppercase<First> extends Lowercase<First> ? Capitalize<Rest> : Rest
    >}`
  : S;

type CapitalizeWords<S extends string> = CapitalizeWord<Capitalize<S>>;

// 例如
type capitalized = CapitalizeWords<'hello world, my friends'> // expected to be 'Hello World, My Friends'


// 实现CamelCase，将snake\u case字符串转换为CamelCase。

// 答案
type Help<S extends string> = S extends `${infer L}_${infer R}`
  ? `${L}${Help<Capitalize<R>>}`
  : S;

type CamelCase<S extends string> = Help<Lowercase<S>>;

// 例如
type camelCase1 = CamelCase<'hello_world_with_types'> // expected to be 'helloWorldWithTypes'
type camelCase2 = CamelCase<'HELLO_WORLD_WITH_TYPES'> // expected to be same as previous one

// C语言中有一个函数：printf。此函数允许我们打印具有格式的内容。这样地：



// printf（“结果为%d.”，42）；

// 此质询要求您分析输入字符串并提取格式占位符，如%d和%f。例如，如果输入字符串为“结果为%d.”，则分析的结果为元组['dec'。

// 答案

type ParsePrintFormat<S extends string> = S extends `${string}%${infer A}`
  ? A extends `${infer F}${infer R}`
    ? [
        ...(F extends keyof ControlsMap ? [ControlsMap[F]] : []),
        ...ParsePrintFormat<R>
      ]
    : []
  : [];

// 以下是映射：
type ControlsMap = {
  c: 'char',
  s: 'string',
  d: 'dec',
  o: 'oct',
  h: 'hex',
  f: 'float',
  p: 'pointer',
}



// 这个挑战从6个简单的Vue开始，您应该先完成这一个，然后根据它修改代码以开始这个挑战。



// 除了简单的Vue之外，我们现在在选项中还有一个新的道具字段。这是Vue道具选项的简化版本。这里有一些规则。



// 道具是一个对象，包含每个字段，作为注入该字段的真实道具的键。注入的道具可以在所有上下文中访问，包括数据、计算和方法。



// 属性将由构造函数或具有包含构造函数的类型字段的对象定义。



// 例如



props: {
  foo: Boolean
}
// or
props: {
  foo: { type: Boolean }
}

// 应推断为类型Props={foo:boolean}。



// 传递多个构造函数时，应将类型推断为一个联合。


props: {
  foo: { type: [Boolean, Number, String] }
}
// -->
type Props = { foo: boolean | number | string }

// 传递空对象时，应将键推断为any。



// 有关更多指定的案例，请查看测试案例部分。



// 此挑战中不考虑Vue中的必需、默认和阵列道具。


// your answers
// your answers

type GetInstanceType<T> = 
  // String, Boolean, Number
  T extends () => infer R ?
    R :
    // union props
    T extends Array<unknown> ?
      GetInstanceType<T[number]> :
      // user defined ctors
      T extends new (...args: any) => infer R ?
        R :
        never;


type PropsType<P> = {
  // deal with empty {}
  [K in keyof P]: {} extends P[K] ?
    any :
    // deal with {type: ...}
    P[K] extends Record<'type', infer T> ?
      GetInstanceType<T> :
      // deal with single ctor
      GetInstanceType<P[K]>;
}

declare function VueBasicProps<P, D, C, M>(options: {
  props: P
  data: (this:PropsType<P>) => D,
  computed: C & ThisType<D>,
  methods: M & ThisType<PropsType<P> & D & M & {
    [K in keyof C]: C[K] extends (...args: any[]) => unknown ?
      ReturnType<C[K]> :
      never;
  }>
}): any



// 有时，检测是否有任何类型的值很有用。这在使用第三方Typescript模块时尤其有用，因为第三方Typescript模块可以导出模块API中的任何值。当您禁止隐式检查时，了解任何隐式检查也很好。



// 因此，让我们编写一个实用程序类型IsAny，它接受输入类型T。如果T为any，则返回true，否则返回false。
type IsAny<T> = 0 extends (1 & T) ? true : false;



// lodash 中的 get 函数是访问 JavaScript 中嵌套值的非常方便的助手。 然而，当我们来到 TypeScript 时，使用这样的函数会让你丢失类型信息。 借助 TS 4.1 即将推出的 Template Literal Types 功能，正确键入 get 成为可能。 你能实现吗？

// 例如，
type Data = {
  foo: {
    bar: {
      value: 'foobar',
      count: 6,
    },
    included: true,
  },
  hello: 'world'
}
  

//  答案
type Get<T, K> = K extends `${infer A}.${infer B}`
  ? A extends keyof T
    ? Get<T[A], B>
    : never
  : K extends keyof T
  ? T[K]
  : never;
type A = Get<Data, 'hello'> // 'world'
type B = Get<Data, 'foo.bar.count'> // 6
type C = Get<Data, 'foo.bar'> // { value: 'foobar', count: 6 }


// 将字符串文字转换为数字，其行为类似于数字。parseInt。

type ToNumber<
  S extends string,
  U extends unknown[] = []
> = S extends `${U["length"]}` ? U["length"] : ToNumber<S, [...U, unknown]>;



// 实现一个类型FilterOut，它从元组T中过滤出给定类型F的项。

// 答案
type FilterOut<T extends any[], F> = T extends [infer First, ...infer Rest]
  ? [First] extends [F]
    ? FilterOut<Rest, F>
    : [First, ...FilterOut<Rest, F>]
  : [];



// 例如
type Filtered = FilterOut<[1, 2, null, 3], null> // [1, 2, 3]



// 枚举是TypeScript的原始语法（JavaScript中不存在）。因此，由于透明化，它被转换为如下形式：

let OperatingSystem;
(function (OperatingSystem) {
    OperatingSystem[OperatingSystem["MacOS"] = 0] = "MacOS";
    OperatingSystem[OperatingSystem["Windows"] = 1] = "Windows";
    OperatingSystem[OperatingSystem["Linux"] = 2] = "Linux";
})(OperatingSystem || (OperatingSystem = {}));
// 在这个问题中，类型应该将给定的字符串元组转换为行为类似于枚举的对象。此外，枚举的属性优选为pascal情况。


// 答案

type GetIndex<T extends ReadonlyArray<unknown>, P extends string, ACC extends Array<unknown> = []> =
  T extends readonly [infer F, ...infer R] ?
    [P] extends [F] ?
      ACC['length'] :
      GetIndex<R, P, [...ACC, 0]> :
    never;

type Enum<T extends readonly string[], N extends boolean = false> = {
    readonly [P in T[number] as P extends string ? Capitalize<P> : P]: 
      N extends true ?
        GetIndex<T, P> :
        P;
  }

Enum<["macOS", "Windows", "Linux"]>
// -> { readonly MacOS: "macOS", readonly Windows: "Windows", readonly Linux: "Linux" }
// 如果第二个参数中给出true，则该值应为数字文字。

Enum<["macOS", "Windows", "Linux"], true>
// -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }



// 实现格式<扩展字符串>通用。

// 答案
type PrintMap = {
  s: string;
  d: number;
};

type Format<T extends string> = T extends `${string}%${infer A}${infer B}`
  ? A extends keyof PrintMap
    ? (a: PrintMap[A]) => Format<B>
    : Format<B>
  : string;

// 例如

type FormatCase1 = Format<"%sabc"> // FormatCase1 : string => string
type FormatCase2 = Format<"%s%dabc"> // FormatCase2 : string => number => string
type FormatCase3 = Format<"sdabc"> // FormatCase3 :  string
type FormatCase4 = Format<"sd%abc"> // FormatCase4 :  string



// TypeScript具有结构类型系统，但有时您希望函数只接受一些以前定义良好的唯一对象（如在标称类型系统中），而不接受任何具有必需字段的对象。
// 创建一个类型，该类型接受对象并使其和其中所有深度嵌套的对象唯一，同时保留所有对象的字符串键和数字键以及这些键上所有属性的值。
// 原始类型和生成的唯一类型必须可以相互分配，但不能完全相同。

// 答案
type DeepObjectToUniq<O extends object> = {
  [K in keyof O]: O[K] extends object
    ? DeepObjectToUniq<O[K] & { _?: [O, K] }>
    : O[K];
};

// 例如
import { Equal } from "@type-challenges/utils"

type Foo = { foo: 2; bar: { 0: 1 }; baz: { 0: 1 } }

type UniqFoo = DeepObjectToUniq<Foo>

declare let foo: Foo
declare let uniqFoo: UniqFoo

uniqFoo = foo // ok
foo = uniqFoo // ok

type T0 = Equal<UniqFoo, Foo> // false
type T1 = UniqFoo["foo"] // 2
type T2 = Equal<UniqFoo["bar"], UniqFoo["baz"]> // false
type T3 = UniqFoo["bar"][0] // 1
type T4 = Equal<keyof Foo & string, keyof UniqFoo & string> // true


// 实现计算模板字符串长度的类型 LengthOfString<S>（如 298 - 字符串长度）：

// 答案
type LengthOfString<
  S extends string,
  A extends unknown[] = []
> = S extends `${infer First}${infer Rest}`
  ? LengthOfString<Rest, [...A, unknown]>
  : A["length"];

type T0 = LengthOfString<"foo"> // 3

// 该类型必须支持数百个字符长的字符串（通常的字符串长度递归计算受限于 TS 中递归函数调用的深度，即它支持最多大约 45 个字符长的字符串）


// 实现一个类型UnionToTuple，该类型将联合转换为元组。
// 正如我们所知，联合是一种无序结构，但元组是一种有序结构，这意味着我们不应该预先假设在创建或转换联合时，
// 在一个联合的术语之间会保留任何顺序。
// 因此，在这个挑战中，输出元组中元素的任何排列都是可以接受的。

// 答案

// 'a' | 'b' | 'c' => ()=>'a' & ()=>'b' & ()=>'c'
// 知识点：函数参数类型是逆变的
type UnionToIntersectionFn<U> = (U extends unknown ?
  (k: () => U) => void : 
  never) extends (k: infer I) => void ?
    I :
    never;

// ()=>'a' & ()=>'b' & ()=>'c' => 'c'
// 知识点1：函数交叉类型与函数重载本质上一样
// 知识点2: https://github.com/Microsoft/TypeScript/issues/24275#issuecomment-390701982
type GetLastReturnType<U> = UnionToIntersectionFn<U> extends ()=>infer R ?
  R :
  never;
  

type UnionToTuple<U, T extends Array<unknown> = []> = [U] extends [never] ?
  T :
  UnionToTuple<Exclude<U, GetLastReturnType<U>>, [...T, GetLastReturnType<U>]>;

// 您的类型应该解析为以下两种类型之一，而不是它们的联合！
UnionToTuple<1>           // [1], and correct
UnionToTuple<'any' | 'a'> // ['any','a'], and correct
// 或
UnionToTuple<1>           // [1], and correct
UnionToTuple<'any' | 'a'> // ['any','a'], and correct

//它不应该是所有可接受元组的联合。。。
UnionToTuple<'any' | 'a'> // ['a','any'] | ['any','a'], 这是不对的

// 一个结合可能会崩溃，这意味着一些类型可以吸收（或被吸收）其他类型，没有办法阻止这种吸收。请参见以下示例：

Equal<UnionToTuple<any | 'a'>,       UnionToTuple<any>>         // will always be a true
Equal<UnionToTuple<unknown | 'a'>,   UnionToTuple<unknown>>     // will always be a true
Equal<UnionToTuple<never | 'a'>,     UnionToTuple<'a'>>         // will always be a true
Equal<UnionToTuple<'a' | 'a' | 'a'>, UnionToTuple<'a'>>         // will always be a true





// 创建一个类型安全的字符串连接实用程序，可以这样使用：

// 答案
type ReturnType<T extends string, P> = P extends [infer First extends string, ...infer Rest]
  ? `${First}${Rest extends [] ? "" : `${T}${ReturnType<T, Rest>}`}`
  : "";

declare function join<T extends string>(
  delimiter: T
): <P extends string[]>(...parts: P) => ReturnType<T, P>;

const hyphenJoiner = join('-')
const result = hyphenJoiner('a', 'b', 'c'); // = 'a-b-c'
Or alternatively:

join('#')('a', 'b', 'c') // = 'a#b#c'
// 当我们传递一个空分隔符（即“”）进行连接时，我们应该按原样连接字符串，即：

join('')('a', 'b', 'c') // = 'abc'
// 当只传递了一个项时，我们应该返回原始项（不添加任何分隔符）：

join('-')('a') // = 'a'



// 实现一个类型DeepPick，它扩展了实用程序类型Pick。类型具有两个参数。

// 答案
type UnionToIntersection<U, P = U> = (
  U extends P ? (a: U) => void : never
) extends (a: infer A) => void
  ? A
  : never;

type DeepPick<O, U> = UnionToIntersection<
  U extends `${infer A extends keyof O & string}.${infer Rest}`
  ? { [K in A]: DeepPick<O[A], Rest> }
  : U extends keyof O
  ? { [K in U]: O[U] }
  : never
>;

// 例如：

type obj = {
  name: 'hoge', 
  age: 20,
  friend: {
    name: 'fuga',
    age: 30,
    family: {
      name: 'baz',  
      age: 1 
    }
  }
}

type T1 = DeepPick<obj, 'name'>   // { name : 'hoge' }
type T2 = DeepPick<obj, 'name' | 'friend.name'>  // { name : 'hoge' } & { friend: { name: 'fuga' }}
type T3 = DeepPick<obj, 'name' | 'friend.name' |  'friend.family.name'>  // { name : 'hoge' } &  { friend: { name: 'fuga' }} & { friend: { family: { name: 'baz' }}}




// 创建一个类型类似于 Pinia 库的类型级函数。您实际上不需要实现功能，只需添加类型即可。

// 概述
// 该函数只接收一个类型为对象的参数。该对象包含 4 个属性：

// id - 只是一个字符串（必需）
// state - 一个将对象作为商店状态返回的函数（必需）
// getters - 一个对象，其方法类似于 Vue 的计算值或 Vuex 的 getter，详细信息如下（可选）
// 动作 - 具有可以产生副作用和改变状态的方法的对象，详细信息如下（可选）
// 吸气剂
// 当您像这样定义商店时：

const store = defineStore({
  // ...other required fields
  getters: {
    getSomething() {
      return 'xxx'
    }
  }
})
// 你应该像这样使用它：
store.getSomething
代替：
store.getSomething() // 错误
// 此外，getter 可以通过它访问 state 和/或其他 getter，但 state 是只读的。

// 行动
// 当您像这样定义商店时：

const store = defineStore({
  // ...other required fields
  actions: {
    doSideEffect() {
      this.xxx = 'xxx'
      return 'ok'
    }
  }
})
// 使用它只是调用它：

const returnValue = store.doSideEffect()
// 动作可以返回任何值或不返回任何值，它可以接收任意数量的不同类型的参数。参数类型和返回类型不能丢失，这意味着类型检查必须在调用端可用。

// 可以通过它访问和改变状态。 Getter 可以通过它访问，但它们是只读的。


// 答案

declare function defineStore<S, G, A>(store: {
  id: string;
  state: () => S;
  getters: G &
    ThisType<
      Readonly<S> & { [K in keyof G]: G[K] extends () => infer R ? R : never }
    >;
  actions: A & ThisType<S & A>;
}): S & { [K in keyof G]: G[K] extends () => infer R ? R : never } & A;


// 实现 Camelize，将对象从 snake_case 转换为 camelCase

// 答案
type Transform<K extends string> = K extends `${infer A}_${infer B}`
  ? `${Capitalize<A>}${Transform<B>}`
  : Capitalize<K>;

type CamelizeArr<T> = T extends [infer First, ...infer Rest]
  ? [Camelize<First>, ...CamelizeArr<Rest>]
  : [];

type Camelize<T> = T extends object
  ? {
      [K in keyof T as K extends `${infer A}_${infer B}`
        ? `${A}${Transform<B>}`
        : K]: T[K] extends unknown[] ? CamelizeArr<T[K]> : Camelize<T[K]>;
    }
  : T;

//  例如
Camelize<{
  some_prop: string, 
  prop: { another_prop: string },
  array: [{ snake_case: string }]
}>

// expected to be
// {
//   someProp: string, 
//   prop: { anotherProp: string },
//   array: [{ snakeCase: string }]
// }


// 从字符串中删除指定的字符。

// 答案 
type DropString<S, R extends string> = R extends `${infer A}${infer B}`
  ? S extends `${infer C}${A}${infer Rest}`
    ? DropString<`${C}${DropString<Rest, A>}`, B>
    : S
  : S;

// 例如：
type Butterfly = DropString<'foobar!', 'fb'> // 'ooar!'


// 众所周知的split（）方法通过查找分隔符将字符串拆分为子字符串数组，并返回新数组。这个挑战的目标是通过使用分隔符拆分字符串，但在类型系统中！

// 答案

type Split<S extends string, SEP extends string,Res extends string[] = []> = string extends S ? string[] : S extends SEP ? Res : S extends `${infer First}${SEP}${infer Last}` ? Split<Last,SEP,[...Res,First]> : [...Res,S]


// 例如：
type result = Split<'Hi! How are you?', ' '>  // should be ['Hi!', 'How', 'are', 'you?']


// 实现泛型类公钥，它返回一个类的所有公钥。

type ClassPublicKeys<T> = keyof T;

// 例如：
class A {
  public str: string
  protected num: number
  private bool: boolean
  getNum() {
    return Math.random()
  }
}

type publicKyes = ClassPublicKeys<A> // 'str' | 'getNum'


// 实现一个通用IsRequiredKey<T，K>，返回K是否是T的必需键。

type IsRequiredKey<
  TObject,
  TKey extends keyof TObject,
  TRequiredObject extends TObject = Required<TObject>
> = TObject[TKey] extends TRequiredObject[TKey] ? true : false

// 例如
type A = IsRequiredKey<{ a: number, b?: string },'a'> // true
type B = IsRequiredKey<{ a: number, b?: string },'b'> // false
type C = IsRequiredKey<{ a: number, b?: string },'b' | 'a'> // false


// 实现 Object.fromEntries 的类型版本

// 答案

type ObjectFromEntries<TEntries extends [string, unknown]> = {
  [key in TEntries[0]]: TEntries extends [key, infer Value] ? Value : never;
};

// 例如：

interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];

type result = ObjectFromEntries<ModelEntries> // expected to be Model


// 实现类型 IsPalindrome<T> 以检查字符串或数字是否为回文。

// 答案
type Reverse<TValue extends string> = TValue extends `${infer First}${infer Rest}`
  ? `${Reverse<Rest>}${First}`
  : TValue;

type IsPalindrome<TValue extends string | number> = `${TValue}` extends Reverse<`${TValue}`>
  ? true
  : false;
// 例如：

IsPalindrome<'abc'> // false
IsPalindrome<121> // true


// 实现高级实用程序类型 MutableKeys，它将所有可变（非只读）键选择到一个联合中。

// 答案
type MutableKeys<T> =
  keyof {
    [
    K in keyof T as
    MyEqual<{ [P in K]: T[P] }, { readonly [P in K]: T[P] }> extends true ? (
      never
    ) : K
    ]: T[K]
  }

type MyEqual<A, B> = (<T>() => T extends A ? 1 : 0) extends (<T>() => T extends B ? 1 : 0) ? true : false

// 例如：

type Keys = MutableKeys<{ readonly foo: string; bar: number }>;
// expected to be “bar”


// 实现 Lodash.intersection 的类型版本，略有不同。 Intersection 接受一个包含多个数组或任何类型元素（包括联合类型）的 Array T，并返回一个包含所有交集元素的新联合。


// 答案
type Intersection<T> = T extends [infer First, ...infer Rest]
  ? (First extends unknown[] ? First[number] : First) & Intersection<Rest>
  : unknown;

// 例如
type Res = Intersection<[[1, 2], [2, 3], [2, 2]]>; // expected to be 2
type Res1 = Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>; // expected to be 2 | 3
type Res2 = Intersection<[[1, 2], [3, 4], [5, 6]]>; // expected to be never
type Res3 = Intersection<[[1, 2, 3], [2, 3, 4], 3]>; // expected to be 3
type Res4 = Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>; // expected to be 2 | 3
type Res5 = Intersection<[[1, 2, 3], 2, 3]>; // expected to be never


// 实现 BinaryToDecimal<S>，它接受由 0 和 1 组成的精确字符串类型 S，并在 S 被视为二进制时返回与 S 对应的精确数字类型。 您可以假设 S 的长度等于或小于 8 并且 S 不为空。


// 答案
type BinaryToDecimal<S extends string, Count extends 1[] = []> =
  S extends `${infer First extends '0' | '1'}${infer Rest}` ? (
    BinaryToDecimal<Rest, [...(First extends '1' ? [1] : []),...Count, ...Count]>
  ) : Count['length']


// 例如，
type Res1 = BinaryToDecimal<'10'>; // expected to be 2
type Res2 = BinaryToDecimal<'0011'>; // expected to be 3


// 获取所有可能被_调用的路径。获取（lodash函数）以获取对象的值

// 答案
type ObjectKeyPaths<T extends object, P extends string = never> =
  P | {
    [K in keyof T & (string | number)]:
    T[K] extends object ? (
      ObjectKeyPaths<T[K], AddPrefix<P, K>>
     ) : AddPrefix<P, K>
  }[keyof T & (string | number)]

type AddPrefix<P extends string, Path extends  & string | number> =
  [P] extends [never] ? (
    `${Path}`
  ) : Path extends number ? (
    `${P}.${Path}` | `${P}[${Path}]` | `${P}.[${Path}]`
  ) : `${P}.${Path}`

// 例如
type T1 = ObjectKeyPaths<{ name: string; age: number }>; // expected to be 'name' | 'age'
type T2 = ObjectKeyPaths<{
  refCount: number;
  person: { name: string; age: number };
}>; // expected to be 'refCount' | 'person' | 'person.name' | 'person.age'
type T3 = ObjectKeyPaths<{ books: [{ name: string; price: number }] }>; // expected to be the superset of 'books' | 'books.0' | 'books[0]' | 'books.[0]' | 'books.0.name' | 'books.0.price' | 'books.length' | 'books.find'


// 给定一个整数nums数组和一个整数目标，如果两个数字相加到目标，则返回true。

type N2Array<N extends number, A extends any[] = []> = A['length'] extends N ? A : N2Array<N, [...A, 1]>

type SubN<A extends number, B extends number> = 
  N2Array<A> extends [...N2Array<B>, ...infer F]
    ? F['length']
    : never

type TwoSum<T extends number[], U extends number, M extends number = -1> = 
  T extends [infer F extends number, ...infer Rest  extends number[]]
    ? F extends M
      ? true
      : TwoSum<Rest, U, M | SubN<U, F>>
    : false



// 实现ValidDate类型，该类型接受输入类型T并返回T是否为有效日期。



// 答案

type ValidDate<T extends string> = T extends `${infer M1}${infer M2}${infer D1}${infer D2}${infer Rest}` ? Rest extends '' ?
  `${M1}${M2}` extends keyof MonthDays ?
    `${D1}${D2}` extends '00' ? false :
      InRange<MonthDays[`${M1}${M2}`], `${D1}${D2}`>
  : false
: false : false;

type MonthDays = {
  '01': '31',
  '02': '28',
  '03': '31',
  '04': '30',
  '05': '31',
  '06': '30',
  '07': '31',
  '08': '31',
  '09': '30',
  '10': '31',
  '11': '30',
  '12': '31',
}

type GreaterMap = {
  '0': [],
  '1': ['0'],
  '2': ['1', '0'],
  '3': ['2', '1', '0'],
  '4': ['3', '2', '1', '0'],
  '5': ['4', '3', '2', '1', '0'],
  '6': ['5', '4', '3', '2', '1', '0'],
  '7': ['6', '5', '4', '3', '2', '1', '0'],
  '8': ['7', '6', '5', '4', '3', '2', '1', '0'],
  '9': ['8', '7', '6', '5', '4', '3', '2', '1', '0'],
}

type Greater<A extends string, B extends string> = A extends keyof GreaterMap ? Contains<B, GreaterMap[A]> : never;
type Contains<B extends string, ARR extends any[]> = ARR extends [infer Head, ...infer Rest] ?
  Eq<B, Head> extends true ? true : Contains<B, Rest>
: false;
type GreaterOrEq<A extends string, B extends string> = Greater<A, B> extends true ? true : Eq<A, B>;
type Eq<A extends any, B extends any> = A extends B ? B extends A ? true : false : false;

type InRange<R extends string, T extends string> = R extends `${infer R1}${infer R2}` ?
  T extends `${infer T1}${infer T2}` ?
    Greater<R1, T1> extends true ? true : Eq<R1, T1> extends true ? GreaterOrEq<R2, T2> : false
  : never
: never;

// 不考虑闰年

// 例如
ValidDate<'0102'> // true
ValidDate<'0131'> // true
ValidDate<'1231'> // true
ValidDate<'0229'> // false
ValidDate<'0100'> // false
ValidDate<'0132'> // false
ValidDate<'1301'> // false



// 您有一个目标对象和一个对象的源数组。您需要将属性从源复制到目标，如果它与源具有相同的属性，则应始终保留源属性，并删除目标属性。（受Object.assign API启发）


// 答案
type Copy<T> = {
	[P in keyof T]: T[P]
}

type Assign<T extends Record<string, unknown>, U extends unknown[]> =
U extends [infer F, ...infer Rest]
? F extends Record<string, unknown> 
	? Copy<Assign<Omit<T, keyof F> & F, Rest>>
	: Copy<Assign<T, Rest>>
: T

// 例如

type Target = {
  a: 'a'
}

type Origin1 = {
  b: 'b'
}

// type Result = Assign<Target, [Origin1]>
type Result = {
  a: 'a'
  b: 'b'
}

// 将对象的键大写，如果值是数组，则遍历数组中的对象。

// 答案

type CapitalizeArr<T,Res extends any[] = []> 
= T extends [infer Start,...infer End] 
? CapitalizeArr<End,[...Res,CapitalizeNestObjectKeys<Start> ]>
: Res

type CapitalizeNestObjectKeys<T>
 = T extends any[] 
? CapitalizeArr<T> 
: {
   [key in keyof T as Capitalize<key & string>]: CapitalizeNestObjectKeys<T[key]>
 }


//  实现泛型GetReadonlyKeys<T>，GetReadonlyKeys<T>返回由对象 T 所有只读属性的键组成的联合类型。

// 答案
type GetReadonlyKeys<T> = keyof {
  [K in keyof T as Equal<T[K], Readonly<T[K]>> extends true ? K : never]: T[K]
}

// 例如

interface Todo {
  readonly title: string
  readonly description: string
  completed: boolean
}

type Keys = GetReadonlyKeys<Todo> // expected to be "title" | "description"



// 您需要实现类型级解析器，将URL查询字符串解析为对象文字类型。



// 一些详细要求：



// 查询字符串中键的值可以忽略，但仍可以解析为true。例如，“key”没有值，因此解析器结果为{key:true}。

// 重复的密钥必须合并为一个密钥。如果同一个键有不同的值，则必须将值合并为元组类型。

// 当一个键只有一个值时，该值不能包装为元组类型。

// 如果具有相同键的值出现多次，则必须将其视为一次。例如，键=值&键=值必须仅视为键=值。


// 答案

type Merge<A, B, AKey extends keyof A = keyof A, BKey extends keyof B = keyof B> = {
  [K in AKey | BKey]: K extends AKey
    ? K extends BKey
      ? B[K] extends A[K]
        ? B[K]
        : [B[K], A[K]]
      : A[K]
    : K extends BKey
      ? B[K]
      : never
}

type ParseQueryStringItem<T extends string> = T extends `${infer K}=${infer V}`
  ? { [k in K]: V }
  : { [k in T]: true }

type ParseQueryString<
  T extends string,
  Obj extends Record<string, any> = {}
> = T extends ''
  ? Obj
  : T extends `${infer V}&${infer Rest}`
    ? ParseQueryString<Rest, Merge<ParseQueryStringItem<V>, Obj>>
    : ParseQueryString<'', Merge<ParseQueryStringItem<T>, Obj>>

type Test = ParseQueryString<'k1=v1&k2=v2&k1=v2'>;



// 实现JavaScript数组。类型系统中的切片函数。Slice<Arr，Start，End>接受三个参数。从索引开始到结束，输出应该是Arr的子阵列。带负数的索引应从相反方向计数。

// 答案 
/* utils */

type Get<T, K> = K extends keyof T ? T[K] : never;

type IsNegative<T> = T extends `-${string}` ? true : false;

type ToUnion<Arr> = Arr extends unknown[] ? Arr[number] : never;

/* WithIndices */

type Reverse<Arr> = Arr extends [infer First, ...infer Rest]
  ? [...Reverse<Rest>, First]
  : [];

type Shift<Arr> = Arr extends [unknown, ...infer Rest] ? Rest : never;

type Unshift<Arr, T = unknown> = Arr extends unknown[] ? [T, ...Arr] : never;

type WithIndex<Arr> = {
  [Key in keyof Arr]: {
    index: Key;
    value: Arr[Key];
  };
};

type WithNegativeIndex<WithIndexArr> = {
  [Key in keyof WithIndexArr]: {
    indices:
      | Get<WithIndexArr[Key], 'index'>
      | `-${Key extends string ? Key : never}`;
    value: Get<WithIndexArr[Key], 'value'>;
  };
};

type WithIndices<Arr> = Reverse<
  Shift<WithNegativeIndex<Unshift<Reverse<WithIndex<Arr>>>>>
>;

/* helpers */

type PickIndices<WithIndicesArr> = {
  [Key in keyof WithIndicesArr]: Get<WithIndicesArr[Key], 'indices'>;
};

type ExtractIndices<WithIndicesArr, Indices> = WithIndicesArr extends [
  infer First,
  ...infer Rest,
]
  ? Get<First, 'indices'> extends Indices
    ? [Get<First, 'value'>, ...ExtractIndices<Rest, Indices>]
    : ExtractIndices<Rest, Indices>
  : [];

/* main */

type Slice<
  Arr,
  Start extends number = 0,
  End extends number | string = '',
> = InnerSlice<WithIndices<Arr>, `${Start}`, `${End}`>;

type InnerSlice<
  WithIndicesArr,
  Start,
  End,
  IndicesArr = PickIndices<WithIndicesArr>,
> = ExtractIndices<
  WithIndicesArr,
  TakeFrom<IndicesArr, Start> &
    (End extends '' ? ToUnion<IndicesArr> : TakeTo<IndicesArr, End>)
>;

type TakeFrom<IndicesArr, From> = From extends ToUnion<IndicesArr>
  ? InnerTakeFrom<IndicesArr, From>
  : IsNegative<From> extends true
  ? ToUnion<IndicesArr>
  : never;

type InnerTakeFrom<IndicesArr, From> = IndicesArr extends [
  infer First,
  ...infer Rest,
]
  ? From extends First
    ? ToUnion<IndicesArr>
    : TakeFrom<Rest, From>
  : never;

type TakeTo<IndicesArr, To> = To extends ToUnion<IndicesArr>
  ? InnerTakeTo<IndicesArr, To>
  : IsNegative<To> extends true
  ? never
  : ToUnion<IndicesArr>;

type InnerTakeTo<IndicesArr, To> = IndicesArr extends [
  ...infer Rest,
  infer Last,
]
  ? To extends Last
    ? ToUnion<Rest>
    : TakeTo<Rest, To>
  : never;

// 例如

type Arr = [1, 2, 3, 4, 5]
type Result = Slice<Arr, 2, 4> // expected to be [3, 4]



// 实现一个类型级整数比较器。我们提供了一个枚举来指示比较结果，如下所示：



// 如果a大于b，则类型应为Comparison.greater。

// 如果a和b相等，则类型应为Comparison.equal。

// 如果a低于b，则类型应为Comparison.lower。

// 注意，a和b可以是正整数、负整数或零，甚至一个是正的，而另一个是负的。

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type Comparator_ToNumber<A extends string, T extends any[] = []> = `${T['length']}` extends `${A}` ? T['length'] : Comparator_ToNumber<A, [...T, 1]>
type Comparator_ABS<A extends number> = `${A}` extends `-${infer U}` ? Comparator_ToNumber<U> : A
// A 正 B 负
// A 负 B 正
// 比较两个正整数，数组从 0 开始，如果先匹配 A ，说明 B 大，先匹配 B，说明 A 大
type Comparator_CORE<A extends number, B extends number, T extends any[] = []> =
  T['length'] extends A
    ? T['length'] extends B
      ? Comparison.Equal
      : Comparison.Lower
    : T['length'] extends B
      ? Comparison.Greater
      : Comparator_CORE<A, B, [...T, 1]>

type Comparator<A extends number, B extends number> =
  A extends Comparator_ABS<A>
    ? B extends Comparator_ABS<B>
      ? Comparator_CORE<A, B> // A 正 B 正
      : Comparison.Greater
    : B extends Comparator_ABS<B>
      ? Comparison.Lower
      : Comparator_CORE<Comparator_ABS<B>, Comparator_ABS<A>> // A 负 B 负



// curry是一种将具有多个参数的函数转换为一系列函数的技术，每个函数都具有一个参数。



// 但在我们的日常生活中，currying动态参数也很常用，例如函数。绑定（this，[…params]）API。

const func = (a: number, b: number, c: number) => {
  return a + b + c
}

const bindFunc = func(null, 1, 2)

const result = bindFunc(3) // result: 6

// 因此，基于curry 1，我们需要动态参数版本：

const add = (a: number, b: number, c: number) => a + b + c
const three = add(1, 1, 1) 

const curriedAdd = DynamicParamsCurrying(add)
const six = curriedAdd(1, 2, 3)
const seven = curriedAdd(1, 2)(4)
const eight = curriedAdd(2)(3)(4)


// 在这个挑战中，dynamicparamscrurrying可能需要一个具有零到多个参数的函数，您需要正确地键入它。返回的函数可以接受至少一个参数。当所有参数都满足时，它应该正确地生成原始函数的返回类型。

//答案

declare function DynamicParamsCurrying<Fn extends (...args: any) => any>(
  fn: Fn,
): CurriedType<ReturnType<Fn>, Parameters<Fn>>;

type Func<Params, Ret> = (
  ...params: Params extends unknown[] ? Params : never
) => Ret;

type CurriedType<Ret, Params, Current = []> = Params extends [
  ...infer Rest,
  infer Last,
]
  ? Rest extends []
    ? Func<Params, Current extends [] ? Ret : CurriedType<Ret, Current>>
    : Func<Params, Current extends [] ? Ret : CurriedType<Ret, Current>> &
        CurriedType<
          Ret,
          Rest,
          [Last, ...(Current extends unknown[] ? Current : never)]
        >
  : never;


  // 实现一个类型Sum<a，B>，将两个非负整数相加，并将总和作为字符串返回。数字可以指定为字符串、数字或bigint。

// 答案
/* utils */

type Get<T, K> = K extends keyof T ? T[K] : never;

type AsStr<T> = T extends string ? T : never;

type Reverse<S> = S extends `${infer First}${infer Rest}`
  ? `${Reverse<Rest>}${First}`
  : '';

type Head<S> = S extends `${infer First}${string}` ? First : never;
type Tail<S> = S extends `${string}${infer Rest}` ? Rest : never;

type Replace<S, C extends string> = S extends `${string}${infer Rest}`
  ? `${C}${Replace<Rest, C>}`
  : '';

type Rotate<S> = `${Tail<S>}${Head<S>}`;

type Zip<From, To> = From extends `${infer First}${infer Rest}`
  ? Record<First, Head<To>> & Zip<Rest, Tail<To>>
  : {};

/* digits */

type Digits = '0123456789';

type Zero = Head<Digits>;
type One = Head<Tail<Digits>>;

/* helpers */

type GenerateAdd<
  To,
  Current = Digits,
> = Current extends `${infer First}${infer Rest}`
  ? Record<First, Zip<Digits, To>> & GenerateAdd<Rotate<To>, Rest>
  : {};
type InnerAdd = GenerateAdd<Digits>;
type Add<A, B> = AsStr<Get<Get<InnerAdd, A>, B>>;

type GenerateCarry<
  To,
  Current = Digits,
> = Current extends `${infer First}${infer Rest}`
  ? Record<First, Zip<Digits, To>> & GenerateCarry<`${Tail<To>}${One}`, Rest>
  : {};
type CarryWithZero = GenerateCarry<Replace<Digits, Zero>>;
type CarryWithOne = GenerateCarry<`${Tail<Replace<Digits, Zero>>}${One}`>;
type Carry<A, B, C> = C extends Zero
  ? AsStr<Get<Get<CarryWithZero, A>, B>>
  : AsStr<Get<Get<CarryWithOne, A>, B>>;

/* main */

type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint,
> = Reverse<InnerSum<Reverse<`${A}`>, Reverse<`${B}`>>>;

type InnerSum<
  A extends string,
  B extends string,
  C extends string = Zero,
> = A extends `${infer FirstA}${infer RestA}`
  ? B extends `${infer FirstB}${infer RestB}`
    ? `${Add<Add<FirstA, FirstB>, C>}${InnerSum<
        RestA,
        RestB,
        Carry<FirstA, FirstB, C>
      >}`
    : InnerSum<A, C>
  : B extends ''
  ? C extends Zero
    ? ''
    : C
  : InnerSum<B, C>;


// 例如

type T0 = Sum<2, 3> // '5'
type T1 = Sum<'13', '21'> // '34'
type T2 = Sum<'328', 7> // '335'
type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'



// 这个挑战从476-Sum开始，建议您首先完成这个挑战，并在此基础上修改代码以开始这个挑战。



// 实现一个乘法类型，将两个非负整数相乘，并将其乘积作为字符串返回。数字可以指定为string、number或bigint。


// 答案
/* utils */

type Get<T, K> = K extends keyof T ? T[K] : never;

type AsStr<T> = T extends string ? T : never;

type Reverse<S> = S extends `${infer First}${infer Rest}`
  ? `${Reverse<Rest>}${First}`
  : '';

type Head<S> = S extends `${infer First}${string}` ? First : never;
type Tail<S> = S extends `${string}${infer Rest}` ? Rest : never;

type Replace<S, C extends string> = S extends `${string}${infer Rest}`
  ? `${C}${Replace<Rest, C>}`
  : '';

type Rotate<S> = `${Tail<S>}${Head<S>}`;

type Zip<From, To> = From extends `${infer First}${infer Rest}`
  ? Record<First, Head<To>> & Zip<Rest, Tail<To>>
  : {};

/* digits */

type Digits = '0123456789';

type Zero = Head<Digits>;
type One = Head<Tail<Digits>>;

/* helpers */

type GenerateAdd<
  To,
  Current = Digits,
> = Current extends `${infer First}${infer Rest}`
  ? Record<First, Zip<Digits, To>> & GenerateAdd<Rotate<To>, Rest>
  : {};
type InnerAdd = GenerateAdd<Digits>;
type Add<A, B> = AsStr<Get<Get<InnerAdd, A>, B>>;

type GenerateCarry<
  To,
  Current = Digits,
> = Current extends `${infer First}${infer Rest}`
  ? Record<First, Zip<Digits, To>> & GenerateCarry<`${Tail<To>}${One}`, Rest>
  : {};
type CarryWithZero = GenerateCarry<Replace<Digits, Zero>>;
type CarryWithOne = GenerateCarry<`${Tail<Replace<Digits, Zero>>}${One}`>;
type Carry<A, B, C> = C extends Zero
  ? AsStr<Get<Get<CarryWithZero, A>, B>>
  : AsStr<Get<Get<CarryWithOne, A>, B>>;

/* sum main */

// type Sum<
//   A extends string | number | bigint,
//   B extends string | number | bigint,
// > = Reverse<InnerSum<Reverse<`${A}`>, Reverse<`${B}`>>>;

type InnerSum<
  A extends string,
  B extends string,
  C extends string = Zero,
> = A extends `${infer FirstA}${infer RestA}`
  ? B extends `${infer FirstB}${infer RestB}`
    ? `${Add<Add<FirstA, FirstB>, C>}${InnerSum<
        RestA,
        RestB,
        Carry<FirstA, FirstB, C>
      >}`
    : InnerSum<A, C>
  : B extends ''
  ? C extends Zero
    ? ''
    : C
  : InnerSum<B, C>;

/* multiply utils */

type ZipArr<From, ToArr> = ToArr extends [infer First, ...infer Rest]
  ? Record<Head<From>, First> & ZipArr<Tail<From>, Rest>
  : {};

type ToArr<S> = S extends `${infer First}${infer Rest}`
  ? [First, ...ToArr<Rest>]
  : [];

/* multiply helpers */

type DigitArr = ToArr<Digits>;
type AddDigitArr<Arr> = {
  [Key in keyof Arr]: InnerSum<AsStr<Arr[Key]>, Get<DigitArr, Key>>;
};

type GenerateMulTable<
  ToArr,
  Current = Digits,
> = Current extends `${infer First}${infer Rest}`
  ? Record<First, ZipArr<Digits, ToArr>> &
      GenerateMulTable<AddDigitArr<ToArr>, Rest>
  : {};
type InnerMulTable = GenerateMulTable<ToArr<Replace<Digits, Zero>>>;
type MulTable<A, B> = AsStr<Get<Get<InnerMulTable, A>, B>>;

type TrimEndZeros<S> = S extends `${infer T}0` ? TrimEndZeros<T> : S;

/* main */

type Multiply<
  A extends string | number | bigint,
  B extends string | number | bigint,
> = Reverse<InnerMultiply<Reverse<`${A}`>, Reverse<`${B}`>>>;

type InnerMultiply<
  A extends string,
  B extends string,
> = A extends `${infer FirstA}${infer RestA}`
  ? B extends `${infer FirstB}${infer RestB}`
    ? InnerSum<
        MulTable<FirstA, FirstB>,
        InnerSum<
          TrimEndZeros<`${Zero}${InnerMultiply<RestA, FirstB>}`>,
          InnerSum<
            TrimEndZeros<`${Zero}${InnerMultiply<RestB, FirstA>}`>,
            TrimEndZeros<`${Zero}${Zero}${InnerMultiply<RestB, RestA>}`>
          >
        >
      >
    : ''
  : '';


// 例如

type T0 = Multiply<2, 3> // '6'
type T1 = Multiply<3, '5'> // '15'
type T2 = Multiply<'4', 10> // '40'
type T3 = Multiply<0, 16> // '0'
type T4 = Multiply<'13', '21'> // '273'
type T5 = Multiply<'43423', 321543n> // '13962361689'



// 尽管TypeScript中有结构类型系统，但有时用标记标记某些类型是很方便的，这样这些标记就不会干扰将这些类型的值分配给彼此的能力。



// 答案
type GetTags<B> =
  Tagged extends keyof IfNeverOrAny<B, unknown> ? (
    IfUndefined<B[Tagged], never> extends infer TagValue ? (
      IfUndefined<TagValue[keyof TagValue & string], never>
    ) : never
  ) : []

type Tag<B, T extends string> =
  [IfNeverOrAny<B, unknown>] extends [null | undefined] ? (
    B
  ) : { readonly [Tag in Tagged]?: GetTagValue<[...GetTags<B>, T]> }
  & { [K in keyof IfNeverOrAny<B, unknown> as K extends Tagged ? never : K]: B[K] } extends infer TaggedB ? (
    { [K in keyof TaggedB]: TaggedB[K] }
  ) : never

type UnTag<B> =
  Tagged extends keyof IfNeverOrAny<B, unknown> ? (
    { [K in keyof B as K extends Tagged ? never : K]: B[K] }
  ) : B

type HasTag<B, T extends string> =
  `\n${GetSerializedTags<B>}` extends `${string}\n${T}\n${string}` ? true : false

type HasTags<B, T extends readonly string[]> =
  `\n${GetSerializedTags<B>}` extends `${string}\n${SerializeTags<T>}${string}` ? true : false

type HasExactTags<B, T extends readonly string[]> =
  `${GetSerializedTags<B>}` extends `${SerializeTags<T>}` ? true : false

declare const TaggedSymbol: unique symbol

type Tagged = typeof TaggedSymbol
type IfUndefined<T, Replacement> = T extends undefined ? Replacement : T
type IfNeverOrAny<T, Replacement> = [T] extends [never] ? Replacement : 1 extends T & 0 ? Replacement : T

type GetSerializedTags<B> =
  Tagged extends keyof IfNeverOrAny<B, unknown> ? (
    IfUndefined<B[Tagged], never> extends infer TagValue ? (
      IfNeverOrAny<keyof TagValue & string, ''>
    ) : never
  ) : ''

type SerializeTags<Tags extends readonly string[]> =
  Tags extends [`${infer First}`, ...infer Rest extends string[]] ? (
    `${First}\n${SerializeTags<Rest>}`
  ) : ''

type GetTagValue<NewTag extends string[]> =
  { 1: 1 } & // we need this in order to assign to other Tagged object
  { [K in SerializeTags<NewTag>]?: NewTag } extends infer TagValue ? (
    { [K in keyof TagValue as K extends '' ? never : K]: TagValue[K] }
  ) : never


// 例如，使用标记，可以检查某些值是否按正确顺序通过所需函数的调用：

const doA = <T extends string>(x: T) => {
  const result = x

  return result as Tag<typeof result, 'A'>
}

const doB = <T extends string>(x: T) => {
  const result = x

  return result as Tag<typeof result, 'B'>
};

const a = doA('foo')
const b = doB(a)

type Check0 = IsTrue<HasTags<typeof b, ['A', 'B']>>

// 编写一个函数标记，它接受除null和未定义之外的类型B，并返回一个用字符串文字类型T标记的类型。




// 标记的类型必须与相应的原始类型相互分配：

declare let x: string
declare let y: Tag<string, 'A'>

x = y = x
// 在标记已用标记标记的类型时，必须将新标记添加到该类型的所有标记列表的末尾：

type T0 = Tag<{ foo: string }, 'A'>
type T1 = Tag<T0, 'B'>

type Check1 = IsTrue<HasExactTags<T1, ['A', 'B']>>
// 添加一些函数以检查类型标记。

// GetTags检索类型B的所有标记的列表：

type T2 = Tag<number, 'C'>

type Check2 = IsTrue<Equal<GetTags<T2>, ['C']>>
// HasTag<B，T扩展字符串>检查类型B是否用标记T标记（并返回true或false）：

type T3 = Tag<0 | 1, 'D'>

type Check3 = IsTrue<HasTag<T3, 'D'>>
// HasTags<B，T扩展只读字符串[]>检查类型B是否连续使用元组T中的标记进行标记：

type T4 = Tag<Tag<Tag<{}, 'A'>, 'B'>, 'C'>

type Check4 = IsTrue<HasTags<T4, ['B', 'C']>>
// HasExactTags<B，T扩展只读字符串[]>检查类型B的所有标记的列表是否完全等于T元组：

type T5 = Tag<Tag<unknown, 'A'>, 'B'>

type Check5 = IsTrue<HasExactTags<T5, ['A', 'B']>>
// 最后，添加类型UnTag，从类型B中删除所有标记：

type T6 = Tag<{ bar: number }, 'A'>
type T7 = UnTag<T6>

type Check6 = IsFalse<HasTag<T7, 'A'>>




// 类型系统中的递归深度是TypeScript的限制之一，大约为45。



// 我们需要更深入。我们可以更深入。



// 在这个挑战中，您将获得一个较低的边界和一个较高的边界，通过该边界，一系列自然数被包括切片。您应该开发一种技术，使您能够进行比限制更深的递归，因为两个边界都在0到200之间变化。



// 注意，当下限>上限时，输出一个空元组。

// 从TypeScript 4.5开始，编译器对条件类型执行尾部递归消除，任务可以更容易地解决。大多数已发布的解决方案都依赖于问题发布后引入的此功能



// 带尾部递归消除的解决方案-适用于TypeScript 4.5+

type InclusiveRange<
  Lower extends number,
  Higher extends number,
  Res extends number[] = [],
  Padding extends 0[] = [],
  Current extends number = [...Padding, ...Res]['length'] & number
>
  = Current extends Higher
    ? Current extends Lower
      ? [Current]
      : Res extends []
        ? []
        : [...Res, Current]
    : Current extends Lower
      ? InclusiveRange<Lower, Higher, [Current], Padding>
      : Res extends []
        ? InclusiveRange<Lower, Higher, [], [...Padding, 0]>
        : InclusiveRange<Lower, Higher,  [...Res, Current], Padding>
        
// 无尾部递归消除的解决方案-适用于TypeScript v4.4.4

type InclusiveRange<
  Lower extends number,
  Higher extends number,
  All extends number[] = [],
  Res extends number[] = [],
  Next extends number[] = GetNext6<All>,
  End extends number[] = LeftOf<Next, Higher>
>
  = End extends []
    ? Res extends []
      ? InclusiveRange<Lower, Higher, [...All, ...Next], RightOf<Next, Lower>>
      : InclusiveRange<Lower, Higher, [...All, ...Next], [...Res, ...Next]>
    : Res extends []
      ? RightOf<End, Lower>
      : [...Res, ...End]

// <[1, 2, 3, 4, 5], 3> -> [1, 2, 3]; <[1, 2, 3], 0> -> []; <[1, 2, 3], 5> -> []
type LeftOf<A, N> = A extends [...infer L, infer R] ? N extends R ? A : LeftOf<L, N> : []
// <[1, 2, 3, 4, 5], 3> -> [3, 4, 5]; <[1, 2, 3], 0> -> []; <[1, 2, 3], 5> -> []
type RightOf<A, N> = A extends [infer L, ...infer R] ? N extends L ? A : RightOf<R, N> : []

// <[0, 1, 2, 3, 4, 5]> -> [6, 7, 8, 9, 10, 11]
type GetNext6<A extends number[]> = [
  [...A]['length'] & number,
  [...A, 0]['length'] & number,
  [...A, 0, 0]['length'] & number,
  [...A, 0, 0, 0]['length'] & number,
  [...A, 0, 0, 0, 0]['length'] & number,
  [...A, 0, 0, 0, 0, 0]['length'] & number,
];




// 在这个挑战中，您需要按升序或降序对自然数数组进行排序。

// 升序示例：

Sort<[]> // []
Sort<[1]> // [1]
Sort<[2, 4, 7, 6, 6, 6, 5, 8, 9]> //  [2, 4, 5, 6, 6, 6, 7, 8, 9]
// 排序类型也应该接受布尔类型。 如果为真，则排序结果应按下降顺序排列。 一些例子：

Sort<[3, 2, 1], true> // [3, 2, 1]
Sort<[3, 2, 0, 1, 0, 0, 0], true> // [3, 2, 1, 0, 0, 0, 0]
// 额外挑战：

// 支持 15 位以上的自然数。
// 支持浮点数。


/*
  FirstPass<[3, 2, 1]>
  SecondPass<[3, 2, 1]>
  [2, SecondPass<[3, 1]>]
  [2, 1, SecondPass<[3]>]
  [FirstPass<[2, 1]>, 3]
  [SecondPass<[2, 1]>, 3]
  [[1, SecondPass<[2]>], 3]
  [1, 2, 3]
*/
type Sort<T extends number[], Reversed extends boolean = false> =
  FirstPass<T, Reversed>

type FirstPass<T extends number[], Reversed extends boolean = false> =
  SecondPass<T, Reversed> extends [...infer Rest extends number[], infer Last extends number] ? (
    [...FirstPass<Rest, Reversed>, Last]
  ) : T

type SecondPass<T extends number[], Reversed extends boolean = false> =
  T extends [infer First extends number, infer Second extends number, ...infer Rest extends number[]] ? (
    CompareNumbers<First, Second> extends (Reversed extends true ? Comparison.Lower : Comparison.Greater) ? (
      [Second, ...SecondPass<[First, ...Rest], Reversed>]
    ) : [First, ...SecondPass<[Second, ...Rest], Reversed>]
  ) : T

enum Comparison { Greater, Equal, Lower }

// type CompareNumbers<A extends number, B extends number, Count extends 1[] = []> =
//   A extends B ? (
//     Comparison.Equal       // A = B
//   ) : (
//     Count['length'] extends B ? (
//       Comparison.Greater   // A > B
//     ) : Count['length'] extends A ? (
//       Comparison.Lower     // A < B
//     ) : CompareNumbers<A, B, [...Count, 1]>
//  )

// Try solve it w/o recursive counting 1 by 1
type CompareNumbers<A extends number, B extends number> =
  `${A}${B}` extends `-${infer NegA}-${infer NegB}` ? (
    ComparePositiveNumbers<NegB, NegA>        // both negative
  ) : `${A}` extends `-${string}` ? (
    Comparison.Lower                          // A is negative
  ) : `${B}` extends `-${string}` ? (
    Comparison.Greater                        // B is negative
  ) : ComparePositiveNumbers<`${A}`, `${B}`>  // both positive

type ComparePositiveNumbers<A extends string, B extends string> =
  [...SplitFraction<A>, ...SplitFraction<B>] extends [`${infer WholeA}`, `${infer FractionA}`, `${infer WholeB}`, `${infer FractionB}`] ? (
    WholeA extends WholeB ? (
      Comparison.Equal                        // A = B
    ) : CompareByLength<WholeA, WholeB> extends infer Result & (Comparison.Lower | Comparison.Greater) ? (
      Result                                  // A or B has more digits
    ) : CompareByDigits<WholeA, WholeB> extends infer Result & (Comparison.Lower | Comparison.Greater) ? (
      Result                                  // Whole numbers are difference
    ) : CompareFractionDigits<FractionA, FractionB>
  ) : never

type SplitFraction<N extends string> = N extends `${infer Whole}.${infer Fraction}` ? [Whole, Fraction] : [N, '']

type CompareByLength<A extends string, B extends string> =
  `${A}|${B}` extends `${string}${infer RestA}|${string}${infer RestB}` ? (
    CompareByLength<RestA, RestB>
  ) : `${A}${B}` extends '' ? (
    Comparison.Equal      // A & B same number of digits
  ) : A extends '' ? (
    Comparison.Lower      // A has less digits
  ) : Comparison.Greater  // B has less digits

type CompareByDigits<A extends string, B extends string> =
  `${A}|${B}` extends `${infer DigitA}${infer TailingA}|${infer DigitB}${infer TailingB}` ? (
    CompareDigits<DigitA, DigitB> extends infer Result & (Comparison.Lower | Comparison.Greater) ? (
      Result              // When A > B or B > A
    ) : CompareByDigits<TailingA, TailingB>
  ) : Comparison.Equal    // Assumed same length, only when A & B are ''

type CompareFractionDigits<A extends string, B extends string> =
  A extends B ? (
    Comparison.Equal      // A = B
  ) : `${A}|${B}` extends `${infer DigitA}${infer TailingA}|${infer DigitB}${infer TailingB}` ? (
    CompareDigits<DigitA, DigitB> extends infer Result & (Comparison.Lower | Comparison.Greater) ? (
      Result              // A > B or B > A
    ) : CompareFractionDigits<TailingA, TailingB>   // check next digit on right
  ) : A extends '' ? (
    Comparison.Lower       // A has less digits
  ) : Comparison.Greater   // B has less digits

type CompareDigits<A extends string, B extends string> =
  A extends B ? (
    Comparison.Equal      // A = B
  ) : '9876543210' extends `${string}${A}${string}${B}${string}` ? (
    Comparison.Greater    // A > B
  ) : Comparison.Lower    // B > A





//   实现一个分布式联合类型，它将包含联合类型的数据结构类型转换为不包含任何联合的所有可能类型的允许数据结构的联合。数据结构可以是任何嵌套级别的对象和元组的任意组合。

// 答案

type DistributeUnions<T>
  = T extends unknown[] ? DistributeArray<T>
  : T extends object ? Merge<DistributeObject<T>>
  : T

type DistributeArray<A extends unknown[]>
  = A extends [infer H, ...infer T]
  ? ArrHelper<DistributeUnions<H>, T>
  : []
type ArrHelper<H, T extends unknown[]> = H extends H ? [H, ...DistributeArray<T>] : never

type DistributeObject<O extends object, K extends keyof O = keyof O>
  = [K] extends [never] ? {}
  : K extends K ? ObjHelper<K, DistributeUnions<O[K]>> & DistributeObject<Omit<O, K>>
  : never
type ObjHelper<K, V> = V extends V ? { [k in K & string]: V } : never

type Merge<O> = { [K in keyof O]: O[K] }

// 例如：

type T1 = DistributeUnions<[1 | 2, 'a' | 'b']>
// =>   [1, 'a'] | [2, 'a'] | [1, 'b'] | [2, 'b']

type T2 = DistributeUnions<{ type: 'a', value: number | string } | { type: 'b', value: boolean }>
//  =>  | { type 'a', value: number }
//      | { type 'a', value: string }
//      | { type 'b', value: boolean }

type T3 = DistributeUnions<[{ value: 'a' | 'b' },  { x: { y: 2 | 3  } }] | 17>
//  =>  | [{ value: 'a' },  { x: { y: 2  } }]
//      | [{ value: 'a' },  { x: { y: 3  } }]
//      | [{ value: 'b' },  { x: { y: 2  } }]
//      | [{ value: 'b' },  { x: { y: 3  } }]
// 对于上下文，如果您想排除深度数据结构的案例，这种类型可能非常有用：

type ExcludeDeep<A, B> = Exclude<DistributeUnions<A>, B>

type T0 = ExcludeDeep<[{ value: 'a' | 'b' },  { x: { y: 2 | 3  } }] | 17, [{ value: 'a' },  any]>
//  =>  | [{ value: 'b' },  { x: { y: 2  } }]
//      | [{ value: 'b' },  { x: { y: 3  } }]
//      | 17





// 有时我们想使用带有索引的老式 for 循环来遍历数组，但在这种情况下，TypeScript 不会以任何方式检查我们正在访问数组的实际索引处的元素（不超过 数组），并且我们没有使用任意数字作为索引，或者来自另一个数组的索引（对于嵌套循环，用于遍历矩阵或图形）：

const matrix = [
    [3, 4],
    [5, 6],
    [7, 8],
];

// This example contains no type errors when the noUncheckedIndexedAccess option is off.
for (let i = 0; i < matrix.length; i += 1) {
    const columns: number[] = matrix[i];

    for (let j = 0; j < columns.length; j += 1) {
        const current: number = columns[i]; // oops! i instead of j

        console.log(
            current.toFixed(), // TypeError: Cannot read property 'toFixed' of undefined
        );
    }
}
// 您可以启用 noUncheckedIndexedAccess 选项（在 tsconfig.json 中），但是每次访问数组元素时，您都需要检查该元素是否存在，这有点冗长且不方便，特别是因为在这种情况下 - 遍历，我们确定索引不超过数组的长度：

const numbers = [5, 7];

for (let i = 0; i < numbers.length; i += 1) {
    const current = numbers[i];

    if (current !== undefined) {
        console.log(current.toFixed());
    }
}
// 编写一个断言函数 assertArrayIndex(array, key) 可以应用于任何数组（具有任意唯一的字符串键，需要在类型级别区分数组）以允许仅通过索引访问该数组的元素 通过特殊泛型类型 Index<typeof array> 从数组中获取（此功能需要在 tsconfig.json 中启用 noUncheckedIndexedAccess 选项）：

const numbers = [5, 7];

assertArrayIndex(numbers, 'numbers');

for (let i = 0 as Index<typeof numbers>; i < numbers.length; i += 1) {
    console.log(numbers[i].toFixed());
}
// 当通过这样的索引访问时，必须保证数组中的元素存在，而当通过任何其他索引访问数组时，则没有这样的保证（该元素可能不存在）：

const matrix = [
    [3, 4],
    [5, 6],
    [7, 8],
];

assertArrayIndex(matrix, 'rows');

let sum = 0;

for (let i = 0 as Index<typeof matrix>; i < matrix.length; i += 1) {
    const columns: number[] = matrix[i];

    // @ts-expect-error: number | undefined in not assignable to number
    const x: number[] = matrix[0];

    assertArrayIndex(columns, 'columns');

    for (let j = 0 as Index<typeof columns>; j < columns.length; j += 1) {
        sum += columns[j];

        // @ts-expect-error: number | undefined in not assignable to number
        const y: number = columns[i];

        // @ts-expect-error: number | undefined in not assignable to number
        const z: number = columns[0];

        // @ts-expect-error: number[] | undefined in not assignable to number[]
        const u: number[] = matrix[j];
    }
}
// 不能在元组上调用 assertArrayIndex 函数（因为访问元素已经在其中输入）：

const tuple = [5, 7] as const;

// @ts-expect-error
assertArrayIndex(tuple, 'tuple');



// using fixed number as IndexType doesn't make sense, but it is the only answer I had
function assertArrayIndex<Array extends readonly any[], Key extends string>(
  array: number extends Array['length'] ? Array : never,  // avoid being called on tuples
  key: [Hash<Key>] extends [never] ? never : Key          // avoid assigning unsupport characters to Key
): asserts array is typeof array &                        // need to be the same type
{ readonly [IndexType]: Hash<Lowercase<Key>> } &        // pass value to Index<Array>
{ readonly [H in Hash<Lowercase<Key>>]: Array[number] } // avoid error from noUncheckedIndexedAccess
{
}

type Index<Array extends { readonly [IndexType]: number }> =
  Array extends { readonly [IndexType]: infer KeyValue } ? (
    KeyValue & number         // use KeyValue to avoid error from noUncheckedIndexedAccess
  ) : never

type Hash<Key extends string, Count extends 1[] = []> =
  Key extends `${infer First}${infer Rest}` ? (
    Hash<Rest, [...Count, ...HashMap[
      First & keyof HashMap     // will be never if First is not a supported character
    ]]>
  ) : Count['length']
type HashMap = {
  a: [],
  b: [...HashMap['a'], 1],
  c: [...HashMap['b'], 1],
  d: [...HashMap['c'], 1],
  e: [...HashMap['d'], 1],
  f: [...HashMap['e'], 1],
  g: [...HashMap['f'], 1],
  h: [...HashMap['g'], 1],
  i: [...HashMap['h'], 1],
  j: [...HashMap['i'], 1],
  k: [...HashMap['j'], 1],
  l: [...HashMap['k'], 1],
  m: [...HashMap['l'], 1],
  n: [...HashMap['m'], 1],
  o: [...HashMap['n'], 1],
  p: [...HashMap['o'], 1],
  q: [...HashMap['p'], 1],
  r: [...HashMap['q'], 1],
  s: [...HashMap['r'], 1],
  t: [...HashMap['s'], 1],
  u: [...HashMap['t'], 1],
  v: [...HashMap['u'], 1],
  w: [...HashMap['v'], 1],
  x: [...HashMap['w'], 1],
  y: [...HashMap['x'], 1],
  z: [...HashMap['y'], 1],
}

declare const IndexType: unique symbol



// 您需要实现一个类型级别的部分解析器来将 JSON 字符串解析为对象文字类型。

// 要求：

// JSON 中的数字和 Unicode 转义 (\uxxxx) 可以忽略。 你不需要解析它们。


type Pure<T> = {
  [P in keyof T]: T[P] extends object ? Pure<T[P]> : T[P]
}

type SetProperty<T, K extends PropertyKey, V> = {
  [P in (keyof T) | K]: P extends K ? V : P extends keyof T ? T[P] : never
}

type Token = '{' | '}' | '[' | ']' | ':' | ',' | `"${string}"` | null | true | false

type ParseResult<T extends Token[]> =
  T extends [infer FirstToken, ...infer RestTokens extends Token[]] ? (
    FirstToken extends '{' ? (
      ParseObjectResult<RestTokens>
    ) : FirstToken extends '[' ? (
      ParseArrayResult<RestTokens>
    ) : never
  ) : never

type Tokenize<S, T extends Token[] = []> =
  S extends `${infer First}${infer Rest}` ? (
    First extends '{' | '}' | '[' | ']' | ':' | ',' ? (
      Tokenize<Rest, [...T, First]>
    ) : First extends `"` ? (
      ParseStringResult<Rest> extends [infer Rest, infer Token extends `"${string}"`] ? (
        Tokenize<Rest, [...T, Token]>
      ) : never
    ) : First extends `t` | `f` | `n` ? (
      ParsePrimitiveResult<S> extends [infer Rest, infer Token extends `"${string}"` | null | true | false] ? (
        Tokenize<Rest, [...T, Token]>
      ) : never
    ) : First extends `0` | `1` | `2` | `3` | `4` | `5` | `6` | `7` | `8` | `9` | `-` ? (
      ParseNumberResult<Rest, First> extends [infer Rest, infer Token extends `"${string}"`] ? (
        // Tokenize<Rest, [...T, Token]>
        never
      ) : never
    ) : First extends ` ` | `\t` | `\n` ? (
      Tokenize<Rest, T>
    ) : never
  ) : T

type ParseLiteral<T extends Token[]> =
  T extends [`"${string}"` | null | true | false] ? (
    [ParseLiteralResult<T[0]>]
  ) : ParseResult<T>

// 1. Tokenize: {"F": {"true": false}} >> [`{`, `"F"`, `:`, `{`, "true", `:`, `false`, `}`, `}`]
// 2. ParseLiteral: [`{`, "F", `:`, `{`, `"true"`, `:`, `false` `}`, `}`] >> [`{`, `F`, `:`, `{`, true, `:`, false, `}`, `}`]
// 3. ParseResult: [`{`, `F`, `:`, `{`, true, `:`, false, `}`, `}`] >> [{F:{true:false}]
type Parse<T extends string> = Pure<ParseLiteral<Tokenize<T>>[0]>

type ParseLiteralResult<T extends `"${string}"` | null | true | false> =
  T extends `"${infer StringContent}"` ? (
    UnescapeString<StringContent>
  ) : T

type UnescapeString<S extends string> =
  S extends `${infer First}${infer Second}${infer Rest}` ? (
    `${First}${Second}` extends `\\n` ? (
      `\n${UnescapeString<Rest>}`
    ) : `${First}${Second}` extends `\\r` ? (
      `\r${UnescapeString<Rest>}`
    ) : `${First}${Second}` extends `\\f` ? (
      `\f${UnescapeString<Rest>}`
    ) : `${First}${Second}` extends `\\b` ? (
      `\b${UnescapeString<Rest>}`
    ) : `${First}${Second}` extends `\\t` ? (
      `\t${UnescapeString<Rest>}`
    ) : `${First}${Second}${UnescapeString<Rest>}`
  ) : S

type EscapeCharactor<S extends string> =
  S extends `n` ? (
    `\n`
  ) : S extends `r` ? (
    `\r`
  ) : S extends `f` ? (
    `\f`
  ) : S extends `b` ? (
    `\b`
  ) : S extends `t` ? (
    `\t`
  ) : S

type ParseStringResult<S extends string, Result extends string = ``> =
  S extends `\\${infer First}${infer Rest}` ? (
    ParseStringResult<Rest, `${Result}${EscapeCharactor<First>}`>
  ) : S extends `"${infer Rest}` ? (
    [Rest, `"${Result}"`]
  ) : S extends `\n${string}` ? (
    never
  ) : S extends `${infer First}${infer Rest}` ? (
    ParseStringResult<Rest, `${Result}${First}`>
  ) : never

type ParseNumberResult<S extends string, Result extends string> =
  S extends `.${infer Rest}` ? (
    Result extends `${string}.${string}` ? (
      never
    ) : ParseNumberResult<Rest, `${Result}.`>
  ) : S extends `${infer First}${infer Rest}` ? (
    First extends `0` | `1` | `2` | `3` | `4` | `5` | `6` | `7` | `8` | `9` ? (
      ParseNumberResult<Rest, `${Result}${First}`>
    ) : Result extends '-' ? (
      never
    ) : [S, `"${Result}"`]
  ) : Result extends '-' | `${string}.` ? (
    never
  ) : [S, `"${Result}"`]

type ParsePrimitiveResult<S extends string> =
  S extends `true${infer Rest}` ? (
    [Rest, true]
  ) : S extends `false${infer Rest}` ? (
    [Rest, false]
  ) : S extends `null${infer Rest}` ? (
    [Rest, null]
  ) : never

type ParseArrayResult<T extends Token[], Result extends unknown[] = [], Expected extends Token = `"${string}"` | null | true | false | ']' | '[' | '{'> =
  T extends [infer FirstToken, ...infer RestTokens extends Token[]] ? (
    FirstToken extends Expected ? (
      FirstToken extends ']' ? (
        [Result, RestTokens]
      ) : FirstToken extends '[' ? (
        ParseArrayResult<RestTokens> extends [infer ArrayResult, infer RestTokens extends Token[]] ? (
          ParseArrayResult<RestTokens, [...Result, ArrayResult], ',' | ']'>
        ) : never
      ) : FirstToken extends '{' ? (
        ParseObjectResult<RestTokens> extends [infer ObjectResult, infer RestTokens extends Token[]] ? (
          ParseArrayResult<RestTokens, [...Result, ObjectResult], ',' | ']'>
        ) : never
      ) : FirstToken extends ',' ? (
        ParseArrayResult<RestTokens, Result, `"${string}"` | null | true | false | '[' | '{'>
      ) : FirstToken extends `"${string}"` | null | true | false ? (
        ParseArrayResult<RestTokens, [...Result, ParseLiteralResult<FirstToken>], ',' | ']'>
      ) : never
    ) : never
  ) : never

type ParseObjectResult<T extends Token[], Result extends object = {}, Expected extends Token = '}' | `"${string}"`, Key extends string = ``> =
  T extends [infer FirstToken, ...infer RestTokens extends Token[]] ? (
    FirstToken extends Expected ? (
      Key extends `"${string}"` ? (
        FirstToken extends ':' ? (
          ParseObjectResult<RestTokens, Result, `"${string}"` | null | true | false | '[' | '{', Key>
        ) : FirstToken extends `"${string}"` | null | true | false ? (
          ParseObjectResult<RestTokens, SetProperty<Result, ParseLiteralResult<Key>, ParseLiteralResult<FirstToken>>, ',' | '}'>
        ) : FirstToken extends '[' ? (
          ParseArrayResult<RestTokens> extends [infer ArrayResult, infer RestTokens extends Token[]] ? (
            ParseObjectResult<RestTokens, SetProperty<Result, ParseLiteralResult<Key>, ArrayResult>, ',' | '}'>
          ) : never
        ) : FirstToken extends '{' ? (
          ParseObjectResult<RestTokens> extends [infer ObjectResult, infer RestTokens extends Token[]] ? (
            ParseObjectResult<RestTokens, SetProperty<Result, ParseLiteralResult<Key>, ObjectResult>, ',' | '}'>
          ) : never
        ) : never
      ) : FirstToken extends ',' ? (
        ParseObjectResult<RestTokens, Result, `"${string}"`, ``>
      ) : FirstToken extends `"${string}"` ? (
        ParseObjectResult<RestTokens, Result, ':', FirstToken>
      ) : FirstToken extends '}' ? (
        [Result, RestTokens]
      ) : never
    ) : never
  ) : never



//   使用 BuildTuple 在 Javascript 中实现类型减法。

// 如果被减数小于减数，则永远不会。

// 这是一个简单的版本。

// 答案
type Arr<X extends number, A extends unknown[]> = A['length'] extends X ? A : Arr<X, [A['length'], ...A]>

type Subtract<M extends number, S extends number> = Exclude<[never, ...Arr<M, []>][S], undefined>

// 例如

Subtract<2, 1> // expect to be 1
Subtract<1, 2> // expect to be never