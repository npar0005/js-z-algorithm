const zAlgorithm = (str) => {
  const n = str.length;
  const z = [n];

  // z-box boundaries are [l, r)
  let l = 0; // inclusive
  let r = 0; // exclusive

  for(let k = 1; k < n; k++) { // we've already computed z[0], so we can go ahead with z[1]
    z[k] = 0; // this value is updated below
    // Case 1 - explicitly compute z[k]
    if(k > r) { // we're looking at a char outside of a z-box
      let i = 0;
      while(str[i] === str[k + i])
        i++;

      z[k] = i;
      if(z[k] > 0) {
        l = k;
        r = l + z[k];
      }
    } else { 
      // Case 2: We're inside of a z-box
      const kP = k - l;
      const beta = r - k; // length from k to r (+ in l----k++++r)
      if(z[kP] < beta) {
        // Case 2a, the prefix match at z[kP] is less tha the remaining z-box length from k
        // if this is the case, then it is safe for us to say that z[k] = z[kP]
        z[k] = z[kP];
      } else {
        // Case 2b, z[kP] extends the remaining beta box, thus we have explicit matches to perform
        // after r. We know everythign from k to r matches so `z[k]` will be at least `beta`, but we must
        // check if there are characters after `r` that match
        let q = 0;
        while(str[beta + q] === str[k + beta + q])
          q++;

        z[k] = beta + q;
        l = k;
        r = l + (beta + q);
      }
    }
  }
  return z;
}


console.log(JSON.stringify(zAlgorithm("banana")) === JSON.stringify([6, 0, 0, 0, 0, 0]));
// Expected output: true

console.log(JSON.stringify(zAlgorithm("abcacabcab")) === JSON.stringify([10, 0, 0, 1, 0, 4, 0, 0, 2, 0]));
// Expected output: true

console.log(JSON.stringify(zAlgorithm("abcabdabcabdabx")) === JSON.stringify([15, 0, 0, 2, 0, 0, 8, 0, 0, 2, 0, 0, 2, 0, 0]));
// Expected output: true

console.log(JSON.stringify(zAlgorithm("aabcaabxaaaz")) === JSON.stringify([12, 1, 0, 0, 3, 1, 0, 0, 2, 2, 1, 0]));
// Expected output: true


console.log(JSON.stringify(zAlgorithm("abcdefghijklmnopqrstuvwxyz")) === JSON.stringify([26, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
// Expected output: true

console.log(JSON.stringify(zAlgorithm("aaaaaa")) === JSON.stringify([6, 5, 4, 3, 2, 1]));
// Expected output: true

console.log(JSON.stringify(zAlgorithm("abababab")) === JSON.stringify([8, 0, 6, 0, 4, 0, 2, 0]));

console.log(JSON.stringify(zAlgorithm("abcdabcdabcd")) === JSON.stringify([12, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 0]));
// Expected output: true

// Edge cases
console.log(JSON.stringify(zAlgorithm("")) === JSON.stringify([0]));
// Expected output: true

console.log(JSON.stringify(zAlgorithm("a")) === JSON.stringify([1]));
// Expected output: true