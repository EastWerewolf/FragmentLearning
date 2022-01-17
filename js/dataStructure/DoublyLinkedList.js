/*
双向链表是表示元素集合的线性数据结构，其中每个元素都指向下一个和前一个。双向链表中的第一个元素是头部，最后一个元素是尾部。
双向链表数据结构的每个元素必须具有以下属性：

value: 元素的值
next：指向链表中下一个元素的指针（null如果没有）
previous：指向链表中前一个元素的指针（null如果没有）
双向链表数据结构的主要属性是：

size：双向链表中的元素个数
head: 双向链表中的第一个元素
tail：双向链表中的最后一个元素
双向链表数据结构的主要操作有：

insertAt: 在特定索引处插入一个元素
removeAt：删除特定索引处的元素
getAt: 检索特定索引处的元素
clear: 清空双向链表
reverse: 颠倒杜比链表中元素的顺序
 */

class DoublyLinkedList {
    constructor() {
        this.nodes = [];
    }

    get size() {
        return this.nodes.length;
    }

    get head() {
        return this.size ? this.nodes[0] : null;
    }

    get tail() {
        return this.size ? this.nodes[this.size - 1] : null;
    }

    insertAt(index, value) {
        const previousNode = this.nodes[index - 1] || null;
        const nextNode = this.nodes[index] || null;
        const node = { value, next: nextNode, previous: previousNode };

        if (previousNode) previousNode.next = node;
        if (nextNode) nextNode.previous = node;
        this.nodes.splice(index, 0, node);
    }

    insertFirst(value) {
        this.insertAt(0, value);
    }

    insertLast(value) {
        this.insertAt(this.size, value);
    }

    getAt(index) {
        return this.nodes[index];
    }

    removeAt(index) {
        const previousNode = this.nodes[index - 1] || null;
        const nextNode = this.nodes[index + 1] || null;

        if (previousNode) previousNode.next = nextNode;
        if (nextNode) nextNode.previous = previousNode;

        return this.nodes.splice(index, 1);
    }

    clear() {
        this.nodes = [];
    }

    reverse() {
        this.nodes = this.nodes.reduce((acc, { value }) => {
            const nextNode = acc[0] || null;
            const node = { value, next: nextNode, previous: null };
            if (nextNode) nextNode.previous = node;
            return [node, ...acc];
        }, []);
    }

    *[Symbol.iterator]() {
        yield* this.nodes;
    }
}

/*
class用 a创建一个为每个实例constructor初始化一个空数组的 a。nodes
定义一个sizegetter，它返回用于返回数组Array.prototype.length中元素的数量。nodes
定义一个headgetter，它返回nodes数组的第一个元素或者null如果为空。
定义一个tailgetter，它返回nodes数组的最后一个元素或者null如果为空。
定义一个insertAt()方法，用于Array.prototype.splice()在nodes数组中添加一个新对象，分别更新前一个元素和下一个元素的键next和previous键。
定义两个便捷方法，分别insertFirst()使用insertLast()该insertAt()方法在数组的开头或结尾插入一个新元素nodes。
定义一个getAt()方法，该方法检索给定的元素index。
定义一个removeAt()方法，用于Array.prototype.splice()删除nodes数组中的一个对象，分别更新前一个元素和下一个元素的键next和previous键。
定义一个clear()清空nodes数组的方法。
定义一个reverse()方法，它使用Array.prototype.reduce()扩展运算符 ( ...) 来反转nodes数组的顺序，适当地更新每个元素的next和previous键。
为 定义一个生成器方法，该方法使用语法Symbol.iterator委托给nodes数组的迭代器。yield*
 */

const list = new DoublyLinkedList();

list.insertFirst(1);
list.insertFirst(2);
list.insertFirst(3);
list.insertLast(4);
list.insertAt(3, 5);

list.size;                      // 5
list.head.value;                // 3
list.head.next.value;           // 2
list.tail.value;                // 4
list.tail.previous.value;       // 5
[...list.map(e => e.value)];    // [3, 2, 1, 5, 4]

list.removeAt(1);               // 2
list.getAt(1).value;            // 1
list.head.next.value;           // 1
[...list.map(e => e.value)];    // [3, 1, 5, 4]

list.reverse();
[...list.map(e => e.value)];    // [4, 5, 1, 3]

list.clear();
list.size;                      // 0
