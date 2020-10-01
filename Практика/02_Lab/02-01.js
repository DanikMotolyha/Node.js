var http = require('http');
var fs   = require('fs');
const { url } = require('inspector');

const fname = './test.png';
let png = null;


http.createServer(function (request, response){
    const filePath = request.url.substr(1);
    switch(filePath){
        case 'html':
            let html = fs.readFileSync('02-03.html');
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.end(html);          
        break;
        case 'png':
            png = fs.readFileSync(fname);
            response.end(png);
        break;
        case 'api/name':
            if(request.method === "GET")
                response.end("MOtolyha Daniil Igorevich");
            else{
                response.statusCode=405;
                response.end("Invalid method");
            }
        break;
        case 'xmlhttprequest':
            let html1 = fs.readFileSync('xmlhttprequest.html');
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.end(html1);  
        break;
        case 'fetch':
            let html2 = fs.readFileSync('fetch.html');
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.end(html2);  
        break;
        case 'jquery':
            let html3 = fs.readFileSync('jquery.html');
            response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            response.end(html3);  
        break;
    } 
}).listen(5000);
console.log('Server running at http://localhost:5000/')