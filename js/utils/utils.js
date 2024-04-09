/**
 * 输出arr最大值最小值
 * @param arr
 * @returns {{min: number, max: number}}
 */
function maxAndMin(arr){
    return {
        max:Math.max.apply(null,arr),
        min:Math.min.apply(null,arr)
    }
}

/**
 * 判断数组是否相同
 * @param array1
 * @param array2
 * @returns {boolean}
 */
export function scalarArrayEquals(array1, array2) {
    return array1.length === array2.length && array1.every(function(v, i) { return v ===array2[i]})
}

/**
 *  输出数组
 * @param value
 * @returns {*}
 */
const castArray = (value) => (Array.isArray(value) ? value : [value]);
/**
 * Check if an array is empty  检查数组是否为空
 * @param arr
 * @returns {boolean}
 */
const isEmpty = (arr) => !Array.isArray(arr) || arr.length === 0;
/**
 * Compare two arrays regardless of order 比较两个数字是否相同
 * @param a
 * @param b
 * @returns {boolean}
 */
// `a` and `b` are arrays
const isEqual = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort());
/**
 * Count the occurrences of a value in an array // 计算一个值在数组中出现的次数
 * @param arr
 * @param val
 * @returns {*}
 */
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
/**
 * Calculate the number of difference days between two dates 计算两个日期的差值
 * @param date
 * @param otherDate
 * @returns {number}
 */
const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
/**
 * Calculate the number of months between two dates 计算两个日期的月份差值
 * @param startDate
 * @param endDate
 * @returns {number}
 */

const monthDiff = (startDate, endDate) => Math.max(0, (endDate.getFullYear() - startDate.getFullYear()) * 12 - startDate.getMonth() + endDate.getMonth());
/**
 * Convert a date to YYYY-MM-DD format 时间格式化
 * @param date
 * @returns {string}
 */
const formatYmd = (date) => date.toISOString().slice(0, 10);
/**
 * Convert seconds to hh:mm:ss format 时间格式化
 * @param s
 * @returns {string}
 */
const formatSeconds = (s) => new Date(s * 1000).toISOString().substr(11, 8);
/**
 * Get the day of the year from a date 获取日期在一年中的第几天
 * @param date
 * @returns {number}
 */
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
/**
 * Get the month name of a date 获取当前月份名称
 * @param date
 * @returns {string}
 */
const getMonthName = (date) => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', ' November', 'December'][date.getMonth()];
/**
 * Get the weekday of a date 获取当前星期名称
 * @param date
 * @returns {string}
 */
const getWeekday = (date) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
/**
 * Check if an element is a descendant of another 检查一个元素是否在另一个元素之内
 * @param child
 * @param parent
 * @returns {boolean}
 */
const isDescendant = (child, parent) => parent.contains(child);
/**
 *  Check if an element is focused 交检查元素是否聚焦
 * @param ele
 * @returns {boolean}
 */
const hasFocus = (ele) => ele === document.activeElement;
/**
 * Check if user scrolls to the bottom of the page 检查用户是否滚动到底部
 * @returns {boolean}
 */
const isAtBottom = () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight;
/**
 * Get the selected text 获取选中的文字
 * @returns {string}
 */
const getSelectedText = () => window.getSelection().toString();
/**
 * Check if a value is a generator function
 * @param v
 * @returns {boolean}
 */
const isGeneratorFunction = (v) => Object.prototype.toString.call(v) === '[object GeneratorFunction]';
/**
 * Check if a value is an async function
 * @param v
 * @returns {boolean}
 */
const isAsyncFunction = (v) => Object.prototype.toString.call(v) === '[object AsyncFunction]';

/**
 * Box handler
 * @param x
 * @returns {any}
 */
const boxHandler = (x) => ({ next: (f) => boxHandler(f(x)), done: (f) => f(x) });
// First example
const getPercentNumber = (str) =>
    boxHandler(str)
        .next((str) => str.replace(/\%/, ''))
        .next((str) => parseFloat(str))
        .done((res) => res * 0.01);
getPercentNumber('50%'); // 0.5
// example
const getMoney = (price) => Number.parseFloat(price.replace(/\$/, ''));
const getPercent = (percent) => Number.parseFloat(percent.replace(/\%/)) * 0.01;

const getDiscountPrice = (price, discount) =>
    boxHandler(getMoney(price))
        .done((cents) => boxHandler(getPercent(discount)).next((save) => cents - cents * save))
        .done((res) => res);

getDiscountPrice('$6.00', '20%'); // 4.8
/**
 * Check if a value is a function
 * @param v
 * @returns {boolean}
 */
const isFunction = (v) => ['[object Function]', '[object GeneratorFunction]', '[object AsyncFunction]', '[object Promise]'].includes(Object.prototype.toString.call(v));
/**
 * Execute a function once
 * @param fn
 * @returns {function(): *}
 */
const once = (fn) => ((ran = false) => () => ran ? fn : ((ran = !ran), (fn = fn())))();
/**
 * Memoize a function
 * @param fn
 * @returns {function(*=): *}
 */
const memoize = (fn) =>
    (
        (cache = Object.create(null)) =>
            (arg) =>
                cache[arg] || (cache[arg] = fn(arg))
    )();
/**
 * Clear all cookies
 */
const clearCookies = () => document.cookie.split(';').forEach((c) => (document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)));

const uppercaseWords = (str) =>
    str
        .split(' ')
        .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
        .join(' ');

// Or
const uppercaseWords = (str) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());

/**
 * Generate a random hex color
 * @returns {string}
 */
const randomColor = () => `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`;

/**
 * Check if an object is empty
 * @param obj
 * @returns {boolean|boolean}
 */
const isEmpty = (obj) => Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
// Or for enumerable property names only
const isEmpty = (obj) => JSON.stringify(obj) === '{}';

/**
 * Check if an array contains a value matching some criterias
 * @param arr
 * @param criteria
 * @returns {boolean}
 */
const contains = (arr, criteria) => arr.some((v) => criteria(v));
// Or
const contains = (arr, criteria) => arr.some(criteria);
// Or
const contains = (arr, criteria) => arr.filter(criteria).length > 0;
// example
contains([10, 20, 30], (v) => v > 25); // true
contains([10, 20, 30], (v) => v > 100 || v < 15); // true
contains([10, 20, 30], (v) => v > 100); // false

/**
 * Check if a year is leap year
 * @param year
 * @returns {boolean}
 */
const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
// Or
// Get the number of days in February
const isLeapYear = (year) => new Date(year, 1, 29).getDate() === 29;

/**
 * Check if a value is base64 encoded
 * @param value
 * @returns {boolean}
 */
const isBase64 = (value) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(value);

/**
 * Check if a value is an object
 * @param v
 * @returns {boolean|boolean}
 */
const isObject = (v) => v !== null && typeof v === 'object';

/**
 * 获取链接c参数
 * @param {*} url
 * @returns
 */

const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
    ),
    {}
  );
getURLParameters('google.com'); // {}
getURLParameters('http://url.com/page?name=Adam&surname=Smith');

/**
 * 复制粘贴板内容
 * @param {*} str
 */
const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  };

/**
 * Check if a string contains whitespace
 * @param str
 * @returns {function(*=): boolean}
 */
const containsWhitespace = (str) => (str) => /\s/.test(str);

/**
 * Check if a string contains only letters
 * @param str
 * @returns {boolean}
 */
const isAlpha = (str) => /^[A-Z]+$/i.test(str);

/**
 * Check if a string contains only ASCII characters
 * @param str
 * @returns {boolean}
 */
const isAscii = (str) => /^[\x00-\x7F]+$/.test(str);

/**
 * Check if the code is running in NodeJS
 * @type {boolean}
 */
const isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

/**
 * Unescape HTML special characters
 * @param str
 * @returns {string}
 */
const unescape = (str) =>
    str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#0*39;/g, "'")
        .replace(/&quot;/g, '"');

/**
 * Truncate a string at full words
 * @param str
 * @param max
 * @param suffix
 * @returns {*}
 */
const truncate = (str, max, suffix) => (str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`);

/**
 * Strip ANSI codes from a string
 * @param str
 * @returns {void | string | *}
 */
const stripAnsiCodes = (str) => str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');

/**
 * Returns the human-readable format of the given number of milliseconds
 * @param ms
 * @returns {string}
 */
const formatDuration = ms => {
    if (ms < 0) ms = -ms;
    const time = {
        day: Math.floor(ms / 86400000),
        hour: Math.floor(ms / 3600000) % 24,
        minute: Math.floor(ms / 60000) % 60,
        second: Math.floor(ms / 1000) % 60,
        millisecond: Math.floor(ms) % 1000
    };
    return Object.entries(time)
        .filter(val => val[1] !== 0)
        .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
        .join(', ');
};

/**
 * 寻找子集
 * @param arr
 * @returns {*}
 */
const gcd = (...arr) => {
    const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
    return [...arr].reduce((a, b) => _gcd(a, b));
};
gcd(8, 36); // 4
gcd(...[12, 8, 32]); // 4

/**
 * Returns the powerset of a given array of numbers. 全排列
 * @param arr
 * @returns {*}
 */
const powerset = arr => arr.reduce((a, v) => a.concat(a.map(r => r.concat(v))), [[]]);

/**
 * Creates a hash for a value using the SHA-256 algorithm. Returns a promise.
 * @param val
 * @returns {PromiseLike<string>}
 */
const hashBrowser = val =>
    crypto.subtle
        .digest('SHA-256', new TextEncoder('utf-8').encode(val))
        .then(h => {
            let hexes = [],
                view = new DataView(h);
            for (let i = 0; i < view.byteLength; i += 4)
                hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
            return hexes.join('');
        });
hashBrowser(
    JSON.stringify({ a: 'a', b: [1, 2, 3, 4], foo: { c: 'bar' } })
).then(console.log);

/**
 * Parses an HTTP Cookie header string, returning an object of all cookie name-value pairs.
 * @param str
 * @returns {unknown}
 */
const parseCookie = str =>
    str
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
parseCookie('foo=bar; equation=E%3Dmc%5E2');

/**
 * Renders the given DOM tree in the specified DOM element.
 * @param {*} param0
 * @param {*} container
 */
const renderElement = ({ type, props = {} }, container) => {
  const isTextElement = !type;
  const element = isTextElement
    ? document.createTextNode('')
    : document.createElement(type);

  const isListener = p => p.startsWith('on');
  const isAttribute = p => !isListener(p) && p !== 'children';

  Object.keys(props).forEach(p => {
    if (isAttribute(p)) element[p] = props[p];
    if (!isTextElement && isListener(p))
      element.addEventListener(p.toLowerCase().slice(2), props[p]);
  });

  if (!isTextElement && props.children && props.children.length)
    props.children.forEach(childElement =>
      renderElement(childElement, element)
    );

  container.appendChild(element);
};
const myElement = {
  type: 'button',
  props: {
    type: 'button',
    className: 'btn',
    onClick: () => alert('Clicked'),
    children: [{ props: { nodeValue: 'Click me' } }]
  }
};

renderElement(myElement, document.body);

/**
 * Encodes a set of form elements as a query string.
 * @param {*} form
 * @returns
 */
const serializeForm = form =>
  Array.from(new FormData(form), field =>
    field.map(encodeURIComponent).join('=')
  ).join('&');
serializeForm(document.querySelector('#form'));

/**
 * Adds multiple event listeners with the same handler to an element.
 * @param el
 * @param types
 * @param listener
 * @param options
 * @param useCapture
 */
const addMultipleListeners = (el, types, listener, options, useCapture) => {
    types.forEach(type =>
        el.addEventListener(type, listener, options, useCapture)
    );
};
addMultipleListeners(
    document.querySelector('.my-element'),
    ['click', 'mousedown'],
    () => { console.log('hello!') }
);

/**
 * Creates a pub/sub (publish–subscribe) event hub with emit, on, and off methods.
 * @returns {{hub: null, emit(*, *=): void, off(*, *): void, on(*, *=): void}}
 */
const createEventHub = () => ({
    hub: Object.create(null),
    emit(event, data) {
        (this.hub[event] || []).forEach(handler => handler(data));
    },
    on(event, handler) {
        if (!this.hub[event]) this.hub[event] = [];
        this.hub[event].push(handler);
    },
    off(event, handler) {
        const i = (this.hub[event] || []).findIndex(h => h === handler);
        if (i > -1) this.hub[event].splice(i, 1);
        if (this.hub[event].length === 0) delete this.hub[event];
    }
});
const handler = data => console.log(data);
const hub = createEventHub();
let increment = 0;

// Subscribe: listen for different types of events
hub.on('message', handler);
hub.on('message', () => console.log('Message event fired'));
hub.on('increment', () => increment++);

// Publish: emit events to invoke all handlers subscribed to them, passing the data to them as an argument
hub.emit('message', 'hello world'); // logs 'hello world' and 'Message event fired'
hub.emit('message', { hello: 'world' }); // logs the object and 'Message event fired'
hub.emit('increment'); // `increment` variable is now 1

// Unsubscribe: stop a specific handler from listening to the 'message' event
hub.off('message', handler);


const escapeHTML = str =>
    str.replace(
        /[&<>'"]/g,
        tag =>
            ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
    );
escapeHTML('<a href="#">Me & you</a>');
// '&lt;a href=&quot;#&quot;&gt;Me &amp; you&lt;/a&gt;'

/**
 * Generates a UUID in a browser.
 * @returns
 */
const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'

/**
 * Fetches all images from within an element and puts them into an array.
 * @param el
 * @param includeDuplicates
 * @returns {string[]}
 */
const getImages = (el, includeDuplicates = false) => {
    const images = [...el.getElementsByTagName('img')].map(img =>
        img.getAttribute('src')
    );
    return includeDuplicates ? images : [...new Set(images)];
};
getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false); // ['image1.jpg', 'image2.png', '...']

/**
 * Injects the given CSS code into the current document
 * @param css
 * @returns {HTMLStyleElement}
 */
const injectCSS = css => {
    let el = document.createElement('style');
    el.type = 'text/css';
    el.innerText = css;
    document.head.appendChild(el);
    return el;
};
injectCSS('body { background-color: #000 }');

/**
 * Adds an event listener to an element that will only run the callback the first time the event is triggered
 * @param el
 * @param evt
 * @param fn
 * @returns {*}
 */
const listenOnce = (el, evt, fn) =>
    el.addEventListener(evt, fn, { once: true });
listenOnce(
    document.getElementById('my-id'),
    'click',
    () => console.log('Hello world')
); // 'Hello world' will only be logged on the first click

/**
 * Checks if the given element has the specified class.
 * @param el
 * @param className
 * @returns {boolean}
 */
const hasClass = (el, className) => el.classList.contains(className);

/**
 * Smoothly scrolls the element on which it's called into the visible area of the browser window.
 * @param element
 */
const smoothScroll = element =>
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });
smoothScroll('#fooBar'); // scrolls smoothly to the element with the id fooBar
smoothScroll('.fooBar');

/*
 * Invokes the provided callback on each animation frame.
 * @param {*} callback
 * @param {*} autoStart
 * @returns
 */
const recordAnimationFrames = (callback, autoStart = true) => {
  let running = false,
    raf;
  const stop = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(raf);
  };
  const start = () => {
    if (running) return;
    running = true;
    run();
  };
  const run = () => {
    raf = requestAnimationFrame(() => {
      callback();
      if (running) run();
    });
  };
  if (autoStart) start();
  return { start, stop };
};
/**
 * Returns the scroll position of the current page.
 * @param el
 * @returns {{x: (number), y: (number)}}
 */
const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

/**
 * Returns the human-readable format of the given number of milliseconds.
 * @param ms
 * @returns {string}
 */
const formatDuration = ms => {
    if (ms < 0) ms = -ms;
    const time = {
        day: Math.floor(ms / 86400000),
        hour: Math.floor(ms / 3600000) % 24,
        minute: Math.floor(ms / 60000) % 60,
        second: Math.floor(ms / 1000) % 60,
        millisecond: Math.floor(ms) % 1000
    };
    return Object.entries(time)
        .filter(val => val[1] !== 0)
        .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
        .join(', ');
};
formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574);
// '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'

/**
 * implement a sleep function in JavaScript
 * @param ms
 */
const sleepSync = (ms) => {
    const end = new Date().getTime() + ms;
    while (new Date().getTime() < end) { /* do nothing */ }
}

const printNums = () => {
    console.log(1);
    sleepSync(500);
    console.log(2);
    console.log(3);
};

printNums(); // Logs: 1, 2, 3 (2 and 3 log after 500ms)

const sleep = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

const printNums1 = async() => {
    console.log(1);
    await sleep(500);
    console.log(2);
    console.log(3);
};

printNums1(); // Logs: 1, 2, 3 (2 and 3 log after 500ms)

/**
 * implement a singleton in JavaScript
 * @param className
 * @returns {*}
 */
const singletonify = (className) => {
    return new Proxy(className.prototype.constructor, {
        instance: null,
        construct: (target, argumentsList) => {
            if (!this.instance)
                this.instance = new target(...argumentsList);
            return this.instance;
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
myObj2.printMsg();           // 'first'

/**
 * Counts the occurrences of a substring in a given string
 * @param {*} str
 * @param {*} searchValue
 * @returns
 */
const countSubstrings = (str, searchValue) => {
  let count = 0,
    i = 0;
  while (true) {
    const r = str.indexOf(searchValue, i);
    if (r !== -1) [count, i] = [count + 1, r + 1];
    else return count;
  }
};
countSubstrings('tiktok tok tok tik tok tik', 'tik'); // 3
countSubstrings('tutut tut tut', 'tut'); // 4

/**
 * Calculates the distance between two points in any number of dimensions.
 * @param {*} a
 * @param {*} b
 * @returns
 */
const euclideanDistance = (a, b) =>
  Math.hypot(...Object.keys(a).map(k => b[k] - a[k]));
euclideanDistance([1, 1], [2, 3]); // ~2.2361
euclideanDistance([1, 1, 1], [2, 3, 2]); // ~2.4495

/**
 * Finds the first index of a given element in an array using the linear search algorithm
 * @param {*} arr
 * @param {*} item
 * @returns
 */
const linearSearch = (arr, item) => {
  for (const i in arr) {
    if (arr[i] === item) return +i;
  }
  return -1;
};
linearSearch([2, 9, 9], 9); // 1
linearSearch([2, 9, 9], 7); // -1
/**
 * How can I define an enum in JavaScript
 */
class Enum {
    constructor(...keys) {
        keys.forEach((key, i) => {
            this[key] = i;
        });
        Object.freeze(this);
    }

    *[Symbol.iterator]() {
        for (let key of Object.keys(this)) yield key;
    }
}

const daysEnum = new Enum(
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
);

const days = [...daysEnum]; // Array of the enum values as strings

/**
 * Creates a throttled function that only invokes the provided function at most once per every wait milliseconds
 * @param fn
 * @param wait
 * @returns {function(...[*]=)}
 */
const throttle = (fn, wait) => {
    let inThrottle, lastFn, lastTime;
    return function() {
        const context = this,
            args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function() {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};

/**
 * Converts an array of objects to a comma-separated values (CSV) string that contains only the columns specified.
 * @param arr
 * @param columns
 * @param delimiter
 * @returns {string}
 * @constructor
 */
const JSONtoCSV = (arr, columns, delimiter = ',') =>
    [
        columns.join(delimiter),
        ...arr.map(obj =>
            columns.reduce(
                (acc, key) =>
                    `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
                ''
            )
        ),
    ].join('\n');
JSONtoCSV(
    [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
    ['a', 'b']
); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
JSONtoCSV(
    [{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }],
    ['a', 'b'],
    ';'
); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'

/**
 * compare two objects in JavaScript
 * @param {*} a
 * @param {*} b
 * @returns
 */
const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
    return a === b;
  if (a.prototype !== b.prototype) return false;
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};

const a = { name: 'John', age: 26 };
const b = { name: 'John', age: 26 };

equals(a, b); // true

const c = { name: 'John' };
const d = { name: 'John', age: undefined };

equals(c, d); // false

/**
 * queryStringToObject
 * @param url
 * @returns {*}
 */
const queryStringToObject = url =>
    [...new URLSearchParams(url.split('?')[1])].reduce(
        (a, [k, v]) => ((a[k] = v), a),
        {}
    );
queryStringToObject('https://google.com?page=1&count=10');

/**
 * Generates a query string from the key-value pairs of the given object
 * @param queryParameters
 * @returns {string}
 */
const objectToQueryString = queryParameters => {
    return queryParameters
        ? Object.entries(queryParameters).reduce(
            (queryString, [key, val], index) => {
                const symbol = queryString.length === 0 ? '?' : '&';
                queryString +=
                    typeof val === 'string' ? `${symbol}${key}=${val}` : '';
                return queryString;
            },
            ''
        )
        : '';
};
objectToQueryString({ page: '1', size: '2kg', key: undefined });

/**
 * Deep maps an object's keys
 * @param obj
 * @param fn
 * @returns {any}
 */
const deepMapKeys = (obj, fn) =>
    Array.isArray(obj)
        ? obj.map(val => deepMapKeys(val, fn))
        : typeof obj === 'object'
        ? Object.keys(obj).reduce((acc, current) => {
            const key = fn(current);
            const val = obj[current];
            acc[key] =
                val !== null && typeof val === 'object' ? deepMapKeys(val, fn) : val;
            return acc;
        }, {})
        : obj;
const obj = {
    foo: '1',
    nested: {
        child: {
            withArray: [
                {
                    grandChild: ['hello']
                }
            ]
        }
    }
};
const upperKeysObj = deepMapKeys(obj, key => key.toUpperCase());
/*
{
  "FOO":"1",
  "NESTED":{
    "CHILD":{
      "WITHARRAY":[
        {
          "GRANDCHILD":[ 'hello' ]
        }
      ]
    }
  }
}
*/
/**
 * Gets the target value in a nested JSON object, based on the given key
 * @param obj
 * @param target
 * @returns {*}
 */
const dig = (obj, target) =>
    target in obj
        ? obj[target]
        : Object.values(obj).reduce((acc, val) => {
            if (acc !== undefined) return acc;
            if (typeof val === 'object') return dig(val, target);
        }, undefined);
const data = {
    level1: {
        level2: {
            level3: 'some data'
        }
    }
};
dig(data, 'level3'); // 'some data'
dig(data, 'level4'); // undefined

/**
 * Checks if the target value exists in a JSON object
 * @param obj
 * @param keys
 * @returns {boolean}
 */
const hasKey = (obj, keys) => {
    return (
        keys.length > 0 &&
        keys.every(key => {
            if (typeof obj !== 'object' || !obj.hasOwnProperty(key)) return false;
            obj = obj[key];
            return true;
        })
    );
};
let obj = {
    a: 1,
    b: { c: 4 },
    'b.d': 5
};
hasKey(obj, ['a']); // true
hasKey(obj, ['b']); // true
hasKey(obj, ['b', 'c']); // true
hasKey(obj, ['b.d']); // true
hasKey(obj, ['d']); // false
hasKey(obj, ['c']); // false
hasKey(obj, ['b', 'f']); // false

/**
 * Nests recursively objects linked to one another in a flat array
 * @param items
 * @param id
 * @param link
 * @returns {(T | {children: *})[]}
 */
const nest = (items, id = null, link = 'parent_id') =>
    items
        .filter(item => item[link] === id)
        .map(item => ({ ...item, children: nest(items, item.id, link) }));
const comments = [
    { id: 1, parent_id: null },
    { id: 2, parent_id: 1 },
    { id: 3, parent_id: 1 },
    { id: 4, parent_id: 2 },
    { id: 5, parent_id: 4 }
];
const nestedComments = nest(comments);
// [{ id: 1, parent_id: null, children: [...] }]

/**
 * Checks if the passed value is an object or not
 * @param {*} obj
 * @returns
 */
const isObject = obj => obj === Object(obj);
isObject([1, 2, 3, 4]); // true
isObject([]); // true
isObject(['Hello!']); // true
isObject({ a: 1 }); // true
isObject({}); // true
isObject(true); // false

/**
 * 16进制颜色转rgb
 * @param hex
 * @returns {string}
 */
const hexToRGB = hex => {
    let alpha = false,
        h = hex.slice(hex.startsWith('#') ? 1 : 0);
    if (h.length === 3) h = [...h].map(x => x + x).join('');
    else if (h.length === 8) alpha = true;
    h = parseInt(h, 16);
    return (
        'rgb' +
        (alpha ? 'a' : '') +
        '(' +
        (h >>> (alpha ? 24 : 16)) +
        ', ' +
        ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
        ', ' +
        ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
        (alpha ? `, ${h & 0x000000ff}` : '') +
        ')'
    );
};

/**
 * Generate a series of colors from a given color
 * @param str
 * @param count
 * @returns {string[]}
 */
const getColorList = (str,count = 20) =>{
    const [r,g,b] = hexToRGB(str).filter(i=>!!i)
    const rDistance = Math.floor((255 - r) / count)
    const gDistance = Math.floor((255 - g) / count)
    const bDistance = Math.floor((255 - b) / count)
    return Array.from({length:count}).map((i,d)=> {
        const red = (r+rDistance*d).toString(16)
        const green = (g+gDistance*d).toString(16)
        const black = (b+bDistance*d).toString(16)
        const R = red.length < 2 ? '0' + red :  red
        const G = green.length < 2 ? '0' + green :  green
        const B = black.length < 2 ? '0' + black :  black
        return '#' + R + G + B
    })
}
/**
 * Checks if two URLs are on the same origin
 * @param origin
 * @param destination
 * @returns {boolean|boolean}
 */
const isSameOrigin = (origin, destination) =>
    origin.protocol === destination.protocol && origin.host === destination.host;
const origin = new URL('https://www.30secondsofcode.org/about');
const destination = new URL('https://www.30secondsofcode.org/contact');
isSameOrigin(origin, destination); // true
const other = new URL('https://developer.mozilla.org);
isSameOrigin(origin, other); // false


/**
 * 各种类型的文件限制
 * @param limitType 文件类型
 * @param limitSize 文件大小
 * @returns
 */
 export const beforeUploadCreate = (limitType:string[],limitSize:number = 1024 * 1024 * 50) => {
    return (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }): Promise<boolean> => {
      const { type, file } = data.file;
      if (!limitType.includes(type as string)) {
        win?.$message.error('文件类型不符合要求');
        return Promise.resolve(false);
      }
      if (file && limitSize < file.size) {
        win?.$message.error('最大上传50M');
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(false);
      }
      return Promise.resolve(true);
    };
  }



  /**
 * 字符串下划线转驼峰
 * @param value
 * @returns
 */
export const formatToHump = (value:string) => {
    return value.replace(/\_(\w)/g,(_,letter)=>letter.toUpperCase())
  }
  
  /**
 * 字符串驼峰转下划线
 * @param value
 * @returns
 */
export const formatToLine = (value:string) =>{
    return value.replace(/([A-Z])/g,'_$1').toLowerCase()
}

  /**
 * 保留 count 位小数
 * @param value 
 * @param obj 
 * @param key 
 * @param count 
 */
export const handleFloatCount = (value: number | null,obj:any,key:string,count:number = 2) => {
    const x = String(value).indexOf(".") + 1;
    const y = String(value).length - x;
    if (y > count && x > 0) {
      obj[key] = Number(value)?.toFixed(count);
    } else {
      obj[key] = value;
    }
  };

/**
 * 日期格式化
 * @param {*} value 
 * @param {*} fmt 
 * @returns 
 */
  export const dateFormat = (value: number | string | Date | null, fmt: string) => {
    if (!value) return '';
    const date = new Date(value);
    const o: obj = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
      }
    }
    return fmt;
  };

  /**
   * 生成随机色
   * @returns 
   */

  const generateRandomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`

/**
 * 检测元素是否在屏幕中
 * @param {*} entries 
 */
  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // `entry.target` is the dom element
        console.log(`${entry.target.id} is visible`);
      }
    });
  };
  
  const options = {
    threshold: 1.0,
  };
  const observer = new IntersectionObserver(callback, options);
  const btn = document.getElementById("btn");
  const bottomBtn = document.getElementById("bottom-btn");
  observer.observe(btn);
  observer.observe(bottomBtn);



  
