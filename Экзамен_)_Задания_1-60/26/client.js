const http = require('http')

const params = JSON.stringify({ name: "Danik", years: 20 })
console.log(params)
const options = {
	host: 'localhost',
	path: '/exm',
	port: 3000,
	method: 'POST',
	headers: {
		"Content-Type": "application/json", "accept": "application/json"
	}
}
const req = http.request(options, (res) => {
	let data = ' ';

	res.on('data', (chunk) => {
		console.log('data: body =', data += chunk);
	});

	res.on('end', () => {
		console.log('end: parse(body) =', JSON.parse(data));
	})

})
req.on('error', (e) => {
	console.log('http.request: error', e.message);
})

req.write(params)

req.end();