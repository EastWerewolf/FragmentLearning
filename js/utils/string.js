
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
