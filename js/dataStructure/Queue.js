/**队列
 * [Queue]
 * @param {[number]} size [队列大小]
 */
function Queue(size) {
    let list = [];

    //向队列中添加数据
    this.push = function(data) {
        if (data==null) {
            return false;
        }
        //如果传递了size参数就设置了队列的大小
        if (size != null && !isNaN(size)) {
            if (list.length === size) {
                this.pop();
            }
        }
        list.unshift(data);
        return true;
    };
    //返回队列的大小
    this.size = function() {
        return list.length;
    };
    //从队列中取出数据
    this.pop = function() {
        return list.pop();
    };
    //返回队列的内容
    this.queue = function() {
        return list;
    };
    //返回数组的平均值
    this.average = function () {
        return list.sum()/list.length;
    };
    Array.prototype.sum = function (){
        return this.reduce(function (preValue, curValue) {
            return preValue + curValue;
        });
    }
}

let queue = new Queue(3);

for (let i = 1; i <= 19; i++) {
    queue.push(i);
}
console.log(queue.queue());
console.log(queue.size());
console.log(queue.average());
console.log(queue.queue().sum());