let http = require('http');
let fs = require('fs');

let sql = require('mssql/msnodesqlv8');
const { columns } = require('mssql/msnodesqlv8');

const pool = new sql.ConnectionPool({
    database: "for_Exam",
    server: "(LocalDB)\\MSSQLLocalDB",
    driver: "msnodesqlv8",
    options: { trustedConnection: true }
});

let http_handler = (req, res) =>
{
    let parsedUrl = require('url').parse(req.url);
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    console.log(req.method, " - ", req.url);
    let procedure = req.url.replace("/", "");
    console.log(procedure);
    pool.connect().then(() =>
        {
            pool.request().execute(`${procedure}`, (err, result) =>
            {
                if (err)
                {
                    res.end(JSON.stringify({ code: 1, message: `procedure ${procedure} does not exist` }));
                }
                else
                {
                    console.log(result.recordset);
                    res.end(JSON.stringify(result.recordset));
                }
                pool.close();
            });
        });
    
}
let httpServer = http.createServer(http_handler);
httpServer.listen(3000, () => console.log(`Server has started on http://localhost:3000`));
