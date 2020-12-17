const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000/broadcast');
ws.on('open', ()=>{
    ws.on('message', message =>{
        console.log(`message: ${message}`)
    })
    setTimeout(()=>{
        ws.close()
    }, 25000);
});