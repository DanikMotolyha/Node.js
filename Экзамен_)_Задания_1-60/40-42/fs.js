
//обычные методы асинхронные а sync асинхронные
fs = require('fs')

fs.open('new.txt', 'w', (e, file) => {
    if(e) throw e;
    console.log('файл создан');
})

fs.copyFile('new.txt', 'newCopy.txt', (e)=>{
    if(e) console.log(e);
    console.log('копия создана');
})

fs.exists('new.txt', (exists) =>{
    if(exists) console.log('есть')
    else console.log('нет')
})
//это асинхронно (запись с нуля)
fs.writeFile('new.txt', 'qqq', (e)=>{
    if(e) throw e;
    console.log('запись успешна');
})
//это тоже асинхронно (дозапись)
//fs.appendFileSync() - будет уже синхронно
fs.appendFile('new.txt', 'www', (e)=>{
    if(e) throw e;
    console.log('добавление успешно');
})

fs.readFile('new.txt', (e,data)=>{
    if(e) console.log('Ошибка ', e)
    else console.log('data: ', data.toString('utf8'))
})

fs.unlinkSync("new.txt", (err)=>{
    if (err) console.log(err); // если возникла ошибка    
    else console.log("new.txt was deleted");
});

fs.unlink("new.txt", (err) => {
    if (err) console.log(err); // если возникла ошибка    
    else console.log("new.txt was deleted");
  });


fs.rename('new.txt', 'newReName.txt',(e)=>{
    if(e) throw e;
    console.log('переименование успешно');
})

//---------------------------------------------------------------------------------------------------------------------
try {
    fs.watch('new.txt', (event, filename) =>{
        if(filename) console.log(`folder: ${filename}, event: ${event}`)
    })
}
catch (e){
    console.log('e = ', e)
}
fs.rename('new.txt', 'newReName.txt',(e)=>{
    if(e) throw e;
    console.log('переименование успешно');
})