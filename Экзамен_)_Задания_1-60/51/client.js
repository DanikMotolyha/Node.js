
const net = require('net');
const fs = require('fs');

let HOST = '127.0.0.1';
let PORT = 4000;

let ws = fs.createWriteStream('./myfile.txt');

let client = new net.Socket();
client.connect(PORT, HOST, () => {
	console.log(`Client connected: ${client.remoteAddress}:${client.remotePort}`);
	client.pipe(ws);
});

client.on('close', () => {
	console.log('Client closed');
});

client.on('error', (e) => {
	console.log('Client error: ', e);
});