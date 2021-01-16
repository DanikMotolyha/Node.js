var http = require("http");
var url = require("url");

http.createServer((req, res) => {
	if (req.method == "GET") {
        console.log(url.parse(req.url, true).query.x + " " + url.parse(req.url, true).query.y);
		res.end(url.parse(req.url, true).query.x + " " + url.parse(req.url, true).query.y);
	}
}).listen(3000);