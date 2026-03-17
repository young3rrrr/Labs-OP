
function inc(n){
    return n + 1;
}
    const a = 1;
    const b = inc(a);
    console.dir({a, b});


function incField(obj){
    obj.value = obj.value + 1;
}

const NewObject = {value: 10};
incField(NewObject);
console.dir(NewObject);