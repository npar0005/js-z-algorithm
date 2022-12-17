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
      while(str[i] === str[k + i]) {
        z[k]++;
        i++;
      }
      
      if(z[k] > 0) {
        l = k;
        r = l + z[k];
      }
    } else { 
      // Case 2: We're inside of a z-box
      const kP = k - l;
      const zboxLen = r - k;
      if(z[kP] < zboxLen) {
        // Case 2a, the prefix match at z[kP] is less tha the remaining z-box length from k
        // if this is the case, then it is safe for us to say that z[k] = z[kP]
        z[k] = z[kP];
      } else {
        
      }
    }
  }
}

zAlgorithm();

//export default zAlgorithm;