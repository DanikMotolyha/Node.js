
fs = require('fs')

let wbuf = Buffer.from([1,2,4,8,254])
fs.appendFile('new.dat', wbuf, (e)=>{
    if(e) console.log(e);;
    console.log('запись успешна')
})

/*
fs.writeFile('new.dat', wbuf, (e)=>{
    if(e) console.log(e);;
    console.log('запись успешна')
})
*/

