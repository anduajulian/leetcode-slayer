function countCollisions(directions: string): number {
    let left = 0;
    const n = directions.length;

    while (left < n && directions[left] === 'L') {
        left++;
    }

    let right = n - 1;
    while (right >= 0 && directions[right] === 'R') {
        right--;
    }

    if (left > right) return 0;

    let collisions = 0;

    for (let i = left; i <= right; i++) {
        if (directions[i] !== 'S') {
            collisions++;
        }
    }

    return collisions;
}
