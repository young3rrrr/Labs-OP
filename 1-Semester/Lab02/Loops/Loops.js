const numbers = {start: 15, end: 30};
const output = {range: [], rangeOdd: []};
function range(arr){
    for(let i = arr.start; i <= arr.end; i++){
        output.range.push(i);
    }
}

function rangeOdd(arr){
    for(let i = arr.start; i <= arr.end; i++){
        if(i % 2 !== 0){
            output.rangeOdd.push(i);
        }
    }
}
range(numbers);
rangeOdd(numbers);
console.dir(output);