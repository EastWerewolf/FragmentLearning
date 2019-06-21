/**
 * 堆排序
 * 堆排序是利用堆这种数据结构所设计的一种排序算法.
 * 它是选择排序的一种. 堆分为大根堆和小根堆. 大根堆要求每个子节点的值都不大于其父节点的值,
 * 即array[childIndex] <= array[parentIndex], 最大的值一定在堆顶. 小根堆与之相反,
 * 即每个子节点的值都不小于其父节点的值, 最小的值一定在堆顶. 因此我们可使用大根堆进行升序排序, 使用小根堆进行降序排序
 * 算法的基本思想(以大根堆为例):
 * 先将初始序列K[1..n]建成一个大根堆, 此堆为初始的无序区.
 * 再将关键字最大的记录K1 (即堆顶)和无序区的最后一个记录K[n]交换, 由此得到新的无序区K[1..n-1]和有序区K[n], 且满足K[1..n-1].keys≤K[n].key
 * 交换K1 和 K[n] 后, 堆顶可能违反堆性质, 因此需将K[1..n-1]调整为堆. 然后重复步骤2, 直到无序区只有一个元素时停止.
 */
function heapAdjust(array, i, length) {//堆调整
    let left = 2 * i + 1,
        right = 2 * i + 2,
        largest = i;
    if (left < length && array[largest] < array[left]) {
        largest = left;
    }
    if (right < length && array[largest] < array[right]) {
        largest = right;
    }
    if (largest !== i) {
        swap(i, largest, array);
        heapAdjust(array, largest, length);
    }
}
function heapSort(array) {
    //建立大顶堆
    length = array.length;
    for (let i = length>>1; i >= 0; i--) {
        heapAdjust(array, i, length);
    }
    //调换第一个与最后一个元素,重新调整为大顶堆
    for (let i = length - 1; i > 0; i--) {
        swap(0, i, array);
        heapAdjust(array, 0, --length);
    }
    return array;
}