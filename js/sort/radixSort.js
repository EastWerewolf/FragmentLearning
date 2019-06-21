/**
 * 基数排序
 * 基数排序源于老式穿孔机, 排序器每次只能看到一个列. 它是基于元素值的每个位上的字符来排序的.
 * 对于数字而言就是分别基于个位, 十位, 百位 或千位等等数字来排序.(不明白不要紧, 我也不懂, 请接着往下读)
 * 按照优先从高位或低位来排序有两种实现方案:MSD: 由高位为基底, 先按k1排序分组, 同一组中记录, 关键码k1相等,
 * 再对各组按k2排序分成子组, 之后, 对后面的关键码继续这样的排序分组, 直到按最次位关键码kd对各子组排序后.
 * 再将各组连接起来, 便得到一个有序序列. MSD方式适用于位数多的序列.LSD: 由低位为基底, 先从kd开始排序，
 * 再对kd-1进行排序，依次重复，直到对k1排序后便得到一个有序序列. LSD方式适用于位数少的序列.
 */

function radixSort(array, max) {
    let buckets = [],
        unit = 10,
        base = 1;
    for (let i = 0; i < max; i++, base *= 10, unit *= 10) {
        for(let j = 0; j < array.length; j++) {
            let index = ~~((array[j] % unit) / base);//依次过滤出个位,十位等等数字
            if(buckets[index] == null) {
                buckets[index] = []; //初始化桶
            }
            buckets[index].push(array[j]);//往不同桶里添加数据
        }
        let pos = 0,
            value;
        for(let j = 0, length = buckets.length; j < length; j++) {
            if(buckets[j] != null) {
                while ((value = buckets[j].shift()) != null) {
                    array[pos++] = value; //将不同桶里数据挨个捞出来,为下一轮高位排序做准备,由于靠近桶底的元素排名靠前,因此从桶底先捞
                }
            }
        }
    }
    return array;
}