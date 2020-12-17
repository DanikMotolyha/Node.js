const http = require('http');
let fs     = require('fs');
var url =  require('url');
let parseString = require('xml2js').parseString;
const { exit } = require('process');
let mp = require('multiparty');
var server = http.createServer(function (request, response){
    let parsedUrl = url.parse(request.url, true);   
    if(request.method == 'GET'){
        console.log(request.method);
        let string = [];
        //console.log(url.parse(request.url).pathname);
        decodeURI(url.parse(request.url).pathname).split('/')
        .forEach(e => {
            string.push(e);
        });
        console.log(string);
        //Task 13 task name
        if(string.indexOf('files') == 1 && string.length == 3){
            let fileName = __dirname + '\\static\\' + string[2];
            fs.readFile(fileName, (err, data) => {
                if (err) {
                    response.statusCode = 404;
                    response.end();
                } else {
                    fs.createReadStream(fileName).pipe(response);
                }
            })
        }
        //Task 4 analize parameters if not number output URL else operations x,y
        if(string.indexOf('parameter') == 1 && string.length == 4){
            let x = Number(string[2]);
            let y = Number(string[3]);
            if(isNaN(x) || isNaN(y)){
                response.end('Error invalid input');
            }else{
                console.log(x + '  ' + y);
                response.end(JSON.stringify({
                    sum: x+y,
                    dec: x-y,
                    mult: x*y,
                    div: x/y
                }));
            } 
        }
        switch(url.parse(request.url).pathname){
            //Task 1 connection set
            case '/connection':
                let r = {};
                if(typeof url.parse(request.url, true).query.set != 'undefined'){
                    let newTimeout = Number(url.parse(request.url, true).query.set);
                    server.keepAliveTimeout = newTimeout;
                }
                r.keepAliveTimeout = server.keepAliveTimeout;
                response.end(JSON.stringify(r));
            break;
            //Task 2 show all headers
            case '/headers':
                response.setHeader('custom', 'CustomHeader');
                console.log();
                response.end(JSON.stringify({
                    requestHeaders: request.headers,
                    responseHeaders: response.getHeaders()
                }));    
            break;
            //Task 3 analize parameters if not number ERROR MSG else operations x,y
            case '/parameter':
                console.log(typeof url.parse(request.url, true).query.x);
                let x = Number(url.parse(request.url, true).query.x);
                let y = Number(url.parse(request.url, true).query.y);
                console.log(x, y);
                if(isNaN(x) || isNaN(y)){
                    response.end('Error invalid input');
                }
                else{
                    
                    response.end(JSON.stringify({
                        sum: x+y,
                        dec: x-y,
                        mult: x*y,
                        div: x/y
                    })); 
                }
            break;
            //Task 5 stop server after 10 sec. use timeout 
            case '/close':
                response.end('server will stop in 10 seconds');
                timerStat = setTimeout(() => {
                    console.log("stopped serv");
                    server.close();
                    exit();
                }, 10000);
            break;
            //Task 6 ip info 
            case '/socket':
                response.end(JSON.stringify({'Client ip:' : request.connection.remoteAddress,
                    'Client port:' : request.connection.remotePort,
                    'Server ip:' : request.connection.localAddress,
                    'Server port:' :  request.connection.localPort
                }));
            break;
            //Task 7 /req-data long data to send part
            case '/req-data':
                let data = [];
                request.on('data', chunk => data.push(chunk));
                request.on('end', () =>
                {
                    console.log(data);
                    response.end();
                });
            break;
            //Task 8 GET resp-status?code=c?mess=m
            case '/resp-status':
                response.end(JSON.stringify({
                    'Status code:' : Number(url.parse(request.url, true).query.code),
                    'Status message:' : url.parse(request.url, true).query.mess
                })); 
            break;
            //Task 9 html form
            case '/formparameter':
                let html = fs.readFileSync('html.html');
                response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                response.end(html);
            break;
            //Task 13 get files
            case '/files':
                fs.readdir( __dirname + '/static', (err, files) => {
                    if (err)
                        response.statusCode = 500;
                    response.setHeader('X-static-files-count', files.length);
                    response.end();
                });
            break;
            //Task 14 get
            case '/upload':
                let htmlUpload = fs.readFileSync('upload.html');
                response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                response.end(htmlUpload);
            break;
        }
    }
    else if (request.method=='POST'){
        switch(url.parse(request.url).pathname){
            case'/formparameter': 
                console.log("data");
                let data = '';
                request.on('data', chunk => {
                    data += chunk.toString();
                })
                request.on('end', () => {
                    response.end(data);
                })
            break;
            //Task 10 /json
            case '/json':
                let dataJs = '';
                request.on('data', (chunk) => {
                    dataJs += chunk;
                });
                request.on('end', () => {
                    dataJs = JSON.parse(dataJs);
                    response.writeHead(200, {'Content-type': 'application/json; charset=utf-8'});
                    console.log(dataJs);
                    let resp = {};
                    resp.__comment = 'Ответ.' + dataJs.__comment.split('.')[1]
                    resp.x_plus_y = dataJs.x + dataJs.y;
                    resp.Concatenation_s_o = dataJs.s + ': '+ dataJs.o.surname + ', ' + dataJs.o.name;
                    resp.Length_m = dataJs.m.length;
                    response.end(JSON.stringify(resp));
                });
            break;
            //Task 11 /xml use xml2j module to parse to json
            case '/xml':
                let dataXml = '';
                request.on('data', (chunk) => {
                    dataXml += chunk;
                });
                console.log(dataXml);
                request.on('end', () => {
                    parseString(dataXml, function(err, result) {
                    response.writeHead(200, {'Content-type': 'application/xml'});
                    let id = result.request.$.id;
                    let sum = 0;
                    let concat = '';
                    result.request.x.forEach((p) => {
                        sum += parseInt(p.$.value);
                    });
                    result.request.m.forEach((p) => {
                        concat += p.$.value;
                    });
                    response.end(
                        `<response id="33" request="${id}">
                            <sum element="x" result="${sum}"/>
                            <concat element="m" result="${concat}"/>
                    </response>`);
                    });
                });
            break;
            //Task 14 post upload
            case '/upload':
                let form = new mp.Form({uploadDir: './static'});
                form.on('file', (name, file) => {
                });
                form.on('close', () => {
                    response.writeHead(200, {'Content-type': 'text/plain'});
                    response.end("200 COMPLETE");
                });
                form.parse(request);
            break;
        }
    }
}).listen(5000);
console.log('Server start http://localhost:5000');