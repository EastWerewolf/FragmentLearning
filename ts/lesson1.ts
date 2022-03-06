/*
 * @Author: your name
 * @Date: 2022-02-13 20:22:40
 * @LastEditTime: 2022-02-13 20:23:07
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \FragmentLearning\ts\lesson1.ts
 */
// 实现 TS 内置的 Pick<T, K>，但不可以使用它。
interface Todo {
    title: string
    description: string
    completed: boolean
}
// 答案
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}
type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}



// 不要使用内置的Readonly<T>，自己实现一个。
// 该 Readonly 会接收一个 泛型参数，并返回一个完全一样的类型，只是所有属性都会被 readonly 所修饰。
// 也就是不可以再对该对象的属性赋值。
interface Todo1 {
    title: string
    description: string
}
//答案
type MyReadonly<T> = {
    readonly [P in keyof T]:T[P]
}
const todo1: MyReadonly<Todo1> = {
    title: "Hey",
    description: "foobar"
}

todo1.title = "Hello" // Error: cannot reassign a readonly property
todo1.description = "barFoo" // Error: cannot reassign a readonly property



// 传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
// 答案
type TupleToObject<T extends readonly (string | number | symbol)[]> = {
    [P in T[number]]: P
}
type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}


// 实现一个通用First<T>，它接受一个数组T并返回它的第一个元素的类型。
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

// 答案
type First<T extends any[]> = T extends never[] ? never : T[0]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3


// 创建一个通用的Length，接受一个readonly的数组，返回这个数组的长度。

type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

// 答案
type Length<T extends readonly any[]> = T['length']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5


// 实现内置的Exclude <T，U>类型，但不能直接使用它本身。
// 从联合类型T中排除U的类型成员，来构造一个新的类型。

// 答案
type MyExclude<T, U> = T extends U ? never : T


// 假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。
// 比如：Promise<ExampleType>，请你返回 ExampleType 类型。

// 1. 等于左边 T extends Promise<unknown> 是先校验传入的类型是否是 Promise
// 2. 使用 infer 来获取 Promise 内的类型
// 3. 通过 extends 来进行判断 这里只判断到第二层的类型是否是 Promise 如 =》Promise<Promise<string>>
type MyAwaited <T extends Promise<unknown>> = T extends Promise<infer U> ? U extends Promise<infer P> ? P : U : never
// 获取 R 的类型后在通过 extends 判断是否是Promise类型 如果是则再进行递归调用 MyAwaited，
// 这样不管传入的是多少成 Promise 都能进行解析出来
type MyAwaited1<T extends Promise<unknown>> = T extends Promise<infer R> ? R extends Promise<unknown> ? MyAwaited1<R>:R : never;


// 实现一个 IF 类型，它接收一个条件类型 C ，一个判断为真时的返回类型 T ，以及一个判断为假时的返回类型 F。 C 只能是 true 或者 false， T 和 F 可以是任意类型。

// 答案
type If<C extends boolean, T, F> = C extends true ? T : F
// 举例:
type A1 = If<true, 'a', 'b'>  // expected to be 'a'
type B1 = If<false, 'a', 'b'> // expected to be 'b'


// 在类型系统里实现 JavaScript 内置的 Array.concat 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

// 答案
type Concat<T extends unknown[], K extends unknown[]> = [...T, ...K]
type Result = Concat<[1], [2]> // expected to be [1, 2]


// 在类型系统里实现 JavaScript 的 Array.includes 方法，这个类型接受两个参数，返回的类型要么是 true 要么是 false。

// 答案
type Includes<T extends readonly any[], U extends any> = T extends [infer F, ...infer R] ? (Equal<F, U> extends true ? true : Includes<R, U>) : false
// 举例来说，
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`


// 在类型系统里实现通用的 Array.push 。

// 答案
type Push<T extends any[], U> = [...T,U]
// 举例如下，
type Result = Push<[1, 2], '3'> // [1, 2, '3']


// 实现类型版本的 Array.unshift。

// 答案
type Unshift<T extends unknown[], U> = [U, ...T];
// 举例，
type Result = Unshift<[1, 2], 0> // [0, 1, 2,]


// 实现内置的 Parameters 类型，而不是直接使用它

// 答案
type MyParameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never


// 不使用 ReturnType 实现 TypeScript 的 ReturnType<T> 泛型。

// 答案
type MyReturnType<T extends (...args: any)=> any> =  T extends (...args: any) => infer P ? P : never

const fn = (v: boolean) => {
    if (v)
        return 1
    else
        return 2
}

type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"


// 不使用 Omit 实现 TypeScript 的 Omit<T, K> 范型。
// Omit 会创建一个省略 K 中字段的 T 对象。


// 答案
type MyOmit<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P]
}
// 例如：
interface Todo {
    title: string
    description: string
    completed: boolean
}

type TodoPreview1 = MyOmit<Todo, 'description' | 'title'>

const todo2: TodoPreview1 = {
    completed: false,
}


// 实现一个通用MyReadonly2<T, K>，它带有两种类型的参数T和K。
// K指定应设置为Readonly的T的属性集。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样。

// 你答案
// 通过& 合并只读和非只读，给K提供默认值，让第二个参数非必传
type MyReadonly2<T, K extends keyof T = keyof T> = {
    readonly [p in K] : T[p]
} & {
    [p in Exclude<keyof T ,K>] :T[p]
}


// 例如
interface Todo {
    title: string
    description: string
    completed: boolean
}

const todo3: MyReadonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
}

todo3.title = "Hello" // Error: cannot reassign a readonly property
todo3.description = "barFoo" // Error: cannot reassign a readonly property
todo3.completed = true // OK


// 实现泛型TupleToUnion<T>，它返回元组所有值的合集。

// 答案
// @ts-ignore
type TupleToUnion<T extends any[]> = T extends [infer F, ...infer R] ? F | TupleToUnion<R> : never

// 例如
type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'


// 在 JavaScript 中我们很常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给他附上类型吗？
// 在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 option(key, value) 和 get()。
// 在 option 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 get 获取最终结果

type Chainable<T = {}> = {
    option<K extends string,V>(key: K extends keyof T ? never : K, value: V): Chainable<T & { [P in K]: V }>
    get(): T
}
declare const config: Chainable

// 期望 result 的类型是：
interface Result1 {
  foo: number
  name: string
  bar: {
    value: string
  }
}
const result1:Result1 = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()


// 实现一个通用Last<T>，它接受一个数组T并返回其最后一个元素的类型。

type Last<T extends any[]> = T extends [...infer X , infer Result] ? Result : unknown;
// 例如

type arr3 = ['a', 'b', 'c']
type arr4 = [3, 2, 1]

type tail1 = Last<arr3> // expected to be 'c'
type tail2 = Last<arr4> // expected to be 1


// 实现一个通用Pop<T>，它接受一个数组T并返回一个没有最后一个元素的数组。

// 答案
type Pop<T extends any[]> = T extends [...infer R, infer _] ? R : never;

// 例如
type arr5 = ['a', 'b', 'c', 'd']
type arr6 = [3, 2, 1]

type re1 = Pop<arr5> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr6> // expected to be [3, 2]

// 键入函数PromiseAll，它接受PromiseLike对象数组，返回值应为Promise<T>，其中T是解析的结果数组。
declare function PromiseAll<V extends any[]>(values: readonly [...V]):
    Promise<{
        [K in keyof V]: V[K] extends Promise<infer R>
            ? R
            : V[K]
    }>;

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, number, string]>`
const p = Promise.all([promise1, promise2, promise3] as const)
const p1 = PromiseAll([promise1, promise2, promise3] as const)


// 有时，您可能希望根据其属性在并集中查找类型。

// 在此挑战中，我们想通过在联合Cat | Dog中搜索公共type字段来获取相应的类型。换句话说，在以下示例中，我们期望LookUp<Dog | Cat, 'dog'>获得Dog，LookUp<Dog | Cat, 'cat'>获得Cat

type LookUp<U, T> = U extends { type: T } ? U : never;

interface Cat {
    type: 'cat'
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
  }

  interface Dog {
    type: 'dog'
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
    color: 'brown' | 'white' | 'black'
  }

  type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`



//   实现 TrimLeft<T> ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。

// 答案
type TrimLeft<S extends string> = S extends `${' ' | '\n' | '\t'}${infer T}` ? TrimLeft<T> : S;

type trimed = TrimLeft<'  Hello World  '> // 应推导出 'Hello World  '


// 实现TrimRight<T>，它采用精确的字符串类型，并返回一个新字符串，其中删除了空格结尾。

// 答案
type TrimRight<S extends string> = S extends `${infer Rest}${' ' | '\t' | '\n'}` ? TrimRight<Rest> : S

// 例如
type Trimed = TrimRight<'   Hello World    '> // expected to be '   Hello World'


// 实现Trim<T>，它接受一个精确的字符串类型，并返回一个新字符串，其中删除了两端的空格。

// 答案
type Trim<S extends string> = TrimRight<TrimLeft<S>>;

type trimed1 = Trim<'  Hello World  '> // expected to be 'Hello World'


// 实现大写<T>，将字符串的第一个字母转换为大写，其余字母保持原样。

type Capitalize<T extends string> = T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : never;

// For example
type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'


// 实现 Replace<S, From, To> 将字符串 S 中的第一个子字符串 From 替换为 To 。


// 答案
type Replace<S extends string, From extends string, To extends string> = From extends '' ? S : S extends `${infer F}${From}${infer L}` ? `${F}${To}${L}` : S;

// 例如
type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'


// 实现 ReplaceAll<S, From, To> 将一个字符串 S 中的所有子字符串 From 替换为 To。


type ReplaceAll<S extends string, From extends string, To extends string> = From extends '' ? S :
S extends ${infer L}${From}${infer R}
?
R extends ${infer L1}${From}${infer R1} ? ${L}${To}${L1}${To}${ReplaceAll<${R1}, From, To>} : ${L}${To}${R}
: S
// 例如

type replaced1= ReplaceAll<'t y p e s', ' ', ''> // 期望是 'types'


// 实现一个范型 AppendArgument<Fn, A>，对于给定的函数类型 Fn，以及一个任意类型 A，返回一个新的函数 G。G
// 拥有 Fn 的所有参数并在末尾追加类型为 A 的参数。
type AppendArgument<Fn, A> = Fn extends (...args: infer R) => infer T ? (...args: [...R, A]) => T : never;
type Fn = (a: number, b: string) => number

type Result11 = AppendArgument<Fn, boolean> 
// 期望是 (a: number, b: string, x: boolean) => number


// 实现将联合类型转换为包含联合排列的数组的排列类型。

// 答案
type Permutation<T, U = T> = [T] extends [never] ? [] : T extends U ? [T, ...Permutation<Exclude<U, T>>] : T

type perm = Permutation<'A' | 'B' | 'C'>; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']


// 计算字符串文字的长度，其行为类似于字符串#长度。

// 方式一
type LengthOfString1<S extends string, T extends string[] = []> = S extends `${infer F}${infer L}` ? LengthOfString1<L, [F, ...T]> : T['length'];

// 方式二
type TransformArray<S extends string> = S extends `${infer F}${infer L}` ? [F, ...TransformArray<L>] : [];
type LengthOfString2<S extends string> = TransformArray<S>["length"];