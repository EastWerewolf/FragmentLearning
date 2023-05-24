// 新的数组api
// findLast
// 反向迭代数组，并返回满足提供的测试函数的第一个元素的值, 如果没有找到返回undefined
const isEven = (number) => number % 2 === 0;
const numbers = [1, 2, 3, 4];
console.log(numbers.findLast(isEven)); // 4


// findLastIndex
// 反向迭代数组，并返回满足所提供的测试函数的第一个元素的索引。若没有找到对应元素，则返回 -1
const isEven = (number) => number % 2 === 0;
const numbers = [1, 2, 3, 4];
console.log(numbers.findLastIndex(isEven)); // 3



// toSorted sort方法的复制版本，复制原数组，然后对新数组排序，并返回新数组。
// 排序逻辑和参数都和sort方法一样
const array = [3, 2, 1];
const sortedArray = array.toSorted();
console.log(sortedArray); // [1, 2, 3]
console.log(array); // 原数组不变 [3, 2, 1]
