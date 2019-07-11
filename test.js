const arr = [1, 2, 3, 4, 5, 6, 7];

const pureSplice = (array, start, amount) => [
  ...array.slice(0, start),
  ...array.slice(start + amount),
  // if you dont give slice a second arg it goes to end of array
];
console.log(pureSplice(arr, 0, 2));
