/*
二叉搜索树是一种数据结构，由一组有序的链接节点组成，这些节点表示分层树结构。
每个节点通过父子关系链接到其他节点。任何给定的节点最多可以有两个孩子（左和右）。
二叉搜索树中的第一个节点是根节点，而没有任何子节点的节点是叶子节点。
二叉搜索树的组织方式是，对于任何给定节点，
其左子树中的所有节点的键都小于自身，而其右子树中的所有节点的键都大于自身。
二叉搜索树数据结构中的每个节点都必须具有以下属性：
key: 节点的key
value: 节点的值
parent: 节点的父节点（null如果没有）
left: 指向节点左子节点的指针（null如果没有）
right: 指向节点右孩子的指针（null如果没有）
二叉搜索树数据结构的主要操作是：

insert: 插入一个节点作为给定父节点的子节点
remove: 从二叉搜索树中删除一个节点及其子节点
has: 检查给定节点是否存在
find: 检索给定节点
preOrderTraversal: 通过递归遍历每个节点及其子节点来遍历二叉搜索树
postOrderTraversal: 通过递归遍历每个节点的子节点后跟节点来遍历二叉搜索树
inOrderTraversal：通过递归遍历每个节点的左孩子，然后是节点，然后是右孩子来遍历二叉搜索树
 */

class BinarySearchTreeNode {
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    get isLeaf() {
        return this.left === null && this.right === null;
    }

    get hasChildren() {
        return !this.isLeaf;
    }
}

class BinarySearchTree {
    constructor(key, value = key) {
        this.root = new BinarySearchTreeNode(key, value);
    }

    *inOrderTraversal(node = this.root) {
        if (node.left) yield* this.inOrderTraversal(node.left);
        yield node;
        if (node.right) yield* this.inOrderTraversal(node.right);
    }

    *postOrderTraversal(node = this.root) {
        if (node.left) yield* this.postOrderTraversal(node.left);
        if (node.right) yield* this.postOrderTraversal(node.right);
        yield node;
    }

    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.left) yield* this.preOrderTraversal(node.left);
        if (node.right) yield* this.preOrderTraversal(node.right);
    }

    insert(key, value = key) {
        let node = this.root;
        while (true) {
            if (node.key === key) return false;
            if (node.key > key) {
                if (node.left !== null) node = node.left;
                else {
                    node.left = new BinarySearchTreeNode(key, value, node);
                    return true;
                }
            } else if (node.key < key) {
                if (node.right !== null) node = node.right;
                else {
                    node.right = new BinarySearchTreeNode(key, value, node);
                    return true;
                }
            }
        }
    }

    has(key) {
        for (let node of this.postOrderTraversal()) {
            if (node.key === key) return true;
        }
        return false;
    }

    find(key) {
        for (let node of this.postOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }

    remove(key) {
        const node = this.find(key);
        if (!node) return false;
        const isRoot = node.parent === null;
        const isLeftChild = !isRoot ? node.parent.left === node : false;
        const hasBothChildren = node.left !== null && node.right !== null;

        if (node.isLeaf) {
            if (!isRoot) {
                if (isLeftChild) node.parent.left = null;
                else node.parent.right = null;
            } else {
                this.root = null;
            }
            return true;
        } else if (!hasBothChildren) {
            const child = node.left !== null ? node.left : node.right;
            if (!isRoot) {
                if (isLeftChild) node.parent.left = child;
                else node.parent.right = child;
            } else {
                this.root = child;
            }
            child.parent = node.parent;
            return true;
        } else {
            const rightmostLeft = [...this.inOrderTraversal(node.left)].slice(-1)[0];
            rightmostLeft.parent = node.parent;
            if (!isRoot) {
                if (isLeftChild) node.parent.left = rightmostLeft;
                else node.parent.right = rightmostLeft;
            } else {
                this.root = rightmostLeft;
            }
            rightmostLeft.right = node.right;
            node.right.parent = rightmostLeft;
            return true;
        }
    }
}

/**
 * 创建class了BinarySearchTreeNode一个constructor初始化适当key，value，parent，left和right属性。
 定义一个isLeafgetter，Array.prototype.length用于检查left和right是否为空。
 定义一个hasChildrengetter，也就是getter的反面isLeaf。
 使用初始化二叉搜索树的aclass来创建 a 。BinarySearchTreeconstructorroot
 定义一个preOrderTraversal()生成器方法，它以预序遍历二叉搜索树，使用yield*语法递归地将遍历委托给自身。
 定义一个postOrderTraversal()以后序遍历二叉搜索树的生成器方法，使用yield*语法递归地将遍历委托给自身。
 定义一个inOrderTraversal()按顺序遍历二叉搜索树的生成器方法，使用yield*语法将遍历委托给自身。
 定义一个insert()方法，该方法使用while循环搜索二叉搜索树，遍历每个节点的子节点，直到找到合适的位置以插入新的子节点BinarySearchTreeNode作为left或right子节点，具体取决于给定的key。
 定义一个has()方法，该preOrderTraversal()方法使用该方法检查给定节点是否存在于二叉搜索树中。
 定义一个find()方法，该preOrderTraversal()方法使用该方法检索二叉搜索树中的给定节点。
 定义一个remove()方法，BinarySearchTreeNode从二叉搜索树中删除给定，删除任何链接并更新二叉搜索树以保持其顺序。
 */

const tree = new BinarySearchTree(30);

tree.insert(10);
tree.insert(15);
tree.insert(12);
tree.insert(40);
tree.insert(35);
tree.insert(50);

[...tree.preOrderTraversal()].map(x => x.value);
// [30, 10, 15, 12, 40, 35, 50]

[...tree.inOrderTraversal()].map(x => x.value);
// [10, 12, 15, 30, 35, 40, 50]

[...tree.postOrderTraversal()].map(x => x.value);
// [12, 15, 10, 35, 50, 40, 30]

tree.root.value;                // 30
tree.root.hasChildren;          // true

tree.find(12).isLeaf;           // true
tree.find(40).isLeaf;           // false
tree.find(50).parent.value;     // 40
tree.find(15).left.value;       // 12
tree.find(12).right;            // null

tree.remove(12);

[...tree.preOrderTraversal()].map(x => x.value);
// [30, 10, 15, 40, 35, 50]

tree.remove(10);

[...tree.preOrderTraversal()].map(v => ({
    key: v.key,
    parent: v.parent ? v.parent.key : null,
})); // [30, 15, 40, 35, 50]

tree.remove(40);

[...tree.preOrderTraversal()].map(x => x.value);
// [30, 15, 40, 35, 50]

tree.remove(30);

[...tree.preOrderTraversal()].map(x => x.value);
// [15, 35, 50]
