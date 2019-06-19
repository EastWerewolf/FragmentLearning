/**
 * 双向链表
 * @param element
 * @constructor
 */
//节点类
function Node(element) {
    this.element = element;   //当前节点的元素
    this.next = null;         //下一个节点链接
    this.previous = null;     //上一个节点链接
}
//链表类
function LinkedList () {
    this.head = new Node( 'head' );
    this.find = find;
    this.findLast = findLast;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
    this.displayReverse = displayReverse;
}
//插入节点
function insert ( newElement , item ) {
    let newNode = new Node( newElement );
    let currNode = this.find( item );
    newNode.next = currNode.next;
    newNode.previous = currNode;
    currNode.next = newNode;
}
//删除节点
function remove ( item ) {
    let currNode = this.find ( item );
    if( currNode.next !== null ){
        currNode.previous.next = currNode.next;
        currNode.next.previous = currNode.previous;
        currNode.next = null;
        currNode.previous = null;
    }else{
        currNode.previous.next = null
    }
}
//查找元素
function find ( item ) {
    let currNode = this.head;
    while ( currNode.element !== item ){
        currNode = currNode.next;
    }
    return currNode;
}
//查找链表中的最后一个元素
function findLast () {
    let currNode = this.head;
    while ( !( currNode.next == null )){
        currNode = currNode.next;
    }
    return currNode;
}
//显示链表元素
function display () {
    let currNode = this.head;
    while ( currNode.next !== null){
        console.debug( currNode.next.element );
        currNode = currNode.next;
    }
}
//反向显示链表元素
function displayReverse () {
    let currNode = this.findLast();
    while (currNode.previous !== null ){
        console.log( currNode.element );
        currNode = currNode.previous;
    }
}
const fruits = new LinkedList();

fruits.insert('Apple' , 'head');
fruits.insert('Banana' , 'Apple');
fruits.insert('Pear' , 'Banana');
fruits.insert('Grape' , 'Pear');

console.log( fruits.display() );
console.log( fruits.displayReverse() );