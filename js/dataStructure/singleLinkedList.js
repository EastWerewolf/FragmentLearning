/**
 * 单向链表
 * @param element
 * @constructor
 */
//Node类包含两个属性，element用来保存节点上的数据，next用来保存指向下一个节点的链接。我们使用一个构造函数来创建节点，改构造函数设置了这两个属性的值
function Node(element){
    this.element = element;
    this.next = null;
}
//LinkedList类提供了对链表进行操作的方法，该类的功能包含插入节点，在链表中查找给定的节点。该类也有一个构造函数，链表只有一个属性，那就是使用一个node对象来保存该链表的头结点
function LinkedList(){
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.findPrev = findPrev;
    this.display = display;
}
//查找节点
function find(item){
    let currNode = this.head;
    while (currNode.element !== item){
        currNode = currNode.next;
    }
    return currNode;
}
//插入节点
function insert(newElement, item){
    let newNode = new Node(newElement);
    let current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
}
///查找前一个节点
function findPrev( item ) {
    let currNode = this.head;
    while ( !( currNode.next === null) && ( currNode.next.element !== item )){
        currNode = currNode.next;
    }
    return currNode;
}
//删除节点 将节点的前一个的next指向当前的next
function remove(item){
    let prevNode = this.findPrev( item );
    if( !( prevNode.next === null ) ){
        prevNode.next = prevNode.next.next;
    }
}
//打印节点
function display(){
    let currNode = this.head;
    while (!(currNode.next == null)){
        document.write(currNode.next.element + '&nbsp;');
        currNode = currNode.next;
    }
}
let cities = new LinkedList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Alma", "Russellville");
// cities.display();
cities.remove('Russellville')
console.log(cities.head)