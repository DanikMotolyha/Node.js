fs = require('fs')

let dataRead = "";
const readerStream = fs.createReadStream('file.txt');
readerStream.setEncoding('UTF8');
readerStream.on('data', function(chunk) {
    dataRead += chunk;
});
readerStream.on('end',function(){
    console.log(dataRead);
});