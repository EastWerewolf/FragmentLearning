/**
 * implement a singleton in JavaScript  单利化
 * @param className
 * @returns {*}
 */
const singletonify = (className) => {
  return new Proxy(className.prototype.constructor, {
      instance: null,
      construct: (target, argumentsList) => {
          if (!this.instance)
              this.instance = new target(...argumentsList);
          return this.instance
      }
  });
}

class MyClass {
  constructor(msg) {
      this.msg = msg;
  }

  printMsg() {
      console.log(this.msg);
  }
}

const MySingletonClass = singletonify(MyClass);

const myObj = new MySingletonClass('first');
myObj.printMsg();           // 'first'
const myObj2 = new MySingletonClass('second');
myObj2.printMsg();  

// console.log(myObj2)
console.log(myObj2,'myObj2')


/**
 * 创建缓存函数
 * @param {*} fn 
 * @returns 
 */
function cached (fn) {
    const cache = Object.create(null)
    return (function cachedFn (str) {
      const hit = cache[str]
      return hit || (cache[str] = fn(str))
    })
  }

/**
 * 判断两个值是否全等
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
  export function looseEqual (a, b) {
    // 当 a === b 时，返回true
    if (a === b) return true
    // 否则进入isObject判断
    const isObjectA = isObject(a)
    const isObjectB = isObject(b)
    // 判断是否都为Object类型
    if (isObjectA && isObjectB) {
      try {
        // 调用 Array.isArray() 方法，再次进行判断
        // isObject 不能区分是真数组还是对象（typeof）
        const isArrayA = Array.isArray(a)
        const isArrayB = Array.isArray(b)
        // 判断是否都为数组
        if (isArrayA && isArrayB) {
          // 对比a、bs数组的长度
          return a.length === b.length && a.every((e, i) => {
            // 调用 looseEqual 进入递归
            return looseEqual(e, b[i])
          })
        } else if (!isArrayA && !isArrayB) {
          // 均不为数组，获取a、b对象的key集合
          const keysA = Object.keys(a)
          const keysB = Object.keys(b)
          // 对比a、b对象的key集合长度
          return keysA.length === keysB.length && keysA.every(key => {
            //长度相等，则调用 looseEqual 进入递归
            return looseEqual(a[key], b[key])
          })
        } else {
          // 如果a、b中一个是数组，一个是对象，直接返回 false
          /* istanbul ignore next */
          return false
        }
      } catch (e) {
        /* istanbul ignore next */
        return false
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b)
    } else {
      return false
    }
  }