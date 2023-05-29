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



//toReversed reverse方法的复制版本；复制数组原数组，对新数组颠倒顺序，并返回新数组。
const original = [1, 2, 3, 4];
const reversed = original.toReversed();
console.log(original);  // [ 1, 2, 3, 4 ] 原数组不变
console.log(reversed);  // [ 4, 3, 2, 1 ]


//toSpliced splice() 方法的复制版本。它返回一个新数组，并在给定的索引处删除和/或替换了一些元素。
const original = ["Jan", "Mar", "Apr", "May"];
  // 在索引 1 处添加一个元素
const spliced = months.toSpliced(1, 0, "Feb");
console.log(spliced); // ["Jan", "Feb", "Mar", "Apr", "May"]
console.log(original); // ["Jan", "Mar", "Apr", "May"]  原数组不变


// with 使用方括号表示法修改指定索引值的复制方法版本
const arr = [1, 2, 3, 4, 5];
console.log(arr.with(2, 6)); // [1, 2, 6, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5] 原数组不变




// 📌toSorted、toReversed、toSpliced、with在处理数组的时候会将稀疏数组的空值转成undefined

const arr = [1, , 3, 4, , 6];
console.log(arr.with(0, 2)); // [2, undefined, 3, 4, undefined, 6]



// toSorted、toReversed、toSpliced、with可以使用call或者apply在类数组对象上应用
function fn1(){
    console.log(Array.prototype.with.call(arguments,2,6)); // [1,2,6,4,5]
  }
  fn1(1,2,3,4,5)
  
  const arrayLike = {
    length: 3,
    unrelated: "foo",
    0: 5,
    2: 4,
  };
  console.log(Array.prototype.with.call(arrayLike, 0, 1));
  // [ 1, undefined, 4 ]



