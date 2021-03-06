/*
* 归并排序
* 归并排序建立在归并操作之上, 它采取分而治之的思想, 将数组拆分为两个子数组, 分别排序,
* 最后才将两个子数组合并; 拆分的两个子数组, 再继续递归拆分为更小的子数组, 进而分别排序,
* 直到数组长度为1, 直接返回该数组为止
 */
function mergeSort(array) {  //采用自上而下的递归方法
    let length = array.length;
    if(length < 2) {
        return array;
    }
    let m = (length >> 1),
        left = array.slice(0, m),
        right = array.slice(m); //拆分为两个子数组
    return merge(mergeSort(left), mergeSort(right));//子数组继续递归拆分,然后再合并
}
function merge(left, right){ //合并两个子数组
    let result = [];
    while (left.length && right.length) {
        let item = left[0] <= right[0] ? left.shift() : right.shift();//注意:判断的条件是小于或等于,如果只是小于,那么排序将不稳定.
        result.push(item);
    }
    return result.concat(left.length ? left : right);
}