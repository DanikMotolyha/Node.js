const WebSocket = require('ws');


const ws = new WebSocket.Server({ port: 5000, host: 'localhost', path: '/ws' });
let k = 0;
ws.on('connection', (wss) => {
	wss.on('message', message => {
		console.log(`Received message => client: ${message}`);
	})
	setInterval(() => { wss.send(JSON.stringify({ msg: ++k })) }, 3000);
})