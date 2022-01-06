/*
二叉树数据结构中的每个节点都必须具有以下属性：

key: 节点的key
value: 节点的值
parent: 节点的父节点（null如果没有）
left: 指向节点左子节点的指针（null如果没有）
right: 指向节点右孩子的指针（null如果没有）
二叉树数据结构的主要操作有：

insert: 插入一个节点作为给定父节点的子节点
remove: 从二叉树中删除一个节点及其子节点
find: 检索给定节点
preOrderTraversal: 通过递归遍历每个节点及其子节点来遍历二叉树
postOrderTraversal: 通过递归遍历每个节点的子节点后跟节点来遍历二叉树
inOrderTraversal: 通过递归遍历每个节点的左孩子，然后是节点，然后是右孩子来遍历二叉树
 */
class BinaryTreeNode {
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

class BinaryTree {
    constructor(key, value = key) {
        this.root = new BinaryTreeNode(key, value);
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

    insert(
        parentNodeKey,
        key,
        value = key,
        { left, right } = { left: true, right: true }
    ) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === parentNodeKey) {
                const canInsertLeft = left && node.left === null;
                const canInsertRight = right && node.right === null;
                if (!canInsertLeft && !canInsertRight) return false;
                if (canInsertLeft) {
                    node.left = new BinaryTreeNode(key, value, node);
                    return true;
                }
                if (canInsertRight) {
                    node.right = new BinaryTreeNode(key, value, node);
                    return true;
                }
            }
        }
        return false;
    }

    remove(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.left.key === key) {
                node.left = null;
                return true;
            }
            if (node.right.key === key) {
                node.right = null;
                return true;
            }
        }
        return false;
    }

    find(key) {
        for (let node of this.preOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }
}

/*
创建class了BinaryTreeNode一个constructor初始化适当key，value，parent，left和right属性。
定义一个isLeafgetter，Array.prototype.length用于检查left和right是否为空。
定义一个hasChildrengetter，也就是getter的反面isLeaf。
使用初始化二叉树的aclass来创建 a 。BinaryTreeconstructorroot
定义一个preOrderTraversal()预先遍历二叉树的生成器方法，使用yield*语法递归地将遍历委托给自身。
定义一个postOrderTraversal()以后序遍历二叉树的生成器方法，使用yield*语法递归地将遍历委托给自身。
定义一个inOrderTraversal()按顺序遍历二叉树的生成器方法，使用yield*语法递归地将遍历委托给自身。
定义一个insert()方法，该preOrderTraversal()方法使用该方法查找给定的父节点并根据传递的选项对象插入一个新的子节点BinaryTreeNode作为left或right子节点。
定义一个remove()方法，该preOrderTraversal()方法使用该方法并从二叉树中Array.prototype.filter()删除 a BinaryTreeNode。
定义一个find()方法，该preOrderTraversal()方法使用该方法检索二叉树中的给定节点。
 */
const tree = new BinaryTree(1, 'AB');

tree.insert(1, 11, 'AC');
tree.insert(1, 12, 'BC');
tree.insert(12, 121, 'BG', { right: true });

[...tree.preOrderTraversal()].map(x => x.value);
// ['AB', 'AC', 'BC', 'BCG']

[...tree.inOrderTraversal()].map(x => x.value);
// ['AC', 'AB', 'BC', 'BG']

console.log(tree.root.value);                // 'AB'
tree.root.hasChildren;          // true

tree.find(12).isLeaf;           // false
tree.find(121).isLeaf;          // true
tree.find(121).parent.value;    // 'BC'
tree.find(12).left;             // null
tree.find(12).right.value;      // 'BG'

tree.remove(12);

[...tree.postOrderTraversal()].map(x => x.value);
// ['AC', 'AB']
