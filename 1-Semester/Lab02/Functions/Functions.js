const output = {calculated: []};
function average(a, b) {
    return (a + b) / 2;
}
function square(x) {
    return x * x;
}   
function cube(x) {
    return x * x * x;
}

function calculate(){
    for (let i = 0; i <= 9; i++){
        output.calculated.push({
            number: i,
            square: square(i),
            cube: cube(i),
            average: average( square(i), cube(i) )
        });
    }          
}
calculate();
console.dir(output);
