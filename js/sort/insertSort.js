/**
 * 插入排序
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

let arr = [3,2,1,4,9,6]
insertSort(arr)