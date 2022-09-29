// 1. 检查日期是否有效
// 该方法用于检测给出的日期是否有效：
const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

isDateValid("December 17, 1995 03:24:00");  // true