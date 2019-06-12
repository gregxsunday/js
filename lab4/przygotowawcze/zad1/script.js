const mymodule = require('./module.js');
// const suma = new Operation(2, 7);
let x = parseInt(process.argv[2], 10);
let y = parseInt(process.argv[3], 10);
const suma = new mymodule.Operation(x, y);
console.log(suma.sum())
