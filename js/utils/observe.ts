const targetNode = document.body

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true }

// 当观察到变动时执行的回调函数
const callback = function (mutationsList:any[]) {
    // console.log(observer, 'observer')
    // Use traditional 'for loops' for IE 11
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            const eleList:any[] = [...document.querySelectorAll('.n-date-panel-month__month-year')]
            eleList.forEach(ele => {
                const [click,warper] = [...ele.children]
                if(warper){
                  const [target] = [...warper.children]
                  target.onmouseleave = function () {
                    click.click()
                  }
                }
            })
        }
    }
}

function debounce (fn:(args:any)=>void, time:number) {
    let timer:any = null
    
    return (...args:any) => {
        // 重新执行并停止上次执行（若上次还未执行则会被清除）
        if (timer) {
            clearTimeout(timer)
        }
        
        timer = setTimeout(() => {
            timer = null
            fn.apply(null, args)
        }, time)
    }
}

const newCallBack = debounce(callback, 200)
// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(newCallBack)

// 以上述配置开始观察目标节点
observer.observe(targetNode, config)

export {}    