let fs     = require('fs');
function Stat( sfn = './static'){
    this.STATIC_FOLDER = sfn;
    let pathStatic = (fn)=>{ return `${this.STATIC_FOLDER}${fn}`; }
    this.isStatic = (ext, fn)=> {
        let reg = new RegExp(`^\/.+\.${ext}$`);
        console.log(reg);
        return reg.test(fn);
    }
    this.writeHTTPError = (statusC_Code, message, res)=> {
        res.statusCode = statusC_Code;
        res.statusMessage = message;
        res.end(message);
    }
    let pipeFile = (req, res, headers) => {
        res.writeHead(200, headers);
        fs.createReadStream(pathStatic(req.url)).pipe(res);
    }
    this.sendFile = (req, res, headers)=> {
        fs.access(pathStatic(req.url), fs.constants.R_OK, err => {
            if(err) writeHTTP404(res);
            else pipeFile(req, res, headers);   
        });
    }
}

module.exports = (parm)=>{return new Stat(parm);}