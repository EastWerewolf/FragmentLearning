// 实现 TS 内置的 Pick<T, K>，但不可以使用它。
interface Todo {
    title: string
    description: string
    completed: boolean
}
// your answers
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
type MyReadonly<T> = {
    readonly [P in keyof T]:T[P]
}
const todo1: MyReadonly<Todo1> = {
    title: "Hey",
    description: "foobar"
}

todo1.title = "Hello" // Error: cannot reassign a readonly property
todo1.description = "barFoo" // Error: cannot reassign a readonly property
