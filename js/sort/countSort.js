/**
 * 计数排序
 * 算法的基本思想:
 * 计数排序利用了一个特性, 对于数组的某个元素, 一旦知道了有多少个其它元素比它小(假设为m个), 那么就可以确定出该元素的正确位置(第m+1位)
 * 获取待排序数组A的最大值, 最小值
 * 算法步骤
 * 将最大值与最小值的差值+1作为长度新建计数数组B，并将相同元素的数量作为值存入计数数组.
 * 对计数数组B累加计数, 存储不同值的初始下标.
 * 从原数组A挨个取值, 赋值给一个新的数组C相应的下标, 最终返回数组C.
 */

function countSort(array, keyName){
    let length = array.length,
        output = new Array(length),
        max,
        min,
        simpleArray = keyName ? array.map(function(v){
            return v[keyName];
        }) : array; // 如果keyName是存在的，那么就创建一个只有keyValue的简单数组

    // 获取最大最小值
    max = min = simpleArray[0];
    simpleArray.forEach(function(v){
        v > max && (max = v);
        v < min && (min = v);
    });
    // 获取计数数组的长度
    let k = max - min + 1;
    // 新建并初始化计数数组
    let countArray = new Array(k);
    simpleArray.forEach(function(v){
        countArray[v - min]= (countArray[v - min] || 0) + 1;
    });
    // 累加计数，存储不同值的初始下标
    countArray.reduce(function(prev, current, i, arr){
        arr[i] = prev;
        return prev + current;
    }, 0);
    // 从原数组挨个取值(因取的是原数组的相应值，只能通过遍历原数组来实现)
    simpleArray.forEach(function(v, i){
        let j = countArray[v - min]++;
        output[j] = array[i];
    });
    return output;
}