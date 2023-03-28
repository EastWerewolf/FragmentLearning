
// Capitalize a string

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

// Or
const capitalize = ([first, ...rest]) => `${first.toUpperCase()}${rest.join('')}`;

// Or
const capitalize = (str) => str.replace(/^([a-z])/, (first) => first.toUpperCase());


// Wrap a number between two values


const wrap = (num, min, max) => ((((num - min) % (max - min)) + (max - min)) % (max - min)) + min;



// Check if a path is relative


const isRelative = (path) => !/^([a-z]+:)?[\\/]/i.test(path);


// Check if a string is a palindrome

const isPalindrome = (str) => str === str.split('').reverse().join('');

// Check if a string consists of a repeated character sequence

const consistsRepeatedSubstring = (str) => `${str}${str}`.indexOf(str, 1) !== str.length;


// Check if two strings are anagram

const areAnagram = (str1, str2) => str1.toLowerCase().split('').sort().join('') === str2.toLowerCase().split('').sort().join('');


// Check if a URL is absolute

const isAbsoluteUrl = (url) => /^[a-z][a-z0-9+.-]*:/.test(url);


// Convert a base64 encoded string to an uint8 array

const base64ToUint8 = (str) => Uint8Array.from(atob(str), (c) => c.charCodeAt(0));


// Convert a string to camelCase

const toCamelCase = (str) => str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));

// Convert a string to PascalCase

const toPascalCase = (str) => (str.match(/[a-zA-Z0-9]+/g) || []).map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');



// Convert a string to URL slug

const slugify = (str) =>
    str
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');



// Convert a Windows file path to Unix path

const toUnixPath = (path) => path.replace(/[\\/]+/g, '/').replace(/^([a-zA-Z]+:|\.\/)/, '');



// Convert snake_case to camelCase

const snakeToCamel = (str) => str.toLowerCase().replace(/(_\w)/g, (m) => m.toUpperCase().substr(1));


// Convert an uint8 array to a base64 encoded string


const uint8ToBase64 = (arr) =>
    btoa(
        Array(arr.length)
            .fill('')
            .map((_, i) => String.fromCharCode(arr[i]))
            .join('')
    );

// For Node.js
const uint8ToBase64 = (arr) => Buffer.from(arr).toString('base64');



// Convert the name of an Excel column to number


const getIndex = (col) => col.split('').reduce((prev, next) => prev * 26 + parseInt(next, 36) - 9, 0);


// Convert camelCase to kebab-case and vice versa


const kebabToCamel = (str) => str.replace(/-./g, (m) => m.toUpperCase()[1]);

const camelToKebab = (str) => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();


// Count the number of words in a string

const countWords = (str) => str.trim().split(/\s+/).length;



// Decode HTML entities


const decodeHtmlEntities = (str) => str.replace(/&#(\w+)(^\w|;)?/g, (_, dec) => String.fromCharCode(dec));



// Decapitalize a string

const decapitalize = (str) => `${str.charAt(0).toLowerCase()}${str.slice(1)}`;

// Or
const decapitalize = ([first, ...rest]) => `${first.toLowerCase()}${rest.join('')}`;



// Escape HTML special characters

const escape = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');

// Or
const escape = (str) => str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));


// Count the occurrences of a character in a string


const countOccurrences = (str, char) => [...str].reduce((a, v) => (v === char ? a + 1 : a), 0);

// Or
const countOccurrences = (str, char) => str.split('').reduce((a, v) => (v === char ? a + 1 : a), 0);

// Or
const countOccurrences = (str, char) => [...str].filter((item) => item === char).length;

// Or
const countOccurrences = (str, char) => str.split('').filter((item) => item === char).length;


// Get the length of a string in bytes


const bytes = (str) => new Blob([str]).size;



// Remove empty lines of a text document


const removeEmptyLines = (str) =>
    str
        .split(/\r?\n/)
        .filter((line) => line.trim() !== '')
        .join('\n');


// Remove duplicate lines of a text document


const removeDuplicateLines = (str) => Array.from(new Set(str.split(/\r?\n/))).join('\n');


// Remove spaces from a string


const removeSpaces = (str) => str.replace(/\s/g, '');



// Replace multiple spaces with a single space


// Replace spaces, tabs and new line characters
const replaceSpaces = (str) => str.replace(/\s\s+/g, ' ');

// Only replace spaces
const replaceOnlySpaces = (str) => str.replace(/  +/g, ' ');



// Replace all tab characters with spaces


const replace = (str, numSpaces = 4) => str.replaceAll('\t', ' '.repeat(numSpaces));






// Check if a value is a function



const isFunction = (v) => ['[object Function]', '[object GeneratorFunction]', '[object AsyncFunction]', '[object Promise]'].includes(Object.prototype.toString.call(v));


// Box handler


const boxHandler = (x) => ({ next: (f) => boxHandler(f(x)), done: (f) => f(x) });


// First example
const getPercentNumber = (str) =>
    boxHandler(str)
        .next((str) => str.replace(/\%/, ''))
        .next((str) => parseFloat(str))
        .done((res) => res * 0.01);

getPercentNumber('50%'); // 0.5

// Second example
const getMoney = (price) => Number.parseFloat(price.replace(/\$/, ''));
const getPercent = (percent) => Number.parseFloat(percent.replace(/\%/)) * 0.01;

const getDiscountPrice = (price, discount) =>
    boxHandler(getMoney(price))
        .done((cents) => boxHandler(getPercent(discount)).next((save) => cents - cents * save))
        .done((res) => res);

getDiscountPrice('$6.00', '20%'); // 4.8





// Compose functions from left to right



const pipe =
    (...fns) =>
    (x) =>
        fns.reduce((y, f) => f(y), x);



const lowercase = (str) => str.toLowerCase();
const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
const reverse = (str) => str.split('').reverse().join('');

const fn = pipe(lowercase, capitalize, reverse);

// We will execute `lowercase`, `capitalize` and `reverse` in order
fn('Hello World') === 'dlrow olleH';


/// Curry a function


const curry = (fn, ...args) => (fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args));



// Delay the evaluation of a function


// returns a new version of `fn` that returns values as lazy evaluable
const thunkfy =
    (fn) =>
    (...args) =>
    () =>
        fn(...args);


const heavyComputation = (x) => doStuff(x);
const unnecessarySlow = manyThings.map(heavyComputation).find((result) => result.criteria);
const probablyFaster = manyThings.map(thunkfy(heavyComputation)).find((thunk) => thunk().criteria);



// Execute a function once

const once = (fn) =>
    (
        (ran = false) =>
        () =>
            ran ? fn : ((ran = !ran), (fn = fn()))
    )();



let n = 0;
const incOnce = once(() => ++n);
incOnce(); // n = 1
incOnce(); // n = 1
incOnce(); // n = 1



// Create an empty function

const noop = () => {};

// Or
const noop = Function();
// calling Function() might be detected as using eval by some security tools



// Memoize a function

const memoize = (fn) =>
    (
        (cache = Object.create(null)) =>
        (arg) =>
            cache[arg] || (cache[arg] = fn(arg))
    )();


// Check if a date is a weekday

// `date` is a Date object
const isWeekday = (date = new Date()) => date.getDay() % 6 !== 0;


// Generate a random integer in given range


const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;



// Generate a random floating point number in given range


const randomFloat = (min, max) => Math.random() * (max - min) + min;



// Sort an object by its properties



const sort = (obj) =>
    Object.keys(obj)
        .sort()
        .reduce((p, c) => ((p[c] = obj[c]), p), {});




// Generate a random boolean

const randomBoolean = () => Math.random() >= 0.5;