/**
 * 双向冒泡排序是冒泡排序的一个简易升级版, 又称鸡尾酒排序.
 * 冒泡排序是从低到高(或者从高到低)单向排序, 双向冒泡排序顾名思义就是从两个方向分别排序
 * (通常, 先从低到高, 然后从高到低). 因此它比冒泡排序性能稍好一些.
 */
//先将交换元素部分抽象出来
function swap(i,j,array){
    let temp = array[j];
    array[j] = array[i];
    array[i] = temp;
}
function bothwayBubbleSort(array){
    let tail = array.length-1, i, isSwap = false;
    for(i = 0; i < tail; tail--){
        for(let j = tail; j > i; j--){    //第一轮, 先将最小的数据冒泡到前面
            array[j-1] > array[j] && (isSwap = true) && swap(j,j-1,array);
        }
        i++;
        for(j = i; j < tail; j++){        //第二轮, 将最大的数据冒泡到后面
            array[j] > array[j+1] && (isSwap = true) && swap(j,j+1,array);
        }
    }
    return array;
}