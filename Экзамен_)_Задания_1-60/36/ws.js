const WebSocket = require('ws')
const fs = require('fs')
const wss = new WebSocket.Server({ port: 5001, host: 'localhost', path: '/server' });
wss.on('connection', (ws) => {
	const duplex = WebSocket.createWebSocketStream(ws, { encoding: 'utf8' })
	let wfile = fs.createWriteStream(`./file.txt`)
	duplex.pipe(wfile)
})