/**
 * 从算法逻辑上看, 选择排序是一种简单且直观的排序算法.
 * 它也是两层循环. 内层循环就像工人一样, 它是真正做事情的, 内层循环每执行一遍, 将选出本次待排序的元素中最小(或最大)的一个,
 * 存放在数组的起始位置. 而 外层循环则像老板一样, 它告诉内层循环你需要不停的工作, 直到工作完成(也就是全部的元素排序完成)
 */
function selectSort(array) {
    let length = array.length, min;
    for (let i = 0; i < length - 1; i++) {
        min = i;
        for (let j = i + 1; j < length; j++) {
            array[j] < array[min] && (min = j); //记住最小数的下标
        }
        min!==i && swap(i,min,array);
    }
    return array;
}