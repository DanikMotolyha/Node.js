const http = require('http');
const fs = require('fs');
http.createServer(function (request, response) {
	fs.access(__dirname + request.url, fs.constants.R_OK, (err) => {
        console.log('aaa');
        console.log(__dirname + request.url);
		if (err) {
			console.log(err)
			response.end('Error');
		}
		else {
			fs.createReadStream(__dirname + request.url).pipe(response);
		}
	})
}).listen(3000);
console.log('created');
