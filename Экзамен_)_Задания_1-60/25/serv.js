let http = require("http");
const query = require('querystring')

http.createServer((req, res) => {
	if (req.method == "POST") {
		let data = "";
		req.on("data", (chunk) => {
			data += chunk;
		});
		req.on("end", () => {
			console.log(query.parse(data));
			res.writeHead(200, { "Content-Type": "application/json" })
			res.end(JSON.stringify({response: "echo", data}));
		});
	}
}).listen(3000);
