const inc = (x) => ++x;
const twice = (x) => x * 2;
const cube = (x) => x ** 3;

const f1 = reversePipe(inc, twice, cube);
console.log(f1(5));
const f2 = reversePipe(inc, inc);
console.log(f2(7));
const f3 = reversePipe(inc, 7, cube);
console.log(f3(10));

function reversePipe(...fns) {
  return function (x) {
    try {
      for (let i = 0; i < fns.length; i++) {
        x = fns[i](x);
      }
      return x;
    } catch (Error) {
      return Error;
    }
  };
}
