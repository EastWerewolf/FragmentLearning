/*
題目描述 给定一个没有重复数字的序列 返回其所有可能的全排列
示例:
输入 [1,2,3]
输出 [
[1,2,3]
[1,3,2],
[2,1,3],
[2,3,1],
[3,1,2],
[3,2,1]]
 */
/**
 *
 * @param nums
 * @returns {[]}
 */
const permute = (nums) => {
    const len = nums.length
    const curr = []
    const res = []
    const visited = {}
    function dfs(nth){
        if (nth === len) {
            res.push(curr.slice())
            return
        }
        for (let i = 0; i < len; i++){
            if (!visited[nums[i]]) {
                visited[nums[i]] = 1
                curr.push(nums[i])
                dfs(nth+1)
                curr.pop()
                visited[nums[i]] = 0
            }
        }
    }
    dfs(0)
    return res
}
