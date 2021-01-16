const WebSocket = require('ws')
const fs = require('fs')
const ws = new WebSocket('ws://localhost:5001/server')
ws.on('open', () => {
	const duplex = WebSocket.createWebSocketStream(ws, { encoding: 'utf8' })
	let rfile = fs.createReadStream(`./MyFile.txt`)
	rfile.pipe(duplex);
})