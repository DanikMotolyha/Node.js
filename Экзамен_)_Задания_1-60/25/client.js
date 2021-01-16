const http = require('http')
const query = require('querystring')

const params = query.stringify({ x: 3, y: 4, s: 'xxx' })

const options = {
	host: 'localhost',
	path: '/exm',
	port: 3000,
	method: 'POST'
}
const req = http.request(options, (res) => {
	let data = ' ';
    console.log(`sended request with params ${params}`)
	res.on('data', (chunk) => {
		console.log('http.request: data: body =', data += chunk);
	});
})
req.on('error', (e) => {
	console.log('http.request: error', e.message);
})

req.write(params)

req.end();
