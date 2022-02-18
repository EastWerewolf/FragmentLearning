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
