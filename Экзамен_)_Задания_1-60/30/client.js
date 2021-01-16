
const http = require('http');
const fs = require('fs');

const file = fs.createWriteStream('from/file_copy.txt');

let options = {
	host: 'localhost',
	path: '/from/file.txt',
	port: 3000,
	method: 'GET'
}

const req = http.request(options, (res) => {
    res.pipe(file);
})

req.on('error', (e) => {
	console.log('http.req: error', e.message)
})
req.end();