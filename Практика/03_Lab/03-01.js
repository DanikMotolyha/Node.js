var http = require('http');

http.createServer(function (request, response){
    response.contentType='text/html';
    const filePath = request.url.substr(1);
    if(filePath == '')
    response.end(state); 
}).listen(5000);
var state = 'norm'; 
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', ()=>{
    let chunk = null;
    while((chunk = process.stdin.read()) != null){
        if(chunk.trim() == 'idle' 
        || chunk.trim() == 'norm'
        || chunk.trim() == 'stop'){
            process.stdout.write(`reg = ${state} --> ${chunk.trim()}\n`);
            state = chunk.trim();
        }
        else if(chunk.trim() == 'exit'){
            process.exit(0);
        }
        else{
            process.stdout.write(`${chunk.trim()}\n`);
        }
        process.stdout.write(`${state}->`);
    }
});
console.log('Server running at http://localhost:5000/');
process.stdout.write(`${state}->`);
