
const http = require('http');
const fs = require('fs');
let bound = '----------border----------';
let body = `${bound}\n`;
body += 'Content-Disposition: form-data; name="file"; filename="file.txt" \n';
body += 'Content-Type: text/plain\n\n';
body += fs.readFileSync('./file.txt');
body += `\n${bound}\n`

let options = {
	host: 'localhost',
	path: '/exm',
	port: 3000,
	method: 'POST',
	headers: {
		'content-type': 'multipart/form-data; boundary=' + bound
	}
}

const req = http.request(options, (res) => {

	let data = '';
	res.on('data', (chunk) => {
		console.log('http.request: data: body =\n', data += chunk.toString('utf8'));
	})
	res.on('end', () => {
		console.log('http.request: end: body=\n', data)
	})
})
req.on('error', (e) => {
	console.log('http.request: error:', e.message)
})
req.end(body);