let http = require("http");

http.createServer((req, res) => {
	if (req.method == "POST") {
		let data = "";
		req.on("data", (chunk) => {
			data += chunk;
		});
		req.on("end", () => {
			console.log(JSON.parse(data));
			res.writeHead(200, { "Content-Type": "application/json" })
			res.end(data);
		});
	}
}).listen(3000);