let obj1 = [{aName:"aaa"},{aName:"bbb"},{aName:"ccc"},{aName:"ddd"},{aName:"eee"}]
let obj2 = [{aName:"bbb"},{aName:"ddd"},{aName:"eee"}]
//
// 实现这两个对象的交集，如果形成交集，则添加对象属性active为true，否则添加属性为false
// 最终形成：
// obj3 = [{aName:"aaa",active:"false"},{aName:"bbb",active:"true"},{aName:"ccc",active:"false"},{aName:"ddd",active:"true"},{aName:"eee",active:"true"}]
const obj3 = [...obj1,...obj2].map(i => ({aName: i.aName, active: false}))
const objSet = {}
for (let i = obj3.length -1; i >= 0; i--) {
    const {aName} = obj3[i]
    if (!objSet[aName]) {
        objSet[aName] = true
    } else {
        // 删除相同的元素
        obj3.splice(i,1)
        // 将另一个相同元素active设为true
        obj3.forEach(j => {
            if (j.aName === aName) {
                j.active = true
            }
        })
    }
}
console.log(obj3)
