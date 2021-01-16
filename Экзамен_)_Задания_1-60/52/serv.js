
const net = require('net');

let HOST = '0.0.0.0';

net.createServer((Server) => ServerStart(Server)).listen(4000, HOST);
net.createServer((Server) => ServerStart(Server)).listen(5000, HOST);

function ServerStart(sock) {
    console.log(`Server connected: ${sock.remoteAddress}:${sock.remotePort}`);
    sock.on('error', (e) => {
        console.log(`Server error: ${e}`);
    });

    /*!!!!!!!!!!!!!!!!!!*/
    let input = process.stdin;
    input.on('data', data => {
        sock.write(data);
    });

    sock.on('data', (data) => {
        console.log(data.toString());
    });
}