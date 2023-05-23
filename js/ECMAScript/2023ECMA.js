// 新的数组api
// findLast
// 反向迭代数组，并返回满足提供的测试函数的第一个元素的值, 如果没有找到返回undefined
ini复制代码const isEven = (number) => number % 2 === 0;
const numbers = [1, 2, 3, 4];
console.log(numbers.findLast(isEven)); // 4


// findLastIndex
// 反向迭代数组，并返回满足所提供的测试函数的第一个元素的索引。若没有找到对应元素，则返回 -1
ini复制代码const isEven = (number) => number % 2 === 0;
const numbers = [1, 2, 3, 4];
console.log(numbers.findLastIndex(isEven)); // 3
