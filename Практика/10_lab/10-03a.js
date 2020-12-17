const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000/broadcast');
let i = 0;
ws.on('open', ()=>{
    setInterval(()=>{
        ws.send(`client: ${++i}`);
    }, 1000);
    ws.on('message', message =>{
        console.log(`message: ${message}`)
    })
    setTimeout(()=>{
        ws.close()
    }, 25000);
});