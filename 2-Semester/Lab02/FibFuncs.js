import { fibonacciGenerator, asyncFibonacciGenerator,} from 'lab01';

const fibGen = fibonacciGenerator();
const asyncFibGen = asyncFibonacciGenerator();

console.log(fibGen.next().value); // 0
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

