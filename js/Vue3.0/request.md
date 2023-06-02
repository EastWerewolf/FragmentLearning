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