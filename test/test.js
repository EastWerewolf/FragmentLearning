// let obj1 = [{aName:"aaa"},{aName:"bbb"},{aName:"ccc"},{aName:"ddd"},{aName:"eee"}]
// let obj2 = [{aName:"bbb"},{aName:"ddd"},{aName:"eee"}]
// //
// // 实现这两个对象的交集，如果形成交集，则添加对象属性active为true，否则添加属性为false
// // 最终形成：
// // obj3 = [{aName:"aaa",active:"false"},{aName:"bbb",active:"true"},{aName:"ccc",active:"false"},{aName:"ddd",active:"true"},{aName:"eee",active:"true"}]
// const obj3 = [...obj1,...obj2].map(i => ({aName: i.aName, active: false}))
// const objSet = {}
// for (let i = obj3.length -1; i >= 0; i--) {
//     const {aName} = obj3[i]
//     if (!objSet[aName]) {
//         objSet[aName] = true
//     } else {
//         // 删除相同的元素
//         obj3.splice(i,1)
//         // 将另一个相同元素active设为true
//         obj3.forEach(j => {
//             if (j.aName === aName) {
//                 j.active = true
//             }
//         })
//     }
// }
// console.log(obj3)


option = {
    legend: {},
    tooltip: {},
    xAxis: [
      { type: 'category', 
      gridIndex: 0,
      data: ['第一阶段', '第二阶段', '第三阶段', '第四阶段', '第五阶段'] 
        
      }
    ],
    yAxis: [{ gridIndex: 0 }],
    series: [
      { 
        type: 'bar', 
        name:'part1',
        xAxisIndex: 0, 
        yAxisIndex: 0,
        data:[
          {name:'a',value:10,itemStyle: {
              color: '#a90000'
            }},
          {name:'b',value:5},
          {name:'a',value:1},
          {name:'a',value:1}
          ],
        tooltip: {
            trigger: 'item',
            formatter:function(params ){
              console.log(params,12312)
              return `${params.marker}${params.name}：<br />
              ${params.marker}${params.value}`
            }
        }
      },
      { 
        type: 'bar',
        xAxisIndex: 0, 
        yAxisIndex: 0,
        data:[
          {name:'a',value:1},
          {name:'a',value:1},
          {name:'a',value:1},
          {name:'a',value:5}
        ],
        tooltip: {
            trigger: 'item',
            formatter:function(params ){
              return `${params.name}：<br />${params.value}`
            }
        } },
      { type: 'bar', xAxisIndex: 0, yAxisIndex: 0 },
      { type: 'bar', xAxisIndex: 0, yAxisIndex: 0}
    ]
  };
