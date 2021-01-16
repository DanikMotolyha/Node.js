var sql = require('mssql/msnodesqlv8');


let config = new sql.ConnectionPool(
{
    database: "for_Exam",
    server: "(LocalDB)\\MSSQLLocalDB",
    driver: "msnodesqlv8",
    options: { trustedConnection: true }
});

let connectionPool;
class Db{
    constructor(){
        connectionPool = config.connect();
    }

    query(query){
        return connectionPool
            .then(pool => pool.query(query))
            .then(response => response.recordset);
    }
    getOne(object, field){
        return connectionPool
        .then(pool => pool.query(`SELECT * FROM ${object} WHERE Id${object} = ${field}`))
        .then(response => response.recordset);
    }
    getAll(tableName){
        return connectionPool
            .then(pool => pool.query(`SELECT * FROM ${tableName}`))
            .then(response => response.recordset);
    }
    deleteOne(object, field){
        return connectionPool
        .then(pool => pool.query(`delete FROM ${object} WHERE Id${object} = ${field}`))
        .then(response => response.recordset);
    }
    insertOne(object, fields){
        return connectionPool
        .then(pool => {
            let command = `INSERT INTO ${object} values (`;
            Object.keys(fields).forEach(field =>
            {
                command += `N\'${fields[field]}\',`;
            });
            console.log(object + '  ' + fields);
            command = command.replace(/.$/,")");
            console.log(command);
            command += ';';
            return pool.query(command);
        })
    }
    updateOne(object, idfield, fields){
        return connectionPool
        .then(pool => { 
            let command = `UPDATE ${object} SET `;
            let id = fields[Object.keys(fields).find(field => fields[field] === idfield)];
            console.log(id);
            delete fields[Object.keys(fields).find(field => fields[field] === idfield)];
            Object.keys(fields).forEach(field =>
            {
                command += `${field} = N\'${fields[field]}\',`;
            });
            console.log(object + '  ' + fields);
            command = command.replace(/.$/," ");
            command += ` WHERE Id${object} = ${id};`;
            console.log(command);
            return pool.query(command);
        })
    }
}
module.exports = Db;