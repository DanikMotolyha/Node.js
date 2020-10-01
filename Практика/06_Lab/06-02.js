var http    = require('http');
var url     = require('url');
var fs      = require('fs');
const { parse } = require('querystring');
const { send } = require('./m0603');


http.createServer(function (request, response){
    
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    if(url.parse(request.url).pathname === '/' && request.method == 'GET' ){
        let html = fs.readFileSync('index.html');
        response.end(html);
    }
    else if(url.parse(request.url).pathname === '/' && request.method == 'POST'){
        var r = null; 
        request.on('data', (data) => {
            r = JSON.parse(data);
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        });
        request.on('end', () => {
            response.end(`<h1>OK: ${r.sender}, ${r.reciever}, ${r.msg}</h1>`);
        });
    }
    else {
        response.end('<h1>Not Support</h1>');
    }
}).listen(5000);


console.log('Server running at http://localhost:5000/');
