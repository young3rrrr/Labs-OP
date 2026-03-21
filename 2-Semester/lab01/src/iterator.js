const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function* asyncFibonacciGenerator(count, delay) {
    let curr = 0, next = 1; 
    for (let i = 0; i < count; i++) {
        await sleep(delay);
        yield curr;
        [curr, next] = [next, curr + next];
    }
}
(async () => {
    console.log("Початок генерації чисел Фібоначчі...");

    for await (const num of asyncFibonacciGenerator(10, 500)) {
        console.log("Отримано число: " + num);
    }

    console.log("Виконано генерацію чисел Фібоначчі");
})();

asyncFibonacciGenerator(10, 500);
