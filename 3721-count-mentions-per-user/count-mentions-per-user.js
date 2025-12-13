/**
 * @param {number} numberOfUsers
 * @param {string[][]} events
 * @return {number[]}
 */
var countMentions = function(numberOfUsers, events) {
  // Min-heap helper for return events: [returnTime, userId]
  class MinHeap {
    constructor() { this.a = []; }
    _swap(i,j){ const t=this.a[i]; this.a[i]=this.a[j]; this.a[j]=t; }
    _cmp(i,j){ // compare by returnTime
      return this.a[i][0] - this.a[j][0];
    }
    push(x){
      this.a.push(x);
      let i = this.a.length - 1;
      while (i > 0){
        const p = Math.floor((i-1)/2);
        if (this._cmp(i,p) >= 0) break;
        this._swap(i,p);
        i = p;
      }
    }
    pop(){
      if (this.a.length === 0) return null;
      const res = this.a[0];
      const last = this.a.pop();
      if (this.a.length > 0){
        this.a[0] = last;
        let i = 0;
        while(true){
          const l = 2*i+1, r = 2*i+2;
          let smallest = i;
          if (l < this.a.length && this._cmp(l, smallest) < 0) smallest = l;
          if (r < this.a.length && this._cmp(r, smallest) < 0) smallest = r;
          if (smallest === i) break;
          this._swap(i, smallest);
          i = smallest;
        }
      }
      return res;
    }
    peek(){
      return this.a.length ? this.a[0] : null;
    }
    size(){ return this.a.length; }
  }

  // 1. Sort events by timestamp, and ensure OFFLINE events come before MESSAGE at same timestamp
  // events are of shape: ["MESSAGE", timestampStr, mentions_string] or ["OFFLINE", timestampStr, user_id_str]
  const parsed = events.map(ev => {
    const type = ev[0];
    const ts = Number(ev[1]);
    return { raw: ev, type, ts };
  });
  parsed.sort((A,B) => {
    if (A.ts !== B.ts) return A.ts - B.ts;
    // OFFLINE before MESSAGE
    if (A.type === B.type) return 0;
    return (A.type === "OFFLINE") ? -1 : 1;
  });

  const ans = new Array(numberOfUsers).fill(0);

  // global counters
  let allCount = 0;
  let hereCount = 0;

  // per-user bookkeeping for lazy HERE accumulation
  const lastHereSeen = new Array(numberOfUsers).fill(0); // when user last became online
  const online = new Array(numberOfUsers).fill(true);    // all start online

  // initially all users are online and lastHereSeen = 0 (hereCount starts at 0)

  // heap of return events [returnTime, userId]
  const heap = new MinHeap();

  // helper: process any return events whose time <= curT
  function processReturnsUpTo(curT) {
    while (heap.size() > 0) {
      const top = heap.peek();
      if (top[0] <= curT) {
        const [, uid] = heap.pop();
        if (!online[uid]) {
          // user comes back online now: set online true and reset lastHereSeen to current hereCount
          online[uid] = true;
          lastHereSeen[uid] = hereCount;
        }
        // if already online, ignore (duplicate return event)
      } else break;
    }
  }

  for (const item of parsed) {
    const ev = item.raw;
    const type = item.type;
    const ts = item.ts;

    // first process any scheduled returns at or before timestamp ts
    processReturnsUpTo(ts);

    if (type === "OFFLINE") {
      // ev = ["OFFLINE", timestampStr, userIdStr]
      const uid = Number(ev[2]);
      // user goes offline at ts for exactly 60 units -> will return at ts+60
      // if user is currently online, we must flush pending HERE counts to ans
      if (online[uid]) {
        // flush HEREs accumulated while they were online
        ans[uid] += (hereCount - lastHereSeen[uid]);
        online[uid] = false;
      }
      // schedule return
      heap.push([ts + 60, uid]);
    } else {
      // MESSAGE event: ["MESSAGE", timestampStr, mentions_string]
      const mentionsStr = ev[2];
      // mentions may be multi-token separated by spaces
      if (!mentionsStr || mentionsStr.length === 0) continue;
      // split by spaces (there can be multiple tokens, duplicates count)
      const tokens = mentionsStr.split(' ').filter(Boolean);
      for (const tok of tokens) {
        if (tok === "ALL") {
          allCount++;
        } else if (tok === "HERE") {
          hereCount++;
        } else if (tok.startsWith("id")) {
          const id = Number(tok.slice(2));
          if (!Number.isNaN(id) && id >= 0 && id < numberOfUsers) {
            ans[id]++; // direct mention (counts even if offline)
          }
        } // else ignore unknown tokens (problem guarantees format)
      }
    }
  }

  // after processing all events, process remaining returns (simulate time -> +infty)
  processReturnsUpTo(Number.MAX_SAFE_INTEGER);

  // flush pending HERE counts for users who are currently online
  for (let i = 0; i < numberOfUsers; i++) {
    if (online[i]) {
      ans[i] += (hereCount - lastHereSeen[i]);
    }
    // add ALL mentions to every user
    ans[i] += allCount;
  }

  return ans;
};
