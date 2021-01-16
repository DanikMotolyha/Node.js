const WebSocketServer = require('rpc-websockets').Server

const server = new WebSocketServer({
	port: 3000,
	host: 'localhost'
})

server.setAuth((user) => user.login === 'Danik' && user.password === 'qwerty')

server.register('sum', function (params) {
	return params[0] + params[1];
})

server.register('sayHi', function () {
    return 'Hi new user!!!';
}).protected()

server.register('account', () => {
	return 'account'
}).protected()

setInterval(() => server.emit('feedUpdated'), 3000);