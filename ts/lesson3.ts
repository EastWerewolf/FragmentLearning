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