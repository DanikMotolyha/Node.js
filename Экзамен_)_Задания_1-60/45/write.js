fs = require('fs')
let data = '';

const writerStream = fs.createWriteStream('file.txt');
data = 'hello there';
writerStream.write(data,'UTF8');
writerStream.end();