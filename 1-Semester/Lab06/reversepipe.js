const EventsEmitter = require("events");

const inc = (x) => ++x;
const twice = (x) => x * 2;
const cube = (x) => x ** 3;

const f1 = reversePipe(inc, twice, cube);

f1.on("error", (e) => {
  console.error("Помилка у f1:", e.message);
});

console.log(f1(5));

const f2 = reversePipe(inc, 7, cube);

f2.on("error", (e) => {
  console.error("Помилка у f2:", e.message);
});

console.log(f2(10));

function reversePipe(...fns) {
  const catcher = new EventsEmitter();
  fn = function (x) {
    try {
      for (let i = fns.length - 1; i >= 0; i--) {
        if (typeof fns[i] !== "function") {
          throw new Error(`Аргумент №${i + 1} не є функцією`);
        }
        x = fns[i](x);
      }
      return x;
    } catch (Error) {
      catcher.emit("error", Error);
      return undefined;
    }
  };
  fn.on = catcher.on.bind(catcher);
  return fn;
}
