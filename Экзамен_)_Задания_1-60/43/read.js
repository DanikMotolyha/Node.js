fs = require('fs')
fs.readFile('new.dat', (e,data)=>{
    if(e) {console.log('Ошибка ', e)}
    else {
        let array = [];
        for (data of data.values())
            array.push(data);
        console.log(array);
    }
})