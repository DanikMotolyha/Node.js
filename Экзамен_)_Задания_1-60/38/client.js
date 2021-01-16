var WebSocket = require('rpc-websockets').Client
let ws = new WebSocket('ws://localhost:3000')

ws.on('open', function () {
	ws.call('sum', [5, 5]).then(function (result) {
		console.log(result);
    })
    
    try {
        ws.call('sayHi').then(result => {
            console.log(result);
        })
    } catch (error) {
        console.log(error);
    }
	ws.login({ 'login': 'Danik', 'password': 'qwerty' }).then((login) => {
		ws.call('account').then(result => {
			console.log(result)
		})
	}).catch(function (error) {
		console.log('auth failed')
    })
    ws.call('sayHi').then(result => {
        console.log(result);
    })
})
