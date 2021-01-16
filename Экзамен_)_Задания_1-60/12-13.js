let http = require('http');
let fs = require('fs');
let k = 0;
let server = http.createServer();

let http_handler = (req, res) => {
   console.log(req.url)
   if (req.url === '/index') {
      let html = fs.readFileSync('./12-13.html')
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });       //записать заголовок
      res.end(html);
   }
   else if (req.url === '/info') {
      console.log(`request url: ${req.url}, #`, ++k);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
      console.log(JSON.stringify({url:req.url, iter:k}));
      res.end(JSON.stringify({url:req.url, iter:k}));
   } else if (req.url === '/close') {
    server.close(() => console.log('server.close'))
   }
   else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
      res.end('hi');
   }
}
/*
server.keepAliveTimeout = 10000;        //время сохранения соединения connection 5000 - default
server.on('connection', (socket) => {
   console.log(`connection: server.keepAliveTimeout = ${server.keepAliveTimeout}`, ++c);
   s += `<h2>connection # ${c}</h2>`
   console.log('socket.localAddress = ', socket.localAddress)
   console.log('socket.localPort = ', socket.localPort)
   console.log('socket.remoteAddress = ', socket.remoteAddress)
   console.log('socket.remoteFamily = ', socket.remoteFamily)
   console.log('socket.remotePort = ', socket.remotePort)
   console.log('socket.bytesWritten = ', socket.bytesWritten)
})

server.timeout = 10000 //сообщить о бездействии > 10000, умолчание 120000
server.on('timeout', (socket) => {
   console.log('timeout:', server.timeout)
})
*/
server.on('request', http_handler)

server.on('close', () => console.log('server.on.close'))

server.listen(3000, (v) => console.log('start on port 3000'))
   .on('error', (e) => {
      console.log('Error ', e)
   })