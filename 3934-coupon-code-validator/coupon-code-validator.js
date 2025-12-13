/**
 * @param {string[]} code
 * @param {string[]} businessLine
 * @param {boolean[]} isActive
 * @return {string[]}
 */
function validateCoupons(code, businessLine, isActive) {
  const priority = new Map([
    ["electronics", 0],
    ["grocery", 1],
    ["pharmacy", 2],
    ["restaurant", 3],
  ]);

  const valid = [];

  for (let i = 0; i < code.length; i++) {
    if (!isActive[i]) continue;
    if (!priority.has(businessLine[i])) continue;
    if (!code[i] || !/^[A-Za-z0-9_]+$/.test(code[i])) continue;

    valid.push({
      p: priority.get(businessLine[i]),
      c: code[i]
    });
  }

  valid.sort((a, b) => {
    if (a.p !== b.p) return a.p - b.p;
    // ⚠️ lexicographical comparison (NOT localeCompare)
    if (a.c < b.c) return -1;
    if (a.c > b.c) return 1;
    return 0;
  });

  return valid.map(v => v.c);
}
