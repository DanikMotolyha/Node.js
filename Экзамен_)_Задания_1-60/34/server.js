const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5000, host: 'localhost' })

wss.on('connection', ws => {
    setTimeout(()=>{
        ws.ping('ping from server');
    }, 15000);
	ws.on('ping', (data) => {
		console.log(data.toString('utf8'));
		ws.pong('pong from server');
	})
	ws.on('pong', (data) => {
		console.log(data.toString('utf-8'))
	})
})