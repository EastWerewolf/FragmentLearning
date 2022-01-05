
// 选择需要观察变动的节点
const targetNode = document.body

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    console.log(observer,'observer')
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            const eleList = [...document.querySelectorAll('.el-overlay')]
            eleList.forEach(ele=>{
                if(ele.style.display === 'none'){
                    const eleBox = ele.querySelector('.el-dialog')
                    eleBox.style.removeProperty('position')
                    eleBox.style.removeProperty('left')
                    eleBox.style.removeProperty('top')
                } else {
                    dialogDrag(ele,{})
                }
            })
        }
    }
};
function debounce(fn, time) {
    let timer = null

    return (...args) => {
        // 重新执行并停止上次执行（若上次还未执行则会被清除）
        if(timer){
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            timer = null
            fn.apply(this, args)
        }, time)
    }
}
const newCallBack = debounce(callback,500)
// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(newCallBack);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
// observer.disconnect();

function dialogDrag (el, binding) {
    if (binding.value) el = document.body
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cursor = 'move'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

    dialogHeaderEl.onmousedown = (e) => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop

        // 获取到的值带px 正则匹配替换
        let styL, styT

        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (sty.left.includes('%')) {
            styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
            styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
        } else {
            styL = +sty.left.replace(/\px/g, '')
            styT = +sty.top.replace(/\px/g, '')
        }

        document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离
            const l = e.clientX - disX
            const t = e.clientY - disY

            // 移动当前元素
            dragDom.style.left = `${l + styL}px`
            dragDom.style.top = `${t + styT}px`

            // 将此时的位置传出去
            // binding.value({x:e.pageX,y:e.pageY})
        }

        document.onmouseup = function (e) {
            document.onmousemove = null
            document.onmouseup = null
        }
    }
}

