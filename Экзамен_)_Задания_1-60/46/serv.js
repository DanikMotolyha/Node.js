let http = require('http');
const fs = require('fs')

let handler = (req, res) => {

    const wr = fs.createWriteStream('./new.txt')
    req.pipe(wr);
}

http.createServer().listen(3000)
    .on('request', handler);
console.log("start")