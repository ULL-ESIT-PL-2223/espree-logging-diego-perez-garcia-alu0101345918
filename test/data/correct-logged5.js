function sumArray(array) {
  console.log(`Entering sumArray(${array}) at line 1`);
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  console.log(sum);
  return sum;
}
sumArray([1, 2, 3]);
