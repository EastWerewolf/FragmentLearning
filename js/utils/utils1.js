// 1. 检查日期是否有效
// 该方法用于检测给出的日期是否有效：
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

isDateValid("December 17, 1995 03:24:00");  // true


// 2. 计算两个日期之间的间隔
// 该方法用于计算两个日期之间的间隔时间：
// const dayDif = (date1, date2) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)
    
// dayDif(new Date("2021-11-3"), new Date("2022-2-1"))  // 90