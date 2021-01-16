let http = require('http');

let HTTP405 = (req, res) => {
	res.writeHead(405);
	res.end(`Wrong METHOD`);
};

let HTTP404 = (req, res) => {
	res.writeHead(404);
	res.end(`Wrong URI`);
};
let urlhandler = (req, res) => {
	if (req.url === '/') {
		res.writeHead(200);
		res.end(`echo :) : method:${req.method}:${req.url}`);
	}
	else {
		HTTP404(req, res);
	}
}

let http_handler = (req, res) => {
    console.log(req.method);
    console.log(req.method != 'POST');
    if(req.method != 'GET'
    && req.method != 'POST'
    && req.method != 'PUT'
    && req.method != 'DELETE'){
        HTTP405(req, res);
    }
    else
        urlhandler(req, res);
};

http.createServer().listen(3000)
	.on('error', (e) => { console.log('error: ', e.code) })
	.on('request', http_handler);