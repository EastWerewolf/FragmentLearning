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
