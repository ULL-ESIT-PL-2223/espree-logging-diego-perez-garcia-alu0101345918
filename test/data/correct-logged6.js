function collatz(n) {
  console.log(`Entering collatz(${n}) at line 1`);
  var seq = [n];
  while (n > 1) {
    if (n % 2 == 0) {
      n = n / 2;
    } else {
      n = 3 * n + 1;
    }
    seq.push(n);
  }
  console.log(seq);
  return seq;
}
collatz(3);
