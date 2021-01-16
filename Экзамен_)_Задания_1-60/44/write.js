fs = require('fs')

let k = 5; //количество чисел
let sizeInt32LE = 4; // размер Int32
let wbuf = Buffer.allocUnsafe(sizeInt32LE * k) //выделяем 40 байт
for(let i=0; i<k;i++) wbuf.writeInt32LE(i, i*sizeInt32LE);
fs.writeFile('new.dat', wbuf, (e)=> {
    if(e) throw e;
    console.log("записано")
})