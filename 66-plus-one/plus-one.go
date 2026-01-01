func plusOne(digits []int) []int {
    n := len(digits)
    
    // tambah 1 dari belakang
    for i := n-1; i >= 0; i-- {
        digits[i]++
        if digits[i] < 10 {
            return digits
        }
        // jika jadi 10, berarti bawa ke digit kiri
        digits[i] = 0
    }
    
    // jika semua digit = 9 → jadi semua 0 di atas.
    // buat array baru dengan leading 1
    result := make([]int, n+1)
    result[0] = 1
    return result
}
