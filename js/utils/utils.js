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
