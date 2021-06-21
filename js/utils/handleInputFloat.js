/**
 * 限制input的输入的小数位 限制输入的为数字
 * @param num 传入的数字
 * @param obj 绑定的对象
 * @param name 绑定的Name
 * @param howMany 保留几位小数
 * @param callBack 回调函数
 */
export function handleFloat(num, obj, name, howMany, callBack) {
    // 保留小数点后三位 防止出现e和多个点的情况
    const dot = howMany || 3
    const str = num.toString()
    const newNum = str.match(
        `^[1-9][0-9]{0,2}(?:,?[0-9]{3})*(?:\\.[0-9]{1,${dot})?$`
    )
    const after = str.indexOf('.') > -1 ? str.split('.')[1] : null
    if (newNum) {
        // 正常数字
        obj[name] = newNum[0]
        callBack && callBack(newNum[0])
    } else {
        // 特殊情况
        // console.log('// 特殊情况')
        const allowHead = '0123456789'
        if (allowHead.indexOf(str[0]) === -1) {
            // console.log('// 点在开头 或者字母在开头')
            // 点在开头 或者字母在开头
            obj[name] = null
            callBack && callBack(null)
            return
        }
        if (str[0] === '0' && str[1] !== '.' && str[1] !== undefined) {
            // console.log('// 0在开头 点要紧随其后', str[1])
            // 0在开头 点要紧随其后 而且str[1]必须有值
            obj[name] = null
            callBack && callBack(null)
            return
        }
        if (!after) {
            // 点后无数字或无点
            if (str.split('.').length > 2) {
                // 多个点的情况
                obj[name] = str.split('.')[0] + '.'
                callBack && callBack(obj[name])
            } else {
                if (str.indexOf('.') > -1) {
                    // 有1个点的情况
                    obj[name] = num
                    callBack && callBack(num)
                } else {
                    // 无点但后面的输入不符合规则
                    const newVal = matchingNumber(obj, name, str, dot)
                    obj[name] = newVal
                    callBack && callBack(newVal)
                }
            }
        } else {
            // console.log('点后数字不符合规则')
            // 点后数字不符合规则 或者输入不符合规则
            const newVal = matchingNumber(obj, name, str, dot)
            obj[name] = newVal
            callBack && callBack(newVal)
        }
    }
}

/**
 * 上面函数的辅助函数
 * @param obj
 * @param name
 * @param str
 * @param dot
 */
export function matchingNumber(obj, name, str, dot) {
    let Backspace = str
    let i = str.length
    let newVal = '';
    (function loop() {
        Backspace = Backspace.substr(0, i)
        if (
            Backspace.match(`^[0-9][0-9]{0,2}(?:,?[0-9]{3})*(?:\\.[0-9]{1,${dot}})?$`)
        ) {
            obj[name] = Backspace.match(
                `^[0-9][0-9]{0,2}(?:,?[0-9]{3})*(?:\\.[0-9]{1,${dot}})?$`
            )[0]
            newVal = obj[name]
        } else {
            if (i > 0) {
                i--
                loop()
            }
        }
    })()
    return newVal
}
