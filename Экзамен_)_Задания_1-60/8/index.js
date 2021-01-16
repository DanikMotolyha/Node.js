let http = require('http');
let url = require('url');
let fs = require('fs');
let data = require('./eventEmitterModule');

let db = new data.DB();

db.on('GET', (req, res) => {
   console.log('DB GET');
   res.end(JSON.stringify(db.get()));
});
db.on('POST', (req, res) => {
   console.log('DB POST');
   req.on('data', data => {
      let result = JSON.parse(data);
      db.post(result);
      res.end(JSON.stringify(result));
   })
});

http.createServer((req, res) => {
    if (url.parse(req.url).pathname === '/') {
       let html = fs.readFileSync('./index.html');
       res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8'
       })
       res.end(html);
    }
    else if (url.parse(req.url).pathname === '/api/db') {
       db.emit(req.method, req, res)
    }
 }).listen(3000)
 console.log('start');