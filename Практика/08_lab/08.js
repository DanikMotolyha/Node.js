const http = require('http');
let fs     = require('fs');
var url =  require('url');
const { exit } = require('process');
var server =http.createServer(function (request, response){
    if(request.method == 'GET'){
        //console.log(request.method);
        let string = [];
        //console.log(url.parse(request.url).pathname);
        decodeURI(url.parse(request.url).pathname).split('/')
        .forEach(e => {
            string.push(e);
        });
        console.log(string);
        if(string.indexOf('parameter') == 1 && string.length == 4){
            let x = Number(string[2]);
            let y = Number(string[3]);
            console.log(x + '  ' + y);
            response.end(JSON.stringify({
                sum: x+y,
                dec: x-y,
                mult: x*y,
                div: x/y
            })); 
        }
        switch(url.parse(request.url).pathname){
            case '/connection':
                let r = {};
                if(typeof url.parse(request.url, true).query.set != 'undefined'){
                    let newTimeout = Number(url.parse(request.url, true).query.set);
                    server.keepAliveTimeout = newTimeout;
                }
                r.keepAliveTimeout = server.keepAliveTimeout;
                response.end(JSON.stringify(r));
            break;
            case '/headers':
                response.setHeader('custom', 'CustomHeader');
                console.log();
                response.end(JSON.stringify({
                    requestHeaders: request.headers,
                    responseHeaders: response.getHeaders()
                }));    
            break;
            case '/parameter':
                if(typeof url.parse(request.url, true).query.x == 'undefined'
                || typeof url.parse(request.url, true).query.y == 'undefined'){
                    response.end('Error invalid input');
                }
                else{
                    let x = Number(url.parse(request.url, true).query.x);
                    let y = Number(url.parse(request.url, true).query.y);
                    response.end(JSON.stringify({
                        sum: x+y,
                        dec: x-y,
                        mult: x*y,
                        div: x/y
                    })); 
                }
            break;
            case '/close':
                response.end('server will stop in 10 seconds');
                timerStat = setTimeout(() => {
                    console.log("stopped serv");
                    server.close();
                    exit();
                }, 10000);
            break;
            case '/socket':
                response.end(JSON.stringify({'Client ip:' : request.connection.remoteAddress,
                    'Client port:' : request.connection.remotePort,
                    'Server ip:' : request.connection.localAddress,
                    'Server port:' :  request.connection.localPort
                }));
            break;
            case '/req-data':
                let data = [];
                request.on('data', chunk => data.push(chunk));
                request.on('end', () =>
                {
                    console.log(data);
                    response.end();
                });
            break;
        }
    }
}).listen(5000);
console.log('Server start http://localhost:5000');