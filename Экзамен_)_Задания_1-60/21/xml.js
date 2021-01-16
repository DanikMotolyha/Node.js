let http = require('http');
let parseString = require('xml2js').parseString;
let handler = (req, res) => {
	let xmltxt = '';
	req.on('data', (data) => { xmltxt += data })
	req.on('end', () => {
		console.log(xmltxt);
		parseString(xmltxt, (err, result) => {
			if (err) {
				res.writeHead(400);
				res.end(err);
			}
			else {
				console.log('NICE!');
				console.log(result);
				res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
				res.write(JSON.stringify(result));
				res.end();
			}
		})
	})
}
http.createServer().listen(3000)
	.on('error', (e) => { console.log('error: ', e.code) })
	.on('request', handler);