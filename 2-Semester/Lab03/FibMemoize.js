import { memoize } from "./memoize.js";
import { fibonacciGenerator, asyncFibonacciGenerator } from "../lab01/src/index.js";

const fibGen = fibonacciGenerator();
const asyncFibGen = asyncFibonacciGenerator(10, 500);
const slowFib = (n) => {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
};

const fastFib = memoize(slowFib, { limit: 50, strategy: 'LRU' });

console.log(fastFib(40));
console.log(fastFib(40));
