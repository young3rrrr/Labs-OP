let biba = {
    n1: x => [x],
    n2: function(x,y) {
        return(x,y)
    },
    n3(x,y,z) {
        return[x,y,z];
    }
}

function methods(iface){
    let result = []
    for (let key of Object.keys(iface)){
        let value = iface[key];
    if (typeof value === "function") {
      result.push([key, value.length]);
    }
}  
return result
}

console.log(methods(biba))