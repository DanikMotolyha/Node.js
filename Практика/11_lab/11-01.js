let webSocket = require('ws');
const fs = require('fs');

const webServer = new webSocket.Server({port: 4000, host: 'localhost'});

webServer.on('connection', (clientSocket) =>
{
    const webSocketStream = webSocket.createWebSocketStream(clientSocket, {encoding: 'utf-8'});
    const file = fs.createWriteStream(__dirname + `\\upload\\file_1.txt`);
    console.log(__dirname + `\\upload\\file_1.txt`);
    webSocketStream.pipe(file);
});