
let http = require('http');
let fs = require('fs');
let options = {
    host: 'localhost',
    path: '/',
    method: 'POST',
    port: 3000,
};
let req = http.request(options, (res) => {
    console.log('here')
});

let rs = new fs.createReadStream('./file.txt');

rs.pipe(req)
