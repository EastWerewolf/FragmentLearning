let activeEffect

class Dep {
    subscribers = new Set()
    depend() {
        if (activeEffect) {
            console.log('执行')
            this.subscribers.add(activeEffect)
        }
    }
    notify() {
        this.subscribers.forEach(effect => effect())
    }
}

function watchEffect(effect) {
    activeEffect = effect
    console.log(activeEffect,'activeEffect')
    effect() // 触发 getter 添加dep.append
    activeEffect = null
}

function reactive(raw) {
    // 使用 Object.defineProperty
    // 1. 遍历对象上存在的 key
    Object.keys(raw).forEach(key => {
        // 2. 为每个 key 都创建一个依赖对象
        const dep = new Dep()

        // 3. 用 getter 和 setter 重写原对象的属性
        let realValue = raw[key]
        Object.defineProperty(raw, key, {
            get() {
                // 4. 在 getter 和 setter 里调用依赖对象的对应方法
                dep.depend()
                return realValue
            },
            set(newValue) {
                realValue = newValue
                dep.notify()
            }
        })
    })
    return raw
}
console.log('开始')
const state = reactive({
    count: 0
})
console.log('watch')
watchEffect(() => {
    console.log(state.count)
}) // 0

console.log(state.count)
state.count++ // 1

