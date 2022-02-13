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