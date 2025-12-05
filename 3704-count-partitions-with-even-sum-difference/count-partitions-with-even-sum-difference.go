func countPartitions(nums []int) int {
    n := len(nums)
    if n < 2 {
        return 0
    }

    total := 0
    for _, v := range nums {
        total += v
    }

    if total%2 == 0 {
        return n - 1
    }
    return 0
}