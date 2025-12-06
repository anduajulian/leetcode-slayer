/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countPartitions = function(nums, k) {
  const MOD = 1_000_000_007;
  const n = nums.length;

  const dp = new Array(n + 1).fill(0);
  const pref = new Array(n + 1).fill(0);
  dp[0] = 1;
  pref[0] = 1;

  const maxDeque = [];
  let maxHead = 0;

  const minDeque = [];
  let minHead = 0;

  let left = 0;

  for (let right = 0; right < n; right++) {
    while (maxHead < maxDeque.length && nums[maxDeque[maxDeque.length - 1]] <= nums[right]) {
      maxDeque.pop();
    }
    maxDeque.push(right);

    while (minHead < minDeque.length && nums[minDeque[minDeque.length - 1]] >= nums[right]) {
      minDeque.pop();
    }
    minDeque.push(right);

    while ((nums[maxDeque[maxHead]] - nums[minDeque[minHead]]) > k) {
      if (maxDeque[maxHead] === left) maxHead++;
      if (minDeque[minHead] === left) minHead++;
      left++;
    }

    const sumRange = (pref[right] - (left > 0 ? pref[left - 1] : 0)) % MOD;
    dp[right + 1] = (sumRange + MOD) % MOD;
    pref[right + 1] = (pref[right] + dp[right + 1]) % MOD;
  }

  return dp[n];
};
