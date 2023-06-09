1.Vue3.0性能提升主要是体现在哪些方面
1.响应式系统
javascript复制代码- Vue.js 2.x 中响应式系统的核心是 Object.defineProperty，劫持整个对象，然后进行深度遍历所有属性，给每个属性添加`getter`和`setter`，实现响应式
- Vue.js 3.x 中使用 Proxy 对象重写响应式系统
	- 可以监听动态新增的属性
	- 可以监听删除的属性
	- 可以监听数组的索引和length属性 

* 实现原理:

  * 通过Proxy（代理）: 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。

  * 通过Reflect（反射）: 对源对象的属性进行操作。

  * MDN文档中描述的Proxy与Reflect：

    * Proxy：[Proxy - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy "Proxy - JavaScript | MDN")

    * Reflect：[Reflect - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect "Reflect - JavaScript | MDN")
                                           
       new Proxy(data, {
          // 拦截读取属性值
          get (target, prop) {
              return Reflect.get(target, prop)
          },
          // 拦截设置属性值或添加新属性
          set (target, prop, value) {
              return Reflect.set(target, prop, value)
          },
          // 拦截删除属性
          deleteProperty (target, prop) {
              return Reflect.deleteProperty(target, prop)
          }
      })
  
      proxy.name = 'tom'   ![]





2.编译阶段
markdown复制代码- Vue.js 2.x 通过标记静态节点，优化 diff 的过程
- Vue.js 3.x 
  *   vue.js 3.x中标记和提升所有的静态节点，diff的时候只需要对比动态节点内容；
  *   Fragments（升级vetur插件): template中不需要唯一根节点，可以直接放文本或者同级标签
  *   静态提升(hoistStatic),当使用 hoistStatic 时,所有静态的节点都被提升到 render 方法之外.只会在应用启动的时候被创建一次,之后使用只需要应用提取的静态节点，随着每次的渲染被不停的复用。
  *   patch flag, 在动态标签末尾加上相应的标记,只能带 patchFlag 的节点才被认为是动态的元素,会被追踪属性的修改,能快速的找到动态节点,而不用逐个逐层遍历，提高了虚拟dom diff的性能。
  *   缓存事件处理函数cacheHandler,避免每次触发都要重新生成全新的function去更新之前的函数

作者：梁木由
链接：https://juejin.cn/post/7202639428132274234
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。




3.源码体积
markdown复制代码- 相比Vue2，Vue3整体体积变小了，除了移出一些不常用的AP
- tree shanking
  - 任何一个函数，如ref、reavtived、computed等，仅仅在用到的时候才打包
  - 通过编译阶段的静态分析，找到没有引入的模块并打上标记,将这些模块都给摇掉


2.vue3有哪些新的组件
1.Fragment
markdown复制代码*   在Vue2中: 组件必须有一个根标签
​
*   在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
​
*   好处: 减少标签层级, 减小内存占用


什么是Teleport？
—— Teleport 是一种能够将我们的组件html结构移动到指定位置的技术。
<teleport to="移动位置">
    <div v-if="isShow" class="mask">
        <div class="dialog">
            <h3>我是一个弹窗</h3>
            <button @click="isShow = false">关闭弹窗</button>
        </div>
    </div>
</teleport>


Suspense


等待异步组件时渲染一些额外内容，让应用有更好的用户体验


使用步骤：


异步引入组件
javascript复制代码import {defineAsyncComponent} from 'vue'
const Child = defineAsyncComponent(()=>import('./components/Child.vue'))



使用Suspense包裹组件，并配置好default 与 fallback
<template>
    <div class="app">
        <h3>我是App组件</h3>
        <Suspense>
            <template v-slot:default>
                <Child/>
            </template>
            <template v-slot:fallback>
                <h3>加载中.....</h3>
            </template>
        </Suspense>
    </div>
</template>


Vue2.0 和 Vue3.0 有什么区别
 响应式系统的重新配置，使用proxy替换Object.defineProperty
2. typescript支持
3. 新增组合API，更好的逻辑重用和代码组织
4. v-if和v-for的优先级
5. 静态元素提升
6. 虚拟节点静态标记
7. 生命周期变化
8. 打包体积优化
9. ssr渲染性能提升
10. 支持多个根节点


Vue 生命周期
1.vue2.x的生命周期

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68bee44057b94174b62cd1350936ec04~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

2.vue3.0的生命周期

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93eb8366f638409b9035610c3e9adefc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)


*   Vue3.0中可以继续使用Vue2.x中的生命周期钩子，但有有两个被更名：
​
    *   `beforeDestroy`改名为 `beforeUnmount`
​
    *   `destroyed`改名为 `unmounted`
​
*   Vue3.0也提供了 Composition API 形式的生命周期钩子，与Vue2.x中钩子对应关系如下：
​
    *   `beforeCreate`===>`setup()`
​
    *   `created`=======>`setup()`
​
    *   `beforeMount` ===>`onBeforeMount`
​
    *   `mounted`=======>`onMounted`
​
    *   `beforeUpdate`===>`onBeforeUpdate`
​
    *   `updated` =======>`onUpdated`
​
    *   `beforeUnmount` ==>`onBeforeUnmount`
​
    *   `unmounted` =====>`onUnmounted`
    
    
    
Vue 实例有⼀个完整的⽣命周期，也就是从开始创建、初始化数据、编译模版、挂载Dom -> 渲染、更新 -> 渲染、卸载 等⼀系列过程，称这是Vue的⽣命周期。 
1、beforeCreate（创建前） ：数据观测和初始化事件还未开始，此时 data 的响应式追踪、event/watcher 都还没有被设置，也就是说不能访问到data、computed、watch、methods上的方法和数据。 
2、created（创建后） ：实例创建完成，实例上配置的 options 包括 data、computed、watch、methods 等都配置完成，但是此时渲染得节点还未挂载到 DOM，所以不能访问到 `$el` 属性。 
3、beforeMount（挂载前） ：在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。此时还没有挂载html到页面上。 
4、mounted（挂载后） ：在el被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html 页面中。此过程中进行ajax交互。 
5、beforeUpdate（更新前） ：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的真实 DOM 还没有被渲染。 
6、updated（更新后）：在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。此时 DOM 已经根据响应式数据的变化更新了。调用时，组件 DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。 
7、beforeDestroy（销毁前） ：实例销毁之前调用。这一步，实例仍然完全可用，`this` 仍能获取到实例。
8、destroyed（销毁后） ：实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务端渲染期间不被调用。 


都说 Composition API 和 React Hook 很像，请问他们的区别是什么
从 React Hook 从实现的角度来看，React Hook 是基于 useState 的调用顺序来确定下一个 re 渲染时间状态从哪个 useState 开始，所以有以下几个限制
​
*   不在循环中、条件、调用嵌套函数 Hook
*   你必须确保它总是在你这边 React Top level 调用函数 Hook
*   使用效果、使用备忘录 依赖关系必须手动确定
​
和 Composition API 是基于 Vue 的响应系统，和 React Hook 相比
​
*   在设置函数中，一个组件实例只调用一次设置，而 React Hook 每次重新渲染时，都需要调用 Hook，给 React 带来的 GC 比 Vue 更大的压力，性能也相对 Vue 对我来说也比较慢
*   Compositon API 你不必担心调用的顺序，它也可以在循环中、条件、在嵌套函数中使用
*   响应式系统自动实现依赖关系收集，而且组件的性能优化是由 Vue 内部完成的，而 React Hook 的依赖关系需要手动传递，并且依赖关系的顺序必须得到保证，让路 useEffect、useMemo 等等，否则组件性能会因为依赖关系不正确而下降。
​
虽然Compoliton API看起来像React Hook来使用，但它的设计思路也是React Hook的参考。


