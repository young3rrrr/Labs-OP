import { fibonacciGenerator, asyncFibonacciGenerator, memoize } from 'lab01';

const fibGen = fibonacciGenerator();
const asyncFibGen = asyncFibonacciGenerator(10, 500);
const slowFib = (n) => {
  if (n <= 1) return n;
  return slowFib(n - 1) + slowFib(n - 2);
};

const fastFib = memoize(slowFib, { limit: 50, strategy: 'LRU' });

/*console.log(fibGen.next().value); // 0
console.log(fibGen.next().value); // 1
console.log(fibGen.next().value); // 1
console.log(fibGen.next().value); // 2
console.log(fibGen.next().value); // 3  
console.log(fibGen.next().value); // 5
console.log(fibGen.next().value); // 8

(async () => {
    console.log("Початок генерації чисел Фібоначчі...");

    for await (const num of asyncFibGen) {
        console.log("Отримано число: " + num);
    }

    console.log("Виконано генерацію чисел Фібоначчі");
})();
*/
console.log(fastFib(40));
console.log(fastFib(40));
