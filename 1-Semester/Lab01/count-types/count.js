function countTypes(arr) {
    for (const item of arr) {
        const type = typeof item;
        if (type in Types) {
            Types[type]++;
        }
        else{
             Types[type] = 1; 
        }
    }
}
const Types = {};
const array = [1, "hello", true, 42, "world", false, 3.14, "JavaScript", true, 100, "code", false, 7, "test", true, 0, "end", 99, "types", false, 2.71, BigInt(9007199254740991),
     Symbol("sym"), null, undefined, function() {}, {}, []];
countTypes(array);
console.dir(Types);