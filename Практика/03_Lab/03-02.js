var http = require('http');
var url =  require('url');
var fs =   require('fs'); 
var factorial = function factorialis (n) {
    return (n == 0 ? 1 : n * factorialis(n - 1));
}
http.createServer(function (request, response){
    let str = JSON.stringify({k: 0});
    if(url.parse(request.url).pathname === '/fact'){
        if(typeof url.parse(request.url, true).query.k != 'undefined'){
            let k = parseInt(url.parse(request.url, true).query.k);
            if(Number.isInteger(k)){
                response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
                response.end(JSON.stringify({k:k, factorial:factorial(k)}));
            }
        }
    }
    else if(url.parse(request.url).pathname === '/'){
        let html = fs.readFileSync('./getFact03_02.html')
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.end(html);
    }
}).listen(5000);
console.log('Server running at http://localhost:5000/');
