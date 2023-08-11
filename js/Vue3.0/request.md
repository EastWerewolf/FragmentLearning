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



6. Composition Api 与Options Api 有什么不同
1.Options Api
Options API，即大家常说的选项API，即以vue为后缀的文件，通过定义methods，computed，watch，data等属性与方法，共同处理页面逻辑
如下图：

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d6769c3019e479c88121ed726398703~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
可以看到Options代码编写方式，如果是组件状态，则写在data属性上，如果是方法，则写在methods属性上...
用组件的选项 (data、computed、methods、watch) 组织逻辑在大多数情况下都有效
然而，当组件变得复杂，导致对应属性的列表也会增长，这可能会导致组件难以阅读和理解

Composition Api
在 Vue3 Composition API 中，组件根据逻辑功能来组织的，一个功能所定义的所有 API 会放在一起（更加的高内聚，低耦合）

即使项目很大，功能很多，我们都能快速的定位到这个功能所用到的所有 API
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18337c0974434ae09ae141a116aff75b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

3.对比
下面对Composition Api与Options Api进行两大方面的比较

逻辑组织
逻辑复用
逻辑组织
Options API
假设一个组件是一个大型组件，其内部有很多处理逻辑关注点（对应下图不用颜色）

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba80a442eb69455fb3499f1493378a5f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

可以看到，这种碎片化使得理解和维护复杂组件变得困难

选项的分离掩盖了潜在的逻辑问题。此外，在处理单个逻辑关注点时，我们必须不断地“跳转”相关代码的选项块



Compostion API
而Compositon API正是解决上述问题，将某个逻辑关注点相关的代码全都放在一个函数里，这样当需要修改一个功能时，就不再需要在文件中跳来跳去
下面举个简单例子，将处理count属性相关的代码放在同一个函数了
function useCount() {
    let count = ref(10);
    let double = computed(() => {
        return count.value * 2;
    });
​
    const handleConut = () => {
        count.value = count.value * 2;
    };
​
    console.log(count);
​
    return {
        count,
        double,
        handleConut,
    };
}

组件上中使用count
export default defineComponent({
    setup() {
        const { count, double, handleConut } = useCount();
        return {
            count,
            double,
            handleConut
        }
    },
});


再来一张图进行对比，可以很直观地感受到 Composition API在逻辑组织方面的优势，以后修改一个属性功能的时候，只需要跳到控制该属性的方法中即可
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce453cd816a84cf2b7f295dbc3835314~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)


逻辑复用
在Vue2中，我们是用过mixin去复用相同的逻辑
下面举个例子，我们会另起一个mixin.js文件
export const MoveMixin = {
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
​
  methods: {
    handleKeyup(e) {
      console.log(e.code);
      // 上下左右 x y
      switch (e.code) {
        case "ArrowUp":
          this.y--;
          break;
        case "ArrowDown":
          this.y++;
          break;
        case "ArrowLeft":
          this.x--;
          break;
        case "ArrowRight":
          this.x++;
          break;
      }
    },
  },
​
  mounted() {
    window.addEventListener("keyup", this.handleKeyup);
  },
​
  unmounted() {
    window.removeEventListener("keyup", this.handleKeyup);
  },
};

然后在组件中使用
<template>
  <div>
    Mouse position: x {{ x }} / y {{ y }}
  </div>
</template>
<script>
import mousePositionMixin from './mouse'
export default {
  mixins: [mousePositionMixin]
}
</script>



使用单个mixin似乎问题不大，但是当我们一个组件混入大量不同的 mixins 的时候
mixins: [mousePositionMixin, fooMixin, barMixin, otherMixin]

会存在两个非常明显的问题：

命名冲突
数据来源不清晰

现在通过Compositon API这种方式改写上面的代码
import { onMounted, onUnmounted, reactive } from "vue";
export function useMove() {
  const position = reactive({
    x: 0,
    y: 0,
  });
​
  const handleKeyup = (e) => {
    console.log(e.code);
    // 上下左右 x y
    switch (e.code) {
      case "ArrowUp":
        // y.value--;
        position.y--;
        break;
      case "ArrowDown":
        // y.value++;
        position.y++;
        break;
      case "ArrowLeft":
        // x.value--;
        position.x--;
        break;
      case "ArrowRight":
        // x.value++;
        position.x++;
        break;
    }
  };
​
  onMounted(() => {
    window.addEventListener("keyup", handleKeyup);
  });
​
  onUnmounted(() => {
    window.removeEventListener("keyup", handleKeyup);
  });
​
  return { position };
}

在组件中使用
<template>
  <div>
    Mouse position: x {{ x }} / y {{ y }}
  </div>
</template>
​
<script>
import { useMove } from "./useMove";
import { toRefs } from "vue";
export default {
  setup() {
    const { position } = useMove();
    const { x, y } = toRefs(position);
    return {
      x,
      y,
    };
​
  },
};
</script>

可以看到，整个数据来源清晰了，即使去编写更多的 hook 函数，也不会出现命名冲突的问题
小结

在逻辑组织和逻辑复用方面，Composition API是优于Options API
因为Composition API几乎是函数，会有更好的类型推断。
Composition API对 tree-shaking 友好，代码也更容易压缩
Composition API中见不到this的使用，减少了this指向不明的情况
如果是小型组件，可以继续使用Options API，也是十分友好的




7.什么是SPA单页面应用，首屏加载你是如何优化的
go复制代码单页Web应用（single page web application，SPA），就是只有一张Web页面的应用，是加载单个HTML页面并在用户与应用程序交互时动态更新该页面的Web应用程序。我们开发的`Vue`项目大多是借助个官方的`CLI`脚手架，快速搭建项目，直接通过`new Vue`构建一个实例，并将`el:'#app'`挂载参数传入，最后通过`npm run build`的方式打包后生成一个`index.html`，称这种只有一个`HTML`的页面为单页面应用。
​
当然，`vue`也可以像`jq`一样引入，作为多页面应用的基础框架。
​
​
SPA首屏优化方式
​
减小入口文件积
静态资源本地缓存
UI框架按需加载
图片资源的压缩
组件重复打包
开启GZip压缩


8.对Vue项目你做过哪些性能优化
1、`v-if`和`v-show`

*   频繁切换时使用`v-show`，利用其缓存特性
*   首屏渲染时使用`v-if`，如果为`false`则不进行渲染

2、`v-for`的`key`

*   列表变化时，循环时使用唯一不变的`key`，借助其本地复用策略
*   列表只进行一次渲染时，`key`可以采用循环的`index`

3、侦听器和计算属性

*   侦听器`watch`用于数据变化时引起其他行为
*   多使用`compouter`计算属性顾名思义就是新计算而来的属性，如果依赖的数据未发生变化，不会触发重新计算

4、合理使用生命周期

*   在`destroyed`阶段进行绑定事件或者定时器的销毁
*   使用动态组件的时候通过`keep-alive`包裹进行缓存处理，相关的操作可以在`actived`阶段激活

5、数据响应式处理

*   不需要响应式处理的数据可以通过`Object.freeze`处理，或者直接通过`this.xxx = xxx`的方式进行定义
*   需要响应式处理的属性可以通过`this.$set`的方式处理，而不是`JSON.parse(JSON.stringify(XXX))`的方式

6、路由加载方式

*   页面组件可以采用异步加载的方式

7、插件引入

*   第三方插件可以采用按需加载的方式，比如`element-ui`。

8、减少代码量

*   采用`mixin`的方式抽离公共方法
*   抽离公共组件
*   定义公共方法至公共`js`中
*   抽离公共`css`

9、编译方式

*   如果线上需要`template`的编译，可以采用完成版`vue.esm.js`
*   如果线上无需`template`的编译，可采用运行时版本`vue.runtime.esm.js`，相比完整版体积要小大约`30%`

10、渲染方式

*   服务端渲染，如果是需要`SEO`的网站可以采用服务端渲染的方式
*   前端渲染，一些企业内部使用的后端管理系统可以采用前端渲染的方式

11、字体图标的使用
2
*   有些图片图标尽可能使用字体图标



9.Vue组件通信的方式有哪些
vue中8种常规的通信方案
​
通过 props 传递
通过 $emit 触发自定义事件
使用 ref
EventBus
$parent 或$root
attrs 与 listeners
Provide 与 Inject
Vuex
​
组件间通信的分类可以分成以下
​
父子关系的组件数据传递选择 props  与 $emit进行传递，也可选择ref
兄弟关系的组件数据传递可选择$bus，其次可以选择$parent进行传递
祖先与后代组件数据传递可选择attrs与listeners或者 Provide与 Inject
复杂关系的组件数据传递可以通过vuex存放共享的变量




10.Vue常用的修饰符有哪些
xml复制代码 1、表单修饰符
​
（1）`.lazy`
​
在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 ，可以添加 `lazy` 修饰符，从而转为在 `change` 事件之后进行同步:
​
```
<input v-model.lazy="msg">
​
```
​
（2）`.number`
​
如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符：
​
```
<input v-model.number="age" type="number">
​
```
​
（3）`.trim`
​
如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符：
​
```
<input v-model.trim="msg">
​
```
​
 2、事件修饰符
​
 （1）`.stop`
​
阻止单击事件继续传播。
​
```
<!--这里只会触发a-->
<div @click="divClick"><a v-on:click.stop="aClick">点击</a></div>
​
```
​
（2）`.prevent`
​
阻止标签的默认行为。
​
```
<a href="http://www.baidu.com" v-on:click.prevent="aClick">点击</a>
​
```
​
（3）`.capture`
​
事件先在有`.capture`修饰符的节点上触发，然后在其包裹的内部节点中触发。
​
```
<!--这里先执行divClick事件，然后再执行aClick事件-->
<div @click="divClick"><a v-on:click="aClick">点击</a></div>
​
```
​
（4）`.self`
​
只当在 event.target 是当前元素自身时触发处理函数，即事件不是从内部元素触发的。
​
```
<!--在a标签上点击时只会触发aClick事件，只有点击phrase的时候才会触发divClick事件-->
<div @click.self="divClick">phrase<a v-on:click="aClick">点击</a></div>
​
```
​
（5）`.once`
​
不像其它只能对原生的 DOM 事件起作用的修饰符，`.once` 修饰符还能被用到自定义的组件事件上，表示当前事件只触发一次。
​
```
<a v-on:click.once="aClick">点击</a>
​
```
（6）`.passive`
​
`.passive` 修饰符尤其能够提升移动端的性能
​
```
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->  
<!-- 而不会等待 `onScroll` 完成 -->  
<!-- 这其中包含 `event.preventDefault()` 的情况 -->  
<div v-on:scroll.passive="onScroll">...</div>
```
​

11.Vue中的$nextTick有什么作用
javascript复制代码const callbacks = []
let pending = false
​
/**
 * 完成两件事：
 *   1、用 try catch 包装 flushSchedulerQueue 函数，然后将其放入 callbacks 数组
 *   2、如果 pending 为 false，表示现在浏览器的任务队列中没有 flushCallbacks 函数
 *     如果 pending 为 true，则表示浏览器的任务队列中已经被放入了 flushCallbacks 函数，
 *     待执行 flushCallbacks 函数时，pending 会被再次置为 false，表示下一个 flushCallbacks 函数可以进入
 *     浏览器的任务队列了
 * pending 的作用：保证在同一时刻，浏览器的任务队列中只有一个 flushCallbacks 函数
 * @param {*} cb 接收一个回调函数 => flushSchedulerQueue
 * @param {*} ctx 上下文
 * @returns 
 */
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  // 用 callbacks 数组存储经过包装的 cb 函数
  callbacks.push(() => {
    if (cb) {
      // 用 try catch 包装回调函数，便于错误捕获
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    // 执行 timerFunc，在浏览器的任务队列中（首选微任务队列）放入 flushCallbacks 函数
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

官方对其的定义
​
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM
​
什么意思呢？
​
我们可以理解成，Vue 在更新 DOM 时是异步执行的。当数据发生变化，Vue将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新
​
Vue 的异步更新机制的核心是利用了浏览器的异步任务队列来实现的，首选微任务队列，宏任务队列次之。
​
当响应式数据更新后，会调用 dep.notify 方法，通知 dep 中收集的 watcher 去执行 update 方法，watcher.update 将 watcher 自己放入一个 watcher 队列（全局的 queue 数组）。
​
然后通过 nextTick 方法将一个刷新 watcher 队列的方法（flushSchedulerQueue）放入一个全局的 callbacks 数组中。
​
如果此时浏览器的异步任务队列中没有一个叫 flushCallbacks 的函数，则执行 timerFunc 函数，将 flushCallbacks 函数放入异步任务队列。如果异步任务队列中已经存在 flushCallbacks 函数，等待其执行完成以后再放入下一个 flushCallbacks 函数。
​
flushCallbacks 函数负责执行 callbacks 数组中的所有 flushSchedulerQueue 函数。
​
flushSchedulerQueue 函数负责刷新 watcher 队列，即执行 queue 数组中每一个 watcher 的 run 方法，从而进入更新阶段，比如执行


13.v-show和v-if有什么区别？你可以讲讲吗
sql复制代码v-show 与 v-if 的作用效果是相同的(不含v-else)，都能控制元素在页面是否显示,在用法上也是相同的
​
- 区别 
控制手段不同
编译过程不同
编译条件不同
​
控制手段：v-show隐藏则是为该元素添加css--display:none，dom元素依旧还在。v-if显示隐藏是将dom元素整个添加或删除
​
编译过程：v-if切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show只是简单的基于css切换
​
编译条件：v-if是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。只有渲染条件为假时，并不做操作，直到为真才渲染
​
v-show 由false变为true的时候不会触发组件的生命周期
​
v-if由false变为true的时候，触发组件的beforeCreate、create、beforeMount、mounted钩子，由true变为false的时候触发组件的beforeDestory、destoryed方法
​
性能消耗：v-if有更高的切换消耗；v-show有更高的初始渲染消耗


14.有用过keep-alive吗？它有什么作用
xml复制代码`vue`中支持组件化，并且也有用于缓存的内置组件`keep-alive`可直接使用，使用场景为`路由组件`和`动态组件`。
​
*   `activated`表示进入组件的生命周期，`deactivated`表示离开组件的生命周期
*   `include`表示匹配到的才缓存，`exclude`表示匹配到的都不缓存
*   `max`表示最多可以缓存多少组件
​
​
关于keep-alive的基本用法：
​
<keep-alive>
  <component :is="view"></component>
</keep-alive>
使用includes和exclude：
​
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>
​
<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>
​
<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
匹配首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)，匿名组件不能被匹配
​
设置了 keep-alive 缓存的组件，会多出两个生命周期钩子（activated与deactivated）：
​
首次进入组件时：beforeRouteEnter > beforeCreate > created> mounted > activated > ... ... > beforeRouteLeave > deactivated
​
再次进入组件时：beforeRouteEnter >activated > ... ... > beforeRouteLeave > deactivated





15.你可以实现一个虚拟DOM吗
先看浏览器对HTML的理解：
xml复制代码<div>  
    <h1>My title</h1>  
    Some text content  
    <!-- TODO: Add tagline -->  
</div>

当浏览器读到这些代码时，它会建立一个DOM树来保持追踪所有内容，如同你会画一张家谱树来追踪家庭成员的发展一样。 上述 HTML 对应的 DOM 节点树如下图所示：

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7ee0f38a11304a768737a2e7de69e7e9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是节点。一个节点就是页面的一个部分。就像家谱树一样，每个节点都可以有孩子节点 (也就是说每个部分可以包含其它的一些部分)。

**再看`Vue`对`HTML template`的理解**

Vue 通过建立一个**虚拟 DOM** 来追踪自己要如何改变真实 DOM。因为它所包含的信息会告诉 Vue 页面上需要渲染什么样的节点，包括及其子节点的描述信息。我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“**VNode**”。“虚拟 DOM”是我们对由 Vue 组件树建立起来的整个 VNode 树的称呼。

简言之，浏览器对HTML的理解是DOM树，Vue对`HTML`的理解是虚拟DOM，最后在`patch`阶段通过DOM操作的api将其渲染成真实的DOM节点。

如何实现虚拟DOM
首先可以看看vue中VNode的结构

源码位置：src/core/vdom/vnode.js


export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  functionalContext: Component | void; // only for functional component root nodes
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
​
  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions
  ) {
    /*当前节点的标签名*/
    this.tag = tag
    /*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息*/
    this.data = data
    /*当前节点的子节点，是一个数组*/
    this.children = children
    /*当前节点的文本*/
    this.text = text
    /*当前虚拟节点对应的真实dom节点*/
    this.elm = elm
    /*当前节点的名字空间*/
    this.ns = undefined
    /*编译作用域*/
    this.context = context
    /*函数化组件作用域*/
    this.functionalContext = undefined
    /*节点的key属性，被当作节点的标志，用以优化*/
    this.key = data && data.key
    /*组件的option选项*/
    this.componentOptions = componentOptions
    /*当前节点对应的组件的实例*/
    this.componentInstance = undefined
    /*当前节点的父节点*/
    this.parent = undefined
    /*简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false*/
    this.raw = false
    /*静态节点标志*/
    this.isStatic = false
    /*是否作为跟节点插入*/
    this.isRootInsert = true
    /*是否为注释节点*/
    this.isComment = false
    /*是否为克隆节点*/
    this.isCloned = false
    /*是否有v-once指令*/
    this.isOnce = false
  }
​
  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next https://github.com/answershuto/learnVue*/
  get child (): Component | void {
    return this.componentInstance
  }
}



这里对VNode进行稍微的说明：

所有对象的 context 选项都指向了 Vue 实例
elm 属性则指向了其相对应的真实 DOM 节点

vue`是通过`createElement`生成`VNode
源码位置：src/core/vdom/create-element.js

export function createElement (
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children
    children = data
    data = undefined
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE
  }
  return _createElement(context, tag, data, children, normalizationType)
}
上面可以看到createElement 方法实际上是对 _createElement 方法的封装，对参数的传入进行了判断
export function _createElement(
    context: Component,
    tag?: string | Class<Component> | Function | Object,
    data?: VNodeData,
    children?: any,
    normalizationType?: number
): VNode | Array<VNode> {
    if (isDef(data) && isDef((data: any).__ob__)) {
        process.env.NODE_ENV !== 'production' && warn(
            `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
            'Always create fresh vnode data objects in each render!',
            context`
        )
        return createEmptyVNode()
    }
    // object syntax in v-bind
    if (isDef(data) && isDef(data.is)) {
        tag = data.is
    }
    if (!tag) {
        // in case of component :is set to falsy value
        return createEmptyVNode()
    }
    ... 
    // support single function children as default scoped slot
    if (Array.isArray(children) &&
        typeof children[0] === 'function'
    ) {
        data = data || {}
        data.scopedSlots = { default: children[0] }
        children.length = 0
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
        children = normalizeChildren(children)
    } else if ( === SIMPLE_NORMALIZE) {
        children = simpleNormalizeChildren(children)
    }
  // 创建VNode
    ...
}
可以看到_createElement接收5个参数：

context 表示 VNode 的上下文环境，是 Component 类型
tag 表示标签，它可以是一个字符串，也可以是一个 Component
data 表示 VNode 的数据，它是一个 VNodeData 类型
children 表示当前 VNode的子节点，它是任意类型的
normalizationType 表示子节点规范的类型，类型不同规范的方法也就不一样，主要是参考 render 函数是编译生成的还是用户手写的

根据normalizationType 的类型，children会有不同的定义
if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children)
} else if ( === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children)
}
simpleNormalizeChildren方法调用场景是 render 函数是编译生成的
normalizeChildren方法调用场景分为下面两种：

render 函数是用户手写的
编译 slot、v-for 的时候会产生嵌套数组

无论是simpleNormalizeChildren还是normalizeChildren都是对children进行规范（使children 变成了一个类型为 VNode 的 Array），这里就不展开说了
规范化children的源码位置在：src/core/vdom/helpers/normalzie-children.js
在规范化children后，就去创建VNode
let vnode, ns
// 对tag进行判断
if (typeof tag === 'string') {
  let Ctor
  ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag)
  if (config.isReservedTag(tag)) {
    // 如果是内置的节点，则直接创建一个普通VNode
    vnode = new VNode(
      config.parsePlatformTagName(tag), data, children,
      undefined, undefined, context
    )
  } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
    // component
    // 如果是component类型，则会通过createComponent创建VNode节点
    vnode = createComponent(Ctor, data, context, children, tag)
  } else {
    vnode = new VNode(
      tag, data, children,
      undefined, undefined, context
    )
  }
} else {
  // direct component options / constructor
  vnode = createComponent(tag, data, context, children)
}
源码位置：src/core/vdom/create-component.js

export function createComponent (
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag?: string
): VNode | Array<VNode> | void {
  if (isUndef(Ctor)) {
    return
  }
 // 构建子类构造函数 
  const baseCtor = context.$options._base
​
  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor)
  }
​
  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(`Invalid Component definition: ${String(Ctor)}`, context)
    }
    return
  }
​
  // async component
  let asyncFactory
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context)
    if (Ctor === undefined) {
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }
​
  data = data || {}
​
  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor)
​
  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data)
  }
​
  // extract props
  const propsData = extractPropsFromVNodeData(data, Ctor, tag)
​
  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }
​
  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  const listeners = data.on
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn
​
  if (isTrue(Ctor.options.abstract)) {
    const slot = data.slot
    data = {}
    if (slot) {
      data.slot = slot
    }
  }
​
  // 安装组件钩子函数，把钩子函数合并到data.hook中
  installComponentHooks(data)
​
  //实例化一个VNode返回。组件的VNode是没有children的
  const name = Ctor.options.name || tag
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )
  if (__WEEX__ && isRecyclableComponent(vnode)) {
    return renderRecyclableComponentTemplate(vnode)
  }
​
  return vnode
}
稍微提下createComponent生成VNode的三个关键流程：

构造子类构造函数Ctor
installComponentHooks安装组件钩子函数
实例化 vnode

小结
createElement 创建 VNode 的过程，每个 VNode 有 children，children 每个元素也是一个VNode，这样就形成了一个虚拟树结构，用于描述真实的DOM树结构




16.为什么data属性是一个函数而不是一个对象，具体原因是什么
是不是一定是函数，得看场景。并且，也无需担心什么时候该将`data`写为函数还是对象，因为`vue`内部已经做了处理，并在控制台输出错误信息。
​
**场景一**：`new Vue({data: ...})`  
这种场景主要为项目入口或者多个`html`页面各实例化一个`Vue`时，这里的`data`即可用对象的形式，也可用工厂函数返回对象的形式。因为，这里的`data`只会出现一次，不存在重复引用而引起的数据污染问题。
​
**场景二**：组件场景中的选项  
在生成组件`vnode`的过程中，组件会在生成构造函数的过程中执行合并策略：
​
```
// data合并策略
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
​
      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }
​
  return mergeDataOrFn(parentVal, childVal, vm)
};
```
​
如果合并过程中发现子组件的数据不是函数，即`typeof childVal !== 'function'`成立，进而在开发环境会在控制台输出警告并且直接返回`parentVal`，说明这里压根就没有把`childVal`中的任何`data`信息合并到`options`中去。
​
​
上面讲到组件data必须是一个函数，不知道大家有没有思考过这是为什么呢？
​
在我们定义好一个组件的时候，vue最终都会通过Vue.extend()构成组件实例
​
这里我们模仿组件构造函数，定义data属性，采用对象的形式
​
function Component(){
 
}
Component.prototype.data = {
  count : 0
}
创建两个组件实例
​
const componentA = new Component()
const componentB = new Component()
修改componentA组件data属性的值，componentB中的值也发生了改变
​
console.log(componentB.data.count)  // 0
componentA.data.count = 1
console.log(componentB.data.count)  // 1
产生这样的原因这是两者共用了同一个内存地址，componentA修改的内容，同样对componentB产生了影响
​
如果我们采用函数的形式，则不会出现这种情况（函数返回的对象内存地址并不相同）
​
function Component(){
  this.data = this.data()
}
Component.prototype.data = function (){
    return {
      count : 0
    }
}
修改componentA组件data属性的值，componentB中的值不受影响
​
console.log(componentB.data.count)  // 0
componentA.data.count = 1
console.log(componentB.data.count)  // 0
vue组件可能会有很多个实例，采用函数返回一个全新data形式，使每个实例对象的数据不会受到其他实例对象数据的污染




17.Vue2的初始化过程你有过了解吗，做了哪些事情
scss复制代码new Vue走到了vue的构造函数中：`src\core\instance\index.js`文件。
​
this._init(options)
​
然后从Mixin增加的原型方法看，initMixin(Vue)，调用的是为Vue增加的原型方法_init
​
// src/core/instance/init.js
​
function initMixin (Vue) {
  Vue.prototype._init = function (options) {
     var vm = this; 创建vm, 
     ...
     // 合并options 到 vm.$options
     vm.$options = mergeOptions(  
       resolveConstructorOptions(vm.constructor), 
       options || {},  
       vm 
     );
  }
  ...
   initLifecycle(vm); //初始生命周期
   initEvents(vm); //初始化事件
   initRender(vm); //初始render函数
   callHook(vm, 'beforeCreate'); //执行 beforeCreate生命周期钩子
   ...
   initState(vm);  //初始化data，props，methods computed，watch 
   ...
   callHook(vm, 'created');  //执行 created 生命周期钩子
   
   if (vm.$options.el) {
      vm.$mount(vm.$options.el); //这里也是重点，下面需要用到
   }
 }
​
总结
​
所以，从上面的函数看来，new vue所做的事情，就像一个流程图一样展开了，分别是
​
-   合并配置
-   初始化生命周期
-   初始化事件
-   初始化渲染
-   调用 `beforeCreate` 钩子函数
-   init injections and reactivity（这个阶段属性都已注入绑定，而且被 `$watch` 变成reactivity，但是 `$el` 还是没有生成，也就是DOM没有生成）
-   初始化state状态（初始化了data、props、computed、watcher）
-   调用created钩子函数。
​
在初始化的最后，检测到如果有 el 属性，则调用 vm.$mount 方法挂载 vm，挂载的目标就是把模板渲染成最终的 DOM。



19.vue3响应式api如何编写
var activeEffect = null;
function effect(fn) {
  activeEffect = fn;
  activeEffect();
  activeEffect = null; 
}
var depsMap = new WeakMap();
function gather(target, key) {
  // 避免例如console.log(obj1.name)而触发gather
  if (!activeEffect) return;
  let depMap = depsMap.get(target);
  if (!depMap) {
    depsMap.set(target, (depMap = new Map()));
  }
  let dep = depMap.get(key);
  if (!dep) {
    depMap.set(key, (dep = new Set()));
  }
  dep.add(activeEffect)
}
function trigger(target, key) {
  let depMap = depsMap.get(target);
  if (depMap) {
    const dep = depMap.get(key);
    if (dep) {
      dep.forEach((effect) => effect());
    }
  }
}
function reactive(target) {
  const handle = {
    set(target, key, value, receiver) {
      Reflect.set(target, key, value, receiver);
      trigger(receiver, key); // 设置值时触发自动更新
    },
    get(target, key, receiver) {
      gather(receiver, key); // 访问时收集依赖
      return Reflect.get(target, key, receiver);
    },
  };
  return new Proxy(target, handle);
}
​
function ref(name){
    return reactive(
        {
            value: name
        }
    )
}


20.在Vue项目中你是如何做的SSR渲染
markdown复制代码与传统 SPA (单页应用程序 (Single-Page Application)) 相比，服务器端渲染 (SSR) 的优势主要在于：
​
*   更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
*   更快的内容到达时间 (time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备。
​
Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将这些静态标记"激活"为客户端上完全可交互的应用程序
​
服务器渲染的 Vue.js 应用程序也可以被认为是"同构"或"通用"，因为应用程序的大部分代码都可以在服务器和客户端上运行
​
* Vue SSR是一个在SPA上进行改良的服务端渲染
* 通过Vue SSR渲染的页面，需要在客户端激活才能实现交互
* Vue SSR将包含两部分：服务端渲染的首屏，包含交互的SPA
​
使用ssr不存在单例模式，每次用户请求都会创建一个新的vue实例
实现ssr需要实现服务端首屏渲染和客户端激活
服务端异步获取数据asyncData可以分为首屏异步获取和切换组件获取
首屏异步获取数据，在服务端预渲染的时候就应该已经完成
切换组件通过mixin混入，在beforeMount钩子完成数据获取

21.怎么看Vue的diff算法
markdown复制代码diff 算法是一种通过同层的树节点进行比较的高效算法
​
diff整体策略为：深度优先，同层比较
比较只会在同层级进行, 不会跨层级比较
比较的过程中，循环从两边向中间收拢
​
- 当数据发生改变时，订阅者watcher就会调用patch给真实的DOM打补丁
- 通过isSameVnode进行判断，相同则调用patchVnode方法
- patchVnode做了以下操作：
  - 找到对应的真实dom，称为el
  - 如果都有都有文本节点且不相等，将el文本节点设置为Vnode的文本节点
  - 如果oldVnode有子节点而VNode没有，则删除el子节点
  - 如果oldVnode没有子节点而VNode有，则将VNode的子节点真实化后添加到el
  - 如果两者都有子节点，则执行updateChildren函数比较子节点
- updateChildren主要做了以下操作：
  - 设置新旧VNode的头尾指针
  - 新旧头尾指针进行比较，循环向中间靠拢，根据情况调用patchVnode进行patch重复流程、调用createElem创建一个新节点，从哈希表寻找 key一致的VNode 节点再分情况操作



  22.从0到1构建一个Vue项目你需要做哪些内容
markdown复制代码*   架子：选用合适的初始化脚手架(`vue-cli2.0`或者`vue-cli3.0`)
*   请求：数据`axios`请求的配置
*   登录：登录注册系统
*   路由：路由管理页面
*   数据：`vuex`全局数据管理
*   权限：权限管理系统
*   埋点：埋点系统
*   插件：第三方插件的选取以及引入方式
*   错误：错误页面
*   入口：前端资源直接当静态资源，或者服务端模板拉取
*   `SEO`：如果考虑`SEO`建议采用`SSR`方案
*   组件：基础组件/业务组件
*   样式：样式预处理起，公共样式抽取
*   方法：公共方法抽离



23. 介绍一下 js 的数据类型有哪些，值是如何存储的

JavaScript 一共有 8 种数据类型，其中有 7 种基本数据类型：Undefined、Null、Boolean、Number、String、Symbol（es6 新增，表示独一无二的值）和 BigInt（es10 新增）；
​
1 种引用数据类型——Object（Object 本质上是由一组无序的名值对组成的）。里面包含 function、Array、Date 等。JavaScript 不支持任何创建自定义类型的机制，而所有值最终都将是上述 8 种数据类型之一。
​
原始数据类型：直接存储在**栈**（stack）中，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。
​
引用数据类型：同时存储在**栈**（stack）和**堆**（heap）中，占据空间大、大小不固定。引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。



24. JS 中Object.prototype.toString.call()判断数据类型

var a = Object.prototype.toString;
console.log(a.call(2));
console.log(a.call(true));
console.log(a.call('str'));
console.log(a.call([]));
console.log(a.call(function(){}));
console.log(a.call({}));
console.log(a.call(undefined));
console.log(a.call(null));https://link.juejin.cn?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000011467723%23articleHeader24 "https://segmentfault.com/a/1190000011467723#articleHeader24")



25. null 和 undefined 的区别？

首先 Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null。
​
undefined 代表的含义是未定义， null 代表的含义是空对象（其实不是真的对象，请看下面的**注意**！）。一般变量声明了但还没有定义的时候会返回 undefined，null 主要用于赋值给一些可能会返回对象的变量，作为初始化。
​
其实 null 不是对象，虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。
​
undefined 在 js 中不是一个保留字，这意味着我们可以使用 undefined 来作为一个变量名，这样的做法是非常危险的，它 会影响我们对 undefined 值的判断。但是我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。
​
当我们对两种类型使用 typeof 进行判断的时候，Null 类型化会返回 “object”，这是一个历史遗留的问题。当我们使用双等 号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。


26. {}和 [] 的 valueOf 和 toString 的结果是什么？
{} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"

[] 的 valueOf 结果为 [] ，toString 的结果为 ""


27. Javascript 的作用域和作用域链

**作用域：** 作用域是定义变量的区域，它有一套访问变量的规则，这套规则来管理浏览器引擎如何在当前作用域以及嵌套的作用域中根据变量（标识符）进行变量查找。
​
**作用域链：** 作用域链的作用是保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，我们可以访问到外层环境的变量和 函数。
​
作用域链的本质上是一个指向变量对象的指针列表。变量对象是一个包含了执行环境中所有变量和函数的对象。作用域链的前 端始终都是当前执行上下文的变量对象。全局执行上下文的变量对象（也就是全局对象）始终是作用域链的最后一个对象。
​
当我们查找一个变量时，如果当前执行环境中没有找到，我们可以沿着作用域链向后查找。
​
作用域链的创建过程跟执行上下文的建立有关


28. 谈谈你对 this、call、apply 和 bind 的理解

1.  在浏览器里，在全局范围内 this 指向 window 对象；
2.  在函数中，this 永远指向最后调用他的那个对象；
3.  构造函数中，this 指向 new 出来的那个新的对象；
4.  call、apply、bind 中的 this 被强绑定在指定的那个对象上；
5.  箭头函数中 this 比较特殊, 箭头函数 this 为父作用域的 this，不是调用时的 this. 要知道前四种方式, 都是调用时确定, 也就是动态的, 而箭头函数的 this 指向是静态的, 声明的时候就确定了下来；
6.  apply、call、bind 都是 js 给函数内置的一些 API，调用他们可以为函数指定 this 的执行, 同时也可以传参。



29. JavaScript 原型，原型链？ 有什么特点？

在 js 中我们是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性值，这个属性值是一个对 象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。当我们使用构造函数新建一个对象后，在这个对象的内部 将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的原型。一般来说我们 是不应该能够获取到这个值的，但是现在浏览器中都实现了 **proto** 属性来让我们访问这个属性，但是我们最好不要使用这 个属性，因为它不是规范中规定的。ES5 中新增了一个 Object.getPrototypeOf() 方法，我们可以通过这个方法来获取对 象的原型。

当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又 会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype 所以这就 是我们新建的对象为什么能够使用 toString() 等方法的原因。

特点：

JavaScript 对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与 之相关的对象也会继承这一改变。



30. 什么是闭包，为什么要用它？


- 能够访问其它函数内部变量的函数，称为闭包
- 能够访问自由变量的函数，称为闭包
​
场景
至于闭包的使用场景，其实在日常开发中使用到是非常频繁的
​
- 防抖节流函数
- 定时器回调
- 等就不一一列举了
​
优点
闭包帮我们解决了什么问题呢
**内部变量是私有的，可以做到隔离作用域，保持数据的不被污染性**
​
缺点
同时闭包也带来了不小的坏处
**说到了它的优点`内部变量是私有的,可以做到隔离作用域`,那也就是说垃圾回收机制是无法清理闭包中内部变量的，那最后结果就是内存泄漏**


31. 三种事件模型是什么？


**事件** 是用户操作网页时发生的交互动作或者网页本身的一些操作，现代浏览器一共有三种事件模型。

1.  **DOM0 级模型：** ，这种模型不会传播，所以没有事件流的概念，但是现在有的浏览器支持以冒泡的方式实现，它可以在网页中直接定义监听函数，也可以通过 js 属性来指定监听函数。这种方式是所有浏览器都兼容的。
2.  **IE 事件模型：** 在该事件模型中，一次事件共有两个过程，事件处理阶段，和事件冒泡阶段。事件处理阶段会首先执行目标元素绑定的监听事件。然后是事件冒泡阶段，冒泡指的是事件从目标元素冒泡到 document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。这种模型通过 attachEvent 来添加监听函数，可以添加多个监听函数，会按顺序依次执行。
3.  **DOM2 级事件模型：** 在该事件模型中，一次事件共有三个过程，第一个过程是事件捕获阶段。捕获指的是事件从 document 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。后面两个阶段和 IE 事件模型的两个阶段相同。这种事件模型，事件绑定的函数是 addEventListener，其中第三个参数可以指定事件是否在捕获阶段执行。


32. js 数组和字符串有哪些原生方法, 列举一下

![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab8c5beff9054a23a296c5b738878184~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
![图片](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d35b1e307cba458c8b1e73917165be6b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)


33. js 延迟加载的方式有哪些


js 的加载、解析和执行会阻塞页面的渲染过程，因此我们希望 js 脚本能够尽可能的延迟加载，提高页面的渲染速度。
​
1.  将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。
2.  给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。
3.  给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
4.  动态创建 DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。



34. js 的几种模块规范？


js 中现在比较成熟的有四种模块加载方案：
​
*   第一种是 CommonJS 方案，它通过 require 来引入模块，通过 module.exports 定义模块的输出接口。这种模块加载方案是服务器端的解决方案，它是以同步的方式来引入模块的，因为在服务端文件都存储在本地磁盘，所以读取非常快，所以以同步的方式加载没有问题。但如果是在浏览器端，由于模块的加载是使用网络请求，因此使用异步加载的方式更加合适。
*   第二种是 AMD 方案，这种方案采用异步加载的方式来加载模块，模块的加载不影响后面语句的执行，所有依赖这个模块的语句都定义在一个回调函数里，等到加载完成后再执行回调函数。require.js 实现了 AMD 规范。
*   第三种是 CMD 方案，这种方案和 AMD 方案都是为了解决异步模块加载的问题，sea.js 实现了 CMD 规范。它和 require.js 的区别在于模块定义时对依赖的处理不同和对依赖模块的执行时机的处理不同。
*   第四种方案是 ES6 提出的方案，使用 import 和 export 的形式来导入导出模块。


35. AMD 和 CMD 规范的区别？

它们之间的主要区别有两个方面。
​
1.  第一个方面是在模块定义时对依赖的处理不同。AMD 推崇依赖前置，在定义模块的时候就要声明其依赖的模块。而 CMD 推崇就近依赖，只有在用到某个模块的时候再去 require。
2.  第二个方面是对依赖模块的执行时机处理不同。首先 AMD 和 CMD 对于模块的加载方式都是异步加载，不过它们的区别在于 模块的执行时机，AMD 在依赖模块加载完成后就直接执行依赖模块，依赖模块的执行顺序和我们书写的顺序不一定一致。而 CMD 在依赖模块加载完成后并不执行，只是下载而已，等到所有的依赖模块都加载好后，进入回调函数逻辑，遇到 require 语句 的时候才执行对应的模块，这样模块的执行顺序就和我们书写的顺序保持一致了。
​
// CMD
define(function(require, exports, module) {
  var a = require("./a");
  a.doSomething();
  // 此处略去 100 行
  var b = require("./b"); // 依赖可以就近书写
  b.doSomething();
  // ...
});
​
// AMD 默认推荐
define(["./a", "./b"], function(a, b) {
  // 依赖必须一开始就写好
  a.doSomething();
  // 此处略去 100 行
  b.doSomething();
  // ...
});


36. ES6 模块与 CommonJS 模块、AMD、CMD 的差异。

1、语法上
CommonJS 使用的是 module.exports = {} 导出一个模块对象，require(‘file_path’) 引入模块对象；
ES6使用的是 export 导出指定数据， import 引入具体数据。
​
2、CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
​
CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
​
ES6 Modules 的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6的import 有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
​
3、CommonJS 模块是运行时加载，ES6 模块是编译时加载
​
运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。
​
编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”
​
PS：CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成





37. JS 的运行机制


异步任务分类：宏任务，微任务
同步任务和异步任务分别进入不同的执行"场所"
先执行主线程执行栈中的宏任务
执行过程中如果遇到微任务，进入Event Table并注册函数，完成后移入到微任务的任务队列中
宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
主线程会不断获取任务队列中的任务、执行任务、再获取、再执行任务也就是常说的Event Loop(事件循环)。


38. 简单介绍一下 V8 引擎的垃圾回收机制


v8 的垃圾回收机制基于分代回收机制，这个机制又基于世代假说，这个假说有两个特点，一是新生的对象容易早死，另一个是不死的对象会活得更久。基于这个假说，v8 引擎将内存分为了新生代和老生代。
​
新创建的对象或者只经历过一次的垃圾回收的对象被称为新生代。经历过多次垃圾回收的对象被称为老生代。
​
新生代被分为 From 和 To 两个空间，To 一般是闲置的。当 From 空间满了的时候会执行 Scavenge 算法进行垃圾回收。当我们执行垃圾回收算法的时候应用逻辑将会停止，等垃圾回收结束后再继续执行。这个算法分为三步：
​
（1）首先检查 From 空间的存活对象，如果对象存活则判断对象是否满足晋升到老生代的条件，如果满足条件则晋升到老生代。如果不满足条件则移动 To 空间。
​
（2）如果对象不存活，则释放对象的空间。
​
（3）最后将 From 空间和 To 空间角色进行交换。
​
新生代对象晋升到老生代有两个条件：
​
（1）第一个是判断是对象否已经经过一次 Scavenge 回收。若经历过，则将对象从 From 空间复制到老生代中；若没有经历，则复制到 To 空间。
​
（2）第二个是 To 空间的内存使用占比是否超过限制。当对象从 From 空间复制到 To 空间时，若 To 空间使用超过 25%，则对象直接晋升到老生代中。设置 25% 的原因主要是因为算法结束后，两个空间结束后会交换位置，如果 To 空间的内存太小，会影响后续的内存分配。
​
老生代采用了标记清除法和标记压缩法。标记清除法首先会对内存中存活的对象进行标记，标记结束后清除掉那些没有标记的对象。由于标记清除后会造成很多的内存碎片，不便于后面的内存分配。所以了解决内存碎片的问题引入了标记压缩法。
​
由于在进行垃圾回收的时候会暂停应用的逻辑，对于新生代方法由于内存小，每次停顿的时间不会太长，但对于老生代来说每次垃圾回收的时间长，停顿会造成很大的影响。 为了解决这个问题 V8 引入了增量标记的方法，将一次停顿进行的过程分为了多步，每次执行完一小步就让运行逻辑执行一会，就这样交替运行。



39. 哪些操作会造成内存泄漏？


*   1. 意外的全局变量
*   2. 被遗忘的计时器或回调函数
*   3. 脱离 DOM 的引用
*   4. 闭包

40. ES6有哪些新特性？

*   块作用域
*   类
*   箭头函数
*   模板字符串
*   加强的对象字面
*   对象解构
*   Promise
*   模块
*   Symbol
*   代理（proxy）Set
*   函数默认参数
*   展开

41. 什么是箭头函数？

//ES5 Version
var getCurrentDate = function (){
  return new Date();
}
​
//ES6 Version
const getCurrentDate = () => new Date();
​
箭头函数表达式的语法比函数表达式更简洁，并且没有自己的`this，arguments，super或new.target`。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。
​
箭头函数没有自己的 this 值。它捕获词法作用域函数的 this 值，如果我们在全局作用域声明箭头函数，则 this 值为 window 对象。


42. 什么是高阶函数？

高阶函数只是将函数作为参数或返回值的函数。
​
function higherOrderFunction(param,callback){
    return callback(param);
}



43. 手写 call、apply 及 bind 函数
1.实现call函数
实现步骤：


处理边界：

对象不存在，this指向window；



将「调用函数」挂载到「this指向的对象」的fn属性上。


执行「this指向的对象」上的fn函数，并传入参数，返回结果。


Function.prototype.mu_call = function (context, ...args) {
    //obj不存在指向window
    if (!context || context === null) {
      context = window;
    }
    // 创造唯一的key值  作为我们构造的context内部方法名
    let fn = Symbol();
​
    //this指向调用call的函数
    context[fn] = this;
​
    // 执行函数并返回结果 相当于把自身作为传入的context的方法进行调用了
    return context[fn](...args);
  };
​
  // 测试
  var value = 2;
  var obj1 = {
    value: 1,
  };
  function bar(name, age) {
    var myObj = {
      name: name,
      age: age,
      value: this.value,
    };
    console.log(this.value, myObj);
  }
  bar.mu_call(null); //打印 2 {name: undefined, age: undefined, value: 2}
  bar.mu_call(obj1, 'tom', '110'); // 打印 1 {name: "tom", age: "110", value: 1}


 2.实现apply函数
实现步骤：

与call一致
区别于参数的形式

Function.prototype.mu_apply = function (context, args) {
  //obj不存在指向window
  if (!context || context === null) {
    context = Window;
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
​
  //this指向调用call的函数
  context[fn] = this;
​
  // 执行函数并返回结果 相当于把自身作为传入的context的方法进行调用了
  return context[fn](...args);
};
​
// 测试
var value = 2;
var obj1 = {
  value: 1,
};
function bar(name, age) {
  var myObj = {
    name: name,
    age: age,
    value: this.value,
  };
  console.log(this.value, myObj);
}
bar.mu_apply(obj1, ["tom", "110"]); // 打印 1 {name: "tom", age: "110", value: 1}


3.实现bind函数


Function.prototype.mu_bind = function (context, ...args) {
    if (!context || context === null) {
      context = window;
    }
    // 创造唯一的key值  作为我们构造的context内部方法名
    let fn = Symbol();
    context[fn] = this;
    let _this = this;
    //  bind情况要复杂一点
    const result = function (...innerArgs) {
      // 第一种情况 :若是将 bind 绑定之后的函数当作构造函数，通过 new 操作符使用，则不绑定传入的 this，而是将 this 指向实例化出来的对象
      // 此时由于new操作符作用  this指向result实例对象  而result又继承自传入的_this 根据原型链知识可得出以下结论
      // this.__proto__ === result.prototype   //this instanceof result =>true
      // this.__proto__.__proto__ === result.prototype.__proto__ === _this.prototype; //this instanceof _this =>true
      if (this instanceof _this === true) {
        // 此时this指向指向result的实例  这时候不需要改变this指向
        this[fn] = _this;
        this[fn](...[...args, ...innerArgs]); //这里使用es6的方法让bind支持参数合并
        delete this[fn];
      } else {
        // 如果只是作为普通函数调用  那就很简单了 直接改变this指向为传入的context
        context[fn](...[...args, ...innerArgs]);
        delete context[fn];
      }
    };
    // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
    // 实现继承的方式: 使用Object.create
    result.prototype = Object.create(this.prototype);
    return result;
  };
  function Person(name, age) {
    console.log(name); //'我是参数传进来的name'
    console.log(age); //'我是参数传进来的age'
    console.log(this); //构造函数this指向实例对象
  }
  // 构造函数原型的方法
  Person.prototype.say = function () {
    console.log(123);
  };
​
  // 普通函数
  function normalFun(name, age) {
    console.log(name); //'我是参数传进来的name'
    console.log(age); //'我是参数传进来的age'
    console.log(this); //普通函数this指向绑定bind的第一个参数 也就是例子中的obj
    console.log(this.objName); //'我是obj传进来的name'
    console.log(this.objAge); //'我是obj传进来的age'
  }
​
  let obj = {
    objName: '我是obj传进来的name',
    objAge: '我是obj传进来的age',
  };
​
  // 先测试作为构造函数调用
  //   let bindFun = Person.mu_bind(obj, '我是参数传进来的name');
  //   let a = new bindFun('我是参数传进来的age');
  //   a.say(); //123
​
  //   再测试作为普通函数调用a;
  let bindFun = normalFun.mu_bind(obj, '我是参数传进来的name');
  bindFun('我是参数传进来的age');


44. 函数柯里化的实现

// 函数柯里化指的是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
​
function curry(fn, args) {
  // 获取函数需要的参数长度
  let length = fn.length;
​
  args = args || [];
​
  return function() {
    let subArgs = args.slice(0);
​
    // 拼接得到现有的所有参数
    for (let i = 0; i < arguments.length; i++) {
      subArgs.push(arguments[i]);
    }
​
    // 判断参数的长度是否已经满足函数所需参数的长度
    if (subArgs.length >= length) {
      // 如果满足，执行函数
      return fn.apply(this, subArgs);
    } else {
      // 如果不满足，递归返回科里化的函数，等待参数的传入
      return curry.call(this, fn, subArgs);
    }
  };
}
​
// es6 实现
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}



45. 实现一个 new 操作符
首先需要了解new做了什么事情：

首先创建了一个空对象。
将空对象proto指向构造函数的原型prototype。
使this指向新创建的对象，并执行构造函数。
执行结果有返回值并且是一个对象， 返回执行的结果， 否则返回新创建的对象。


// 代码实现
function mu_new(fn,...arg){
    // 首先创建空对象
    const obj = {};
    // 将空对象的原型proto指向构造函数的原型prototype
    Object.setPrototypeOf(obj, fn.prototype)
    // 将this指向新创建的对象，并且执行构造函数
    const result = fn.apply(obj,arg);
    // 执行结果有返回值并且是一个对象，返回执行的结果，否侧返回新创建的对象
    return result instanceof Object ? result : obj;
}

// 验证mu_new函数
function Dog(name){
    this.name = name;
    this.say = function(){
        console.log('my name is' + this.name);
    }
}

const dog = mu_new(Dog, "傻🐶");
dog.say() //my name is傻🐶


46. 可以讲讲Promise吗，可以手写实现一下吗？


Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

**那我们来看看我们所熟知的`Promise`的基本原理**

+ 首先我们在调用Promise时，会返回一个Promise对象。
+ 构建Promise对象时，需要传入一个executor函数，Promise的主要业务流程都在executor函数中执行。
+ 如果运行在excutor函数中的业务执行成功了，会调用resolve函数；如果执行失败了，则调用reject函数。
+ Promise的状态不可逆，同时调用resolve函数和reject函数，默认会采取第一次调用的结果。

**结合Promise/A+规范，我们还可以分析出哪些基本特征**

Promise/A+的规范比较多，在这列出一下核心的规范。[Promise/A+规范](https://link.juejin.cn/?target=https%3A%2F%2Fpromisesaplus.com%2F)

+ promise有三个状态：pending，fulfilled，rejected，默认状态是pending。
+ promise有一个value保存成功状态的值，有一个reason保存失败状态的值，可以是undefined/thenable/promise。
+ promise只能从pending到rejected, 或者从pending到fulfilled，状态一旦确认，就不会再改变。
+ promise 必须有一个then方法，then接收两个参数，分别是promise成功的回调onFulfilled, 和promise失败的回调onRejected。
+ 如果then中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调onRejected。

那`CustomPromise`，还实现不了基本原理的3，4两条，那我们来根据基本原理与Promise/A+分析下，还缺少什么

- promise有三个状态：pending，fulfilled，rejected。
- executor执行器调用reject与resolve两个方法
- 还需要有保存成功或失败两个值的变量
- then接收两个参数，分别是成功的回调onFulfilled,失败的回调onRejected



47. 什么是 async/await 及其如何工作, 可以手写async吗



1、Async—声明一个异步函数
  - 自动将常规函数转换成Promise，返回值也是一个Promise对象
  - 只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数
  - 异步函数内部可以使用await
2、Await—暂停异步的功能执行(var result = await someAsyncCall();)
  - 放置在Promise调用之前，await强制其他代码等待，直到Promise完成并返回结果
  - 只能与Promise一起使用，不适用与回调
  - 只能在async函数内部使用



48. instanceof 的优缺点是什么，如何实现

优缺点：

「优点」：能够区分Array、Object和Function，适合用于判断自定义的类实例对象
「缺点」：Number，Boolean，String基本数据类型不能判断

实现步骤：

传入参数为左侧的实例L，和右侧的构造函数R
处理边界，如果要检测对象为基本类型则返回false
分别取传入参数的原型
判断左侧的原型是否取到了null，如果是null返回false；如果两侧原型相等，返回true，否则继续取左侧原型的原型。

// 传入参数左侧为实例L, 右侧为构造函数R
function mu_instanceof(L,R){
    // 处理边界：检测实例类型是否为原始类型
    const baseTypes = ['string','number','boolean','symbol','undefined'];
​
    if(baseTypes.includes(typeof L) || L === null) return false;
​
    // 分别取传入参数的原型
    let Lp = L.__proto__;
    let Rp = R.prototype; // 函数才拥有prototype属性
​
    // 判断原型
    while(true){
        if(Lp === null) return false;
        if(Lp === Rp) return true;
        Lp = Lp.__proto__;
    }
}
​
// 验证
const isArray = mu_instanceof([],Array);
console.log(isArray); //true
const isDate = mu_instanceof('2023-01-09',Date);
console.log(isDate); // false



49. js 的节流与防抖
1.防抖
函数防抖是在事件被触发n秒后再执行回调，如果在「n秒内又被触发」，则「重新计时」

function debounce(fn, wait) {
    let timer = null;
    return function () {
      if (timer != null) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn();
      }, wait);
    };
  }
  // 测试
  function handle() {
    console.log(Math.random());
  }
  // 窗口大小改变，触发防抖，执行handle
  window.addEventListener('resize', debounce(handle, 1000));


2.节流
当事件触发时，保证一定时间段内只调用一次函数。例如页面滚动的时候，每隔一段时间发一次请求
实现步骤：

传入参数为执行函数fn，等待时间wait。
保存初始时间now。
返回一个函数，如果超过等待时间，执行函数，将now更新为当前时间。

function throttle(fn, wait, ...args) {
    var pre = Date.now();
    return function () {
      // 函数可能会有入参
      var context = this;
      var now = Date.now();
      if (now - pre >= wait) {
        // 将执行函数的this指向当前作用域
        fn.apply(context, args);
        pre = Date.now();
      }
    };
  }
​
  // 测试
  var name = 'mu';
  function handle(val) {
    console.log(val + this.name);
  }
  // 滚动鼠标，触发防抖，执行handle
  window.addEventListener('scroll', throttle(handle, 1000, '木由'));



 50.HTML、XML、XHTML 的区别

- `HTML`：超文本标记语言，是语法较为松散的、不严格的`Web`语言；
- `XML`：可扩展的标记语言，主要用于存储数据和结构，可扩展；
- `XHTML`：可扩展的超文本标记语言，基于`XML`，作用与`HTML`类似，但语法更严格。


52.行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

- 行内元素： `a`, `b`, `span`, `img`, `input`, `select`, `strong`;
- 块级元素： `div`, `ul`, `li`, `dl`, `dt`, `dd`, `h1-5`, `p`等；
- 空元素： `<br>`, `<hr>`, `<img>`, `<link>`, `<meta>`;


53. 页面导入样式时，使用link和@import有什么区别

- `link`属于`HTML`标签，而`@import`是`css`提供的；
- 页面被加载时，`link`会同时被加载，而`@import`引用的css会等到页面被加载完再加载；
- `@import`只在`IE5`以上才能识别，而`link`是`XHTML`标签，无兼容问题；
- `link`方式的样式的权重高于`@import`的权重。


54. 如何理解语义化标签

概念
​
语义化是指根据内容的结构化（内容语义化），选择合适的标签（代码语义化），便于开发者阅读和写出更优雅的代码的同时，让浏览器的爬虫和机器很好的解析。
​
语义化的好处
​
- 用正确的标签做正确的事情；
- 去掉或者丢失样式的时候能够让页面呈现出清晰的结构；
- 方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
- 有利于`SEO`：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；
- 便于团队开发和维护，语义化更具可读性，遵循W3C标准的团队都遵循这个标准，可以减少差异化。


55. property和attribute的区别是什么

- `property`是`DOM`中的属性，是`JavaScript`里的对象;
- `attribute`是`HTML`标签上的特性，它的值只能够是字符串;
​
简单的理解就是：`Attribute`就是`DOM`节点自带的属性，例如`html`中常用的`id`、`class`、`title`、`align`等；而`Property`是这个`DOM`元素作为对象，其附加的内容，例如`childNodes`、`firstChild`等。


56. html5有哪些新特性、移除了那些元素

新特性
​
**HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。**
​
- 拖拽释放`(Drag and drop)` `API`；
- 语义化更好的内容标签（`header`, `nav`, `footer`, `aside`, `article`, `section`）;
- 音频、视频API(`audio`, `video`);
- 画布`(Canvas)` `API`;
- 地理`(Geolocation)` `API`;
- 本地离线存储 `localStorage` 长期存储数据，浏览器关闭后数据不丢失；
- `sessionStorage` 的数据在浏览器关闭后自动删除;
- 表单控件:`calendar`、`date`、`time`、`email`、`url`、`search` ;
- 新的技术`webworker`, `websocket`, `Geolocation`等；
​
移除元素
​
**纯表现元素**：
​
- `<basefont>` 默认字体，不设置字体，以此渲染；
- `<font>` 字体标签；
- `<center>` 水平居中；
- `<u>` 下划线；
- `<big>`字体；
- `<strike>`中横字；
- `<tt>`文本等宽；
​
**对可用性产生负面影响的元素**：
​
`<frameset>`,`<noframes>`和`<frame>`；


57. 什么是前端的结构，样式和行为相分离？以及分离的好处是什么？

结构，样式和行为分离
​
若是将前端比作一个人来举例子，结构（`HTML`）就相当于是人体的“骨架”，样式就相当于人体的“装饰”，例如衣服，首饰等；行为就相当于人做出的一系列“动作”。
​
在结构，样式和行为分离，就是将三者分离开，各自负责各自的内容，各部分可以通过引用进行使用。
​
在分离的基础上，我们需要做到代码的：**精简**， **重用**， **有序**。
​
分离的好处
​
- 代码分离，利于团队的开发和后期的维护；
- 减少维护成本，提高可读性和更好的兼容性；



58. 如何对网站的文件和资源进行优化

- 文件合并（目的是减少`http`请求）；
- 文件压缩 （目的是直接减少文件下载的体积）；
- 使用缓存；
- 使用`cdn`托管资源；
- `gizp`压缩需要的js和css文件；
- 反向链接，网站外链接优化；
- meta标签优化（`title`, `description`, `keywords`）,`heading`标签的优化,`alt`优化；

