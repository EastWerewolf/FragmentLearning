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