var http    = require('http');
var url     = require('url');
var fs      = require('fs');
var data    = require('./module04');
const { loadavg } = require('os');

var db = new data.DB();

// --- impl events

db.on('GET', (req,res)=>{res.end(JSON.stringify(db.get()));});
db.on('POST', (req,res)=>{
    req.on('data', data=>{
        let r = JSON.parse(data);
        db.post(r);
        res.end();
    });
});
db.on('PUT', (req,res)=>{
    req.on('data', data=>{
        let r = JSON.parse(data);
        db.put(r);
        res.end();
        });
});
db.on('DELETE', (req,res)=>{
    req.on('data', data=>{
    let r = JSON.parse(data);
    console.log(r);
    db.delete(r);
    res.end();
    });
});
db.on('COMMIT', () =>{
    db.commit();
    //console.log("db commit");
});

// ---
// --- server (2 url /, /api/db, /api/db/ss)

var server = http.createServer(function (request, response){
    
    let str = JSON.stringify({k: 0});
    if(url.parse(request.url).pathname === '/'){
        let html = fs.readFileSync('index.html');
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(html);
    }
    else if(url.parse(request.url).pathname === '/api/db'){
        db.emit(request.method, request, response);
    }
    else if(url.parse(request.url).pathname === '/api/ss'){
        response.end(jsonInput);
    }
}).listen(5000);

// ---
// --- task with comand line
var timerStopServer;
var intervalCommitDB;
var timerStat;
var dateStartStat;
var timedStatistic;
var operationsCouner = 0;
var commitCounter = 0;

var jsonInput = "pusto";
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', ()=>{
    let chunk = null;
    while((chunk = process.stdin.read()) != null){
        let string = chunk.trim().split(' ');
        switch(string[0]){
            case 'sd':
                if(string.length == 1){
                    operationsCouner++;
                    console.log("cancel stop server");
                    clearTimeout(timerStopServer);
                }
                else if(string.length == 2){
                    operationsCouner++;
                    var start = Date.now();
                    timerStopServer = setTimeout(() => {
                        server.close( () => { 
                            clearInterval(intervalCommitDB);
                            console.log(`Server terminate (time wait ${Date.now() - start})`);
                            //process.exit(0); //not task but should be
                        });
                    }, string[1]);
                }
                else{
                    console.log("incorrect input. try to send sd [param int]");
                }
                break;
            case 'sc':
                if(string.length == 1){
                    operationsCouner++;
                    console.log('Stopped commit with interval');
                    clearInterval(intervalCommitDB);
                }
                else if(string.length == 2){
                    operationsCouner++;
                    intervalCommitDB = setInterval(() => {
                            db.emit('COMMIT');
                            ++commitCounter;                           
                    }, string[1]).unref();
                    //intervalCommitDB.unref();
                }
                else{
                    console.log("incorrect input. try to send sc [param int]");
                }
                break;
            case 'ss':
                if(string.length == 1){
                    console.log("stop ss");
                    clearInterval(timedStatistic);
                    clearTimeout(timerStat);
                    console.log(jsonInput);
                }
                else if(string.length == 2){
                    operationsCouner = 0;
                    commitCounter = 0;
                    var start1 = Date.now();
                    dateStartStat = new Date().toISOString().slice(0,10);
                    timedStatistic = setInterval(() => {
                            jsonInput = JSON.stringify({start: dateStartStat, finish: new Date().toISOString().slice(0,10), request: operationsCouner, commitCounter});
                            //console.log(jsonInput + `time passed: ${Date.now() - start1}`);
                        }, 1).unref();
                    timerStat = setTimeout(() => {
                        clearInterval(timedStatistic);
                        clearTimeout(timerStat);
                        console.log("stopped ss");
                    }, string[1]).unref();
                }
                else{
                    console.log("incorrect input. try to send ss [param int]");
                }
                break;
        }
    }
});

// ---

console.log('Server running at http://localhost:5000/');
