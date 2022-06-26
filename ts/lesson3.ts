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