
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