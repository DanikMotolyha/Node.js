let http = require('http');
let fs = require('fs');

writeHTTP404 = (req, res) => {
	res.statusCode = 404;
	res.statusMessage = 'Resourse not found';
	res.end("Resourse not found");
}

isStatic = (ext, fn) => {
	let reg = new RegExp(`^\/.+\.${ext}$`);
	return reg.test(fn);
};

sendFile = (req, res, headers) => {
	fs.readFile(`./files${req.url}`, (err, result) => {
		if (err)
			this.writeHTTP404(res);
		else {
			res.writeHead(200, headers);
			res.write(result);
			res.end();
		}
	})
};


let http_handler = (req, res) => {
	if (isStatic('html', req.url)) sendFile(req, res, { "Content-Type": "text/html; charset=utf-8;" });
	else if (isStatic('css', req.url)) sendFile(req, res, { "Content-Type": "text/css; charset=utf-8;" });
	else if (isStatic('js', req.url)) sendFile(req, res, { "Content-Type": "text/javascript; charset=utf-8;" });
	else if (isStatic('docx', req.url)) sendFile(req, res, { "Content-Type": "application/msword" });
	else if (isStatic('json', req.url)) sendFile(req, res, { "Content-Type": "application/json" });
    else if (isStatic('png', req.url)) sendFile(req, res, { "Content-Type": "image/png" });
	//else if (isStatic('txt', req.url)) sendFile(req, res, { "Content-Type": "text/css; charset=utf-8;" });
	else writeHTTP404(req, res);
};

http.createServer().listen(3000)
	.on('error', (e) => { console.log('error: ', e.code) })
	.on('request', http_handler);