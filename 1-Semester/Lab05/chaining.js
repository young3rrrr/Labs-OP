function seq(...args) {
  let storage = [...args];

  function run(x) {
    if (typeof x === "function") {
      storage.push(x);
      return run;
    }

    if (typeof x === "number") {
      return storage.reduceRight((acc, fn) => fn(acc), x);
    }

    throw new Error("Аргумент має бути функцією або числом");
  }

  return run;
}
// перевірки Шемсадінова
console.log(seq((x) => x + 7)((x) => x * 2)(5));
console.log(seq((x) => x * 2)((x) => x + 7)(5));
console.log(seq((x) => x + 1)((x) => x * 2)((x) => x / 3)((x) => x - 4)(7));
