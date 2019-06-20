/**
 * 希尔排序
 * 算法的基本思想:
 * 将数组拆分为若干个子分组, 每个分组由相距一定"增量"的元素组成.
 * 比方说将[0,1,2,3,4,5,6,7,8,9,10]的数组拆分为"增量"为5的分组, 那么子分组分别为 [0,5], [1,6], [2,7], [3,8], [4,9] 和 [5,10].
 * 然后对每个子分组应用直接插入排序.逐步减小"增量", 重复步骤1,2.
 * 直至"增量"为1, 这是最后一个排序, 此时的排序, 也就是对全数组进行直接插入排序.
 */

//形参增加步数gap(实际上就相当于gap替换了原来的数字1)
function directInsertionSort(array, gap) {
    gap = (gap === undefined) ? 1 : gap;       //默认从下标为1的元素开始遍历
    let length = array.length, index, current;
    for (let i = gap; i < length; i++) {
        index = i - gap;    //待比较元素的下标
        current = array[i];    //当前元素
        console.log('待比较元素的下标',index);
        while(index >= 0 && array[index] > current) { //前置条件之一:待比较元素比当前元素大
            console.log('待比较元素',array[index],'当前元素',current,'未改变时:',array);
            array[index + gap] = array[index];    //将待比较元素后移gap位
            console.log(`待比较元素${array[index + gap]}后移${gap}位`,array,index+gap,i);
            index -= gap;                           //游标前移gap位
        }
        if(index + gap !== i){                   //避免同一个元素赋值给自身
            array[index + gap] = current;            //将当前元素插入预留空位
            console.log('交换完成:',array)
        }
    }
    return array;
}
function shellSort(array){
    let length = array.length, gap = length>>1, current, i, j;
    while(gap > 0){
        console.log('gap:',gap);
        directInsertionSort(array, gap); //按指定步长进行直接插入排序
        gap = gap>>1;
    }
    return array;
}
let arr = [2,1,32,65,78,11,43,6,34,65,32];
console.log(shellSort(arr))
