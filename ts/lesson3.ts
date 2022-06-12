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