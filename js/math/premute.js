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

function permute1(nums){
    if (nums.length === 1) {
        return nums
    }
    let res = []
    for (let i = 0; i < nums.length; i++){
        res = res.concat(
            permute1([...nums.slice(0,i),...nums.slice(i+1)]).map(v => {
                const sub = typeof v === "number" ? [v] : v
                return [nums[i],...sub]
            })
        )
    }
    return res
}
permute1([1,2,3,4])

// 给定一个链表: 1->2->3->4->5, 和 k = 2.
//
// 返回链表 4->5.
const getKthFromEnd = (head, k) => {
    let fast, slow;
    fast = slow = head;
    while (k--) {
        // 快指针先走k步
        fast = fast.next;
    }
    while (fast) {
        // 再一起走，直到快指针走到头
        fast = fast.next;
        slow = slow.next;
    }
    // 此时的慢指针指的就是倒数第k个
    return slow;
};

