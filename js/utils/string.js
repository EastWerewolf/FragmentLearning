
// Capitalize a string

const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

// Or
const capitalize = ([first, ...rest]) => `${first.toUpperCase()}${rest.join('')}`;

// Or
const capitalize = (str) => str.replace(/^([a-z])/, (first) => first.toUpperCase());