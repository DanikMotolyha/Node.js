fs = require('fs')
fs.readFile('new.dat', (e,buf)=> {
    if(e) throw e;
    else {
        let k = buf.length / 4; // количество чисел
        let m = [];
        for(let i=0; i<k;i++) m.push(buf.readInt32LE(i*4));
        console.log(m)
    }
})