/*
const array = [1, 2, 3, 4, 5, 6, 7];
removeElement(array, 5);
console.log(array);
// Результат: [1, 2, 3, 4, 6, 7]
*/
/*
const array = ['Kiev', 'Beijing', 'Lima', 'Saratov'];
removeElement(array, 'Lima'); // удалит 'Lima' из массива
removeElement(array, 'Berlin'); // не удалит ничего
console.log(array);
// Результат: ['Kiev', 'Beijing', 'Saratov']
*/

const array = [1, 2, 3, 4, 5, 6, 7];
removeElement(array, 5, 1, 6);
console.log(array);
// Результат: [2, 3, 4, 7]

function removeElement(array, ...values) {
  for (const value of values) {
    let idx;
    while ((idx = array.indexOf(value)) !== -1) {
      array.splice(idx, 1);
    }
  }
}

/*
const result = unique([2, 1, 1, 3, 2]);
console.log(result);
// Результат: [2, 1, 3]

const result = unique(['top', 'bottom', 'top', 'left']);
console.log(result);
*/
// Результат: ['top', 'bottom', 'left']

function unique(array) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    let found = false;
    const item = array[i];
    for (let j = 0; j < result.length; j++) {
      if (result[j] === item) {
        found = true;
        break;
      }
    }
    if (!found) result.push(item);
  }
  return result;
}

/*
const array1 = [7, -2, 10, 5, 0];
const array2 = [0, 10];
const result = difference(array1, array2);
console.log(result);
// Результат: [7, -2, 5]
*/

const array1 = ["Beijing", "Kiev"];
const array2 = ["Kiev", "London", "Baghdad"];
const result = difference(array1, array2);
console.log(result);
// Результат: ['Beijing']

function difference(array1, array2) {
  const result = [];
  for (let i = 0; i < array1.length; i++) {
    const item = array1[i];
    let found = false;
    for (let j = 0; j < array2.length; j++) {
      if (array2[j] === item) {
        found = true;
        break;
      }
    }
    if (!found) result.push(item);
  }
  return result;
}
