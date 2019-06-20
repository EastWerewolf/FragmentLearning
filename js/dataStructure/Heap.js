/*
* 堆（Heap），一类特殊的数据结构的统称，通常是一个可以被看做一棵树的数组对象。
* 堆的实现通过构造二叉堆（binary heap），实为二叉树的一种，由于其应用的普遍性，当不加限定时，均指该数据结构的这种实现。
* 堆是完全二叉树
 */
// 计算父节点的下标
let getParentPos = function(idx){
    return Math.floor((idx-1) / 2);
}
// 计算左子节点的下标
let getLeftChildPos = function(idx){
    return 2*idx + 1;
};
// 计算右子节点的下标
let getRightChildPos = function(idx){
    return 2 * (idx+1);
};