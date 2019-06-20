/**
 * 直接插入排序
 * @param list
 * @returns {Array}
 */
function insertSort(list = []) {
    for(let i = 1 , len = list.length; i < len; i++){
        let j = i - 1;
        let temp = list[ i ];
        console.log('for循环开始',list,temp,'temp');
        while (j >= 0 && list[ j ] > temp){
            console.log('进入',list,temp);
            list[j + 1] = list[ j ];
            j = j - 1;
            console.log('修改后',list)
        }
        list[j + 1] = temp;
        console.log(`list[${j+1}]=${temp}`,'离开while循环时j为',j);
        console.log('修改完成',list,temp,'temp')

    }
    return list;
}

/**
 * 折半插入排序
 * 折半插入排序是直接插入排序的升级版. 鉴于插入排序第一部分为已排好序的数组,
 * 我们不必按顺序依次寻找插入点, 只需比较它们的中间值与待插入元素的大小即可
 * x>>1 是位运算中的右移运算, 表示右移一位, 等同于x除以2再取整, 即 x>>1 == Math.floor(x/2)
 * @param array
 * @returns {*}
 */
function binaryInsertionSort(array){
    let current, i, j, low, high, m;
    for(i = 1; i < array.length; i++){
        low = 0;
        high = i - 1;
        current = array[i];
        while(low <= high){            //步骤1&2:折半查找
            m = (low + high)>>1;
            if(array[i] >= array[m]){//值相同时, 切换到高半区，保证稳定性
                low = m + 1;        //插入点在高半区
            }else{
                high = m - 1;        //插入点在低半区
            }
        }
        for(j = i; j > low; j--){     //步骤3:插入位置之后的元素全部后移一位
            array[j] = array[j-1];
        }
        array[low] = current;         //步骤4:插入该元素
    }
    return array;
}