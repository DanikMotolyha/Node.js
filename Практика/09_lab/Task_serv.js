var http = require('http');
let fs = require('fs');
const FormData = require('form-data');
let mp=require('multiparty');
const axios = require('axios');
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', ()=>{
    let chunk = null;
    let options;
    let params;
    let req;
    let service;
    let formData;
    while((chunk = process.stdin.read()) != null){
        let string = chunk.trim().split(' ');
        switch(string[0]){
            case '1':
                options = {
                    host: 'localhost',
                    path: '/1',
                    port: 5000,
                    method: 'GET'
                }
                req = http.request(options, (res)=>{
                    console.log(
                        `method: ${req.method}\n
                        response: , ${res.statusCode}\n
                        statusMessage: ${res.statusMessage}\n
                        remoteAddress: ${res.socket.remoteAddress}\n
                        remotePort: ${res.socket.remotePort}\n
                        response headers ${res.headers}`
                    );
                    let data ='';
                    res.on('data', (chunk)=>{
                        console.log('data: body: ', data += chunk.toString('utf-8'));
                    });
                    res.on('end', ()=>{console.log('end: body: ', data);});
                });
                req.on('error', (e)=>{console.log('error: ', e.message);});
                req.end();
            break;
            case '2':
                options = {
                    host: 'localhost',
                    path: "/2?x=1&y=2",
                    port: 5000,
                    method: 'GET'
                }
                req = http.request(options, (res)=>{
                    console.log(
                        `method: ${req.method}\n
                        response: ${res.statusCode}\n
                        statusMessage: ${res.statusMessage}`);
                    let data ='';
                    res.on('data', (chunk)=>{
                        console.log('data: body: ', data += chunk.toString('utf-8'));
                    });
                });
                req.on('error', (e)=>{console.log('error: ', e.message);});
                req.end();
            break;
            case '3':
                params = JSON.stringify({
                    x:1,
                    y:2, 
                    s:'hello'
                });
                options = {
                    host: 'localhost',
                    path: '/3',
                    port: 5000,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': params.length //wtf error if i use const length ?????
                      }
                }
                req = http.request(options, (res)=>{
                    console.log(
                        `method: ${req.method}\n
                        response ${res.statusCode}\n
                        statusMessage ${res.statusMessage}\n`);
                    let data ='';
                    res.on('data', (chunk)=>{
                        console.log('data: body: ', data += chunk.toString('utf-8'));
                    });
                });
                req.on('error', (e)=>{console.log('error: ', e.message);});
                req.write(params);
                req.end();
            break;
            case '4': 
            params =  JSON.stringify({
                __comment: '123',
                x: 1,
                y: 2,
                s: "message",
                m: ["a", "b"],
                o: {surname: "Motolyha", name:"Danik"}
            });
            options = {
                host: 'localhost',
                path: '/4',
                port: 5000,
                method: 'POST',
                headers: {
                    'Accept-Language': '*',
                    'Content-Type': 'application/json',
                    'Content-Length': params.length
                  }
            }
            req = http.request(options, (res)=>{
                console.log(
                    `method: ${req.method}\n
                    response ${res.statusCode}\n
                    statusMessage ${res.statusMessage}\n`);
                let data ='';
                res.on('data', (chunk)=>{
                    console.log('data: body: ', data += chunk.toString('utf-8'));
                });
            });
            req.on('error', (e)=>{console.log('error: ', e.message);});
            req.write(params);
            req.end();
            break;
            case '5':
                params = 
                    '<request id="28">' +
                        '<x value="1"/>' +
                        '<x value="2"/>' +
                        '<x value="3"/>' +
                        '<m value="H"/>' +
                        '<m value="i"/>' + 
                        '<m value="!"/>' + 
                        '<m value="!"/>' + 
                        '<m value="!"/>' + 
                    '</request>';
                options = {
                    host: 'localhost',
                    path: '/5',
                    port: 5000,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/xml',
                        'Content-Length': params.length
                    }
                }
                req = http.request(options, (res)=>{
                    console.log(
                        `method: ${req.method}\n
                        response ${res.statusCode}\n
                        statusMessage ${res.statusMessage}\n`);
                    let data ='';
                    res.on('data', (chunk)=>{
                        console.log('data: body: ', data += chunk.toString('utf-8'));
                    });
                });
                req.on('error', (e)=>{console.log('error: ', e.message);});
                req.write(params);
                req.end();
            break;
            case '6':
                service = axios.create({
                    baseURL: 'http://localhost:5000',
                    responseType: "application/json"
                });
                formData = new FormData();
                formData.append(
                    'textFile',
                    fs.createReadStream(__dirname + '/MyFile.txt'),
                    {knownLength: fs.statSync(__dirname + '/MyFile.txt').size}
                );
                
                service.post('/6-7', formData,{
                    headers: {
                        ...formData.getHeaders(),
                        "Content-Length": formData.getLengthSync()
                    }
                })
                .then(res=>{
                    console.log('response: ', res.status);
                    console.log('statusMessage: ', res.statusText);
                    console.log('data: ' + JSON.stringify(res.data));
                });   
            break;
            case '7':
                service = axios.create({
                    baseURL: 'http://localhost:5000',
                    responseType: "application/json"
                });
                
                formData = new FormData();
                formData.append(
                    'pngFile',
                    fs.createReadStream(__dirname + '/MyFile.png'),
                    {knownLength: fs.statSync(__dirname + '/MyFile.png').size}
                );
                
                service.post('/6-7', formData,{
                    headers: {
                        ...formData.getHeaders(),
                        "Content-Length": formData.getLengthSync()
                    }
                })
                .then(res=>{
                    console.log('response: ', res.status);
                    console.log('statusMessage: ', res.statusText);
                    console.log('data: ' + JSON.stringify(res.data));
                });
            break;
            case '8':
                const file = fs.createWriteStream('txt.txt');
                options= {
                    host: 'localhost',
                    path: '/8',
                    port: 5000,
                    method:'GET'
                }
                req = http.request(options,(res)=> {
                    res.pipe(file);
                }); 
                req.on('error', (e)=> {
                    console.log('http.request: error:', e.message);
                });
                req.end();
            break;
        }
    }
});
