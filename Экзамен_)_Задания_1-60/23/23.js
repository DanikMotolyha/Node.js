let http = require('http');
let fs = require('fs');

let handler = (req, res) => {
		res.writeHead(200, {
			'Content-Type': 'text/plain; charset=utf-8',
			'Content-Disposition': 'attachment; filename="file.txt"'
		});
		fs.createReadStream('./file.txt').pipe(res);
}

http.createServer().listen(3000)
	.on('error', (e) => { console.log('error: ', e.code) })
	.on('request', handler);