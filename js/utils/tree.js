let input = {
    h3: {
        parent: 'h2',
        name: '副总经理(市场)'
    },
    h1: {
        parent: 'h0',
        name: '公司机构'
    },
    h7: {
        parent: 'h6',
        name: '副总经理(总务)'
    },
    h4: {
        parent: 'h3',
        name: '销售经理'
    },
    h2: {
        parent: 'h1',
        name: '总经理'
    },
    h8: {
        parent: 'h0',
        name: '财务总监'
    },
    h6: {
        parent: 'h4',
        name: '仓管总监'
    },
    h5: {
        parent: 'h4',
        name: '销售代表'
    },
    h0: {
        parent: '',
        name: 'root'
    }
};
let plain2Tree = function (obj) {
    let  res;
    for(let key in obj) {
        let parent = obj[key].parent;
        if(parent === '') {
            res = obj[key]
        } else {
            obj[parent][key] = obj[key]
        }
    }
    console.log(JSON.stringify(res));
    return res
};
// plain2Tree(input);

let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]

/**
 * 递归查找，获取children
 */
const getChildren = (data, result, pid) => {
    for (const item of data) {
        if (item.pid === pid) {
            const newItem = {...item, children: []};
            result.push(newItem);
            getChildren(data, newItem.children, item.id);
        }
    }
}

/**
 * 转换方法
 */
const arrayToTree = (data, pid) => {
    const result = [];
    getChildren(data, result, pid)
    return result;
}

/**
 * 转换树结构
 * @param items
 * @returns {[]}
 */
function arrayToTree1(items) {
    const result = [];   // 存放结果集
    const itemMap = {};  //

    // 先转成map存储
    for (const item of items) {
        itemMap[item.id] = {...item, children: []}
    }

    for (const item of items) {
        const id = item.id;
        const pid = item.pid;
        const treeItem =  itemMap[id];
        if (pid === 0) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
            }
            itemMap[pid].children.push(treeItem)
        }

    }
    return result;
}

/**
 * 转换树
 * @param items
 * @returns {[]}
 */
function arrayToTree2(items) {
    const result = [];   // 存放结果集
    const itemMap = {};  //
    for (const item of items) {
        const id = item.id;
        const pid = item.pid;

        if (!itemMap[id]) {
            itemMap[id] = {
                children: [],
            }
        }

        itemMap[id] = {
            ...item,
            children: itemMap[id]['children']
        }

        const treeItem =  itemMap[id];

        if (pid === 0) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
            }
            itemMap[pid].children.push(treeItem)
        }

    }
    return result;
}
