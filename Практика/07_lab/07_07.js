const http = require('http');
let fs     = require('fs');
let modl   = require('./module')('./static');
let http_handler = (req, res)=> {
    console.log('|'+ req.method + '|');
    if      (modl.isStatic('html', req.url)) modl.sendFile(req, res, {'Content-Type': 'text/html; charset=utf-8'});
    else if (modl.isStatic('css', req.url))  modl.sendFile(req, res, {'Content-Type': 'text/css; charset=utf-8'});
    else if (modl.isStatic('js', req.url))   modl.sendFile(req, res, {'Content-Type': 'text/css; charset=utf-8'});
    else if (modl.isStatic('docx', req.url)) modl.sendFile(req, res, {'Content-Type': 'application/msword'});
    else if (modl.isStatic('png', req.url))  modl.sendFile(req, res, {'Content-Type': 'image/png'});
    else if (modl.isStatic('mp4', req.url))  modl.sendFile(req, res, {'Content-Type': 'video/mp4'});
    else if (modl.isStatic('json', req.url)) modl.sendFile(req, res, {'Content-Type': 'application/json'});
    else if (modl.isStatic('xml', req.url))  modl.sendFile(req, res, {'Content-Type': 'application/xml'});
    else if (req.method.trim() == 'GET'.trim()) modl.writeHTTPError(404, 'Resourse not found', res); 
    else modl.writeHTTPError(405, 'Method must be GET', res);
}
let serv = http.createServer();

serv.listen(4000, (v)=>{console.log('listen 3000')})
    .on('error', (err)=>{console.log('error', err.code);})
    .on('request', http_handler);