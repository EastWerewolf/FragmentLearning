/**
 * 输出arr最大值最小值
 * @param arr
 * @returns {{min: number, max: number}}
 */
function maxAndMin(arr){
    return {
        max:Math.max.apply(null,arr),
        min:Math.min.apply(null,arr)
    }
}

/**
 * 判断数组是否相同
 * @param array1
 * @param array2
 * @returns {boolean}
 */
export function scalarArrayEquals(array1, array2) {
    return array1.length === array2.length && array1.every(function(v, i) { return v ===array2[i]})
}

/**
 * const castArray = (value) => (Array.isArray(value) ? value : [value]);
 * @param value
 * @returns {*}
 */
const castArray = (value) => (Array.isArray(value) ? value : [value]);
/**
 * Check if an array is empty
 * @param arr
 * @returns {boolean}
 */
const isEmpty = (arr) => !Array.isArray(arr) || arr.length === 0;
/**
 * Compare two arrays regardless of order
 * @param a
 * @param b
 * @returns {boolean}
 */
// `a` and `b` are arrays
const isEqual = (a, b) => JSON.stringify(a.sort()) === JSON.stringify(b.sort());
