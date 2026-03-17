const obj = { a: 1, b: 2, c: 3 };
iterate(obj, (key, value) => {
  console.log({ key, value });
});

function iterate(obj, callback) {
  for (let key in obj) {
    callback(key, obj[key]);
  }
}

const read = store(5);
const value = read();
console.log(value); // Output: 5

function store(value) {
  return () => value;
}
function contract(fn, ...types) {
  return function (...args) {
    const expectedArgsCount = types.length - 1;
    if (args.length !== expectedArgsCount) {
      throw new TypeError(
        `Очікувалось ${expectedArgsCount} аргументів, отримано ${args.length}`
      );
    }

    for (let i = 0; i < args.length; i++) {
      const expected = types[i].name.toLowerCase();
      const actual = typeof args[i];
      if (actual !== expected) {
        throw new TypeError(
          `Аргумент №${i + 1} повинен бути типа ${expected}, отримано ${actual}`
        );
      }
    }

    const result = fn(...args);

    const expectedResult = types[types.length - 1].name.toLowerCase();
    const actualResult = typeof result;
    if (actualResult !== expectedResult) {
      throw new TypeError(
        `Результат повинен бути типа ${expectedResult}, отримано ${actualResult}`
      );
    }

    return result;
  };
}

const add = (a, b) => a + b;
const addNumbers = contract(add, Number, Number, Number);
console.log(addNumbers(2, 3)); // 5

const concat = (s1, s2) => s1 + s2;
const concatStrings = contract(concat, String, String, String);
console.log(concatStrings("Hello ", "world!")); // Hello world!

// Помилки:
try {
  addNumbers(2, "3");
} catch (e) {
  console.error(e.message);
}
