/*
* 快速排序
* 快速排序借用了分治的思想, 并且基于冒泡排序做了改进.
* 它由C. A. R. Hoare在1962年提出. 它将数组拆分为两个子数组,
* 其中一个子数组的所有元素都比另一个子数组的元素小,
* 然后对这两个子数组再重复进行上述操作, 直到数组不可拆分, 排序完成.
 */

function quickSort(array, Left, Right) {
    let partitionIndex,
        left = typeof Left == 'number' ? Left : 0,
        right = typeof Right == 'number' ? Right : array.length-1;
    if (left < right) {
        partitionIndex = partition(array, left, right);//切分的基准值
        quickSort(array, left, partitionIndex-1);
        quickSort(array, partitionIndex+1, right);
    }
    return array;
}
function partition(array, left ,right) {   //分区操作
    for (let i = left+1, j = left; i <= right; i++) {//j是较小值存储位置的游标
        array[i] < array[left] && swap(i, ++j, array);//以第一个元素为基准
    }
    swap(left, j, array);            //将第一个元素移至中间
    return j;
}