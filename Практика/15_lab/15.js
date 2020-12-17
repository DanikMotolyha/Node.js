const MongoClient = require('mongodb').MongoClient;
let http = require('http');
let url = require('url');

const client = new MongoClient("mongodb://localhost:27017/?readPreference=primary&appname=Danik%20Compass&ssl=false", 
{ useNewUrlParser: true, useUnifiedTopology: true });

function http_handler(req, res)
{
    switch(req.method)
    {
        case 'GET':
            switch(true)
            {
                case url.parse(req.url).pathname == '/api/pulpit' || url.parse(req.url).pathname == '/api/faculty':
                    console.log("111");
                    client.connect(err =>
                    {
                        if(err)
                        {
                            console.log('Mongodb error connection')
                        }
                        else
                        {
                            console.log('Mongodb connection success');
                            let collection_name = url.parse(req.url).pathname.split('/')[2];

                            client.db("bstu").collection(collection_name, (err, collection) =>
                            {
                                if(err)
                                {
                                    console.log('error', err)
                                }
                                else
                                {
                                    collection.find().toArray((err,docs) =>
                                    {
                                        if(err)
                                        {
                                            console.log('collection.find error', err);
                                        }
                                        else
                                        {
                                            res.writeHead(200,{'Content-Type': 'application/json'});
                                            res.end(JSON.stringify(docs));
                                        }
                                    })
                                }
                            });
                        }
                    });
                    break;
                default: break;
            }
            break;
        case 'POST':
            switch(true)
            {
                case url.parse(req.url).pathname == '/api/faculty' || url.parse(req.url).pathname == '/api/pulpit':
                    client.connect(err =>
                    {
                        let body='';
                        req.on('data',chunk=>{body+=chunk.toString();});

                        req.on('end',async () =>
                        {
                            let o = JSON.parse(body);
                            let collection_name = url.parse(req.url).pathname.split('/')[2];
                            if(err)
                            {
                                console.log('Mongodb error connection')
                            }
                            else
                            {
                                console.log('Mongodb connection success');

                                client.db("bstu").collection(collection_name, (err, collection) =>
                                {
                                    if(err)
                                    {
                                        console.log('error', err)
                                    }
                                    else
                                    {
                                        collection.insertOne(o,function(err,result)
                                        {
                                            if(err)
                                            {
                                                console.log('collection.find error', err);
                                            }
                                            else
                                            {
                                                res.writeHead(200,{'Content-Type': 'application/json'});
                                                res.end(JSON.stringify(result.ops));
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    });
                    break;
                default: break;
            }
            break;
        case 'PUT':
            switch(true)
            {
                case url.parse(req.url).pathname == '/api/faculty' || url.parse(req.url).pathname == '/api/pulpit':
                    client.connect(err =>
                    {
                        let body='';
                        req.on('data',chunk => {body+=chunk.toString();});

                        req.on('end',async () =>
                        {
                            let o = JSON.parse(body);

                            if(err)
                            {
                                console.log('Mongodb error connection')
                            }
                            else
                            {
                                console.log('Mongodb connection success');
                                let collection_name = url.parse(req.url).pathname.split('/')[2];

                                client.db("bstu").collection(collection_name,(err,collection) =>
                                {
                                    if(err)
                                    {
                                        console.log('error', err)
                                    }
                                    else
                                    {
                                        if(collection_name == 'faculty')
                                        {
                                            collection.findOneAndUpdate({faculty: o.faculty}, {$set: {faculty_name: o.faculty_name}}, {returnOriginal: false}, function (err, result)
                                            {
                                                if (err)
                                                {
                                                    console.log('collection.find error', err);
                                                } else
                                                    {
                                                    if (result.value == null)
                                                    {
                                                        res.end(`"error" : "3","message" : "Уже изменено"`);
                                                    }
                                                    else
                                                    {
                                                        res.writeHead(200, {'Content-Type': 'application/json'});
                                                        res.end(JSON.stringify(result.value));
                                                    }
                                                }

                                            });
                                        }
                                        if(collection_name == 'pulpit')
                                        {
                                            client.db("bstu").collection(collection_name,(err,collection) =>
                                            {
                                                if(err)
                                                {
                                                    console.log('error', err)
                                                }
                                                else
                                                {
                                                    collection.findOneAndUpdate({pulpit: o.pulpit},{$set: {faculty: o.faculty,pulpit_name: o.pulpit_name}},{returnOriginal: false},function(err,result)
                                                    {
                                                        if(err)
                                                        {
                                                            console.log('collection.find error', err);
                                                        }
                                                        else
                                                        {
                                                            if(result.value==null)
                                                            {
                                                                res.end(`"error":"3","message":"Уже изменено"`);
                                                            }
                                                            else
                                                            {
                                                                res.writeHead(200,{'Content-Type': 'application/json'});
                                                                res.end(JSON.stringify(result.value));
                                                            }
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });

                    });
                    break;
                default: break;
            }
            break;
        case 'DELETE':
            switch(true)
            {
                case url.parse(req.url).pathname.includes('faculty/') || url.parse(req.url).pathname.includes('pulpit/'):
                    client.connect(err =>
                    {
                        let body='';
                        req.on('data',chunk => {body+=chunk.toString();});

                        req.on('end',async () =>
                        {
                            let o = decodeURI(url.parse(req.url,true).pathname).split('/')[3];

                            if(err)
                            {
                                console.log('Mongodb error connection')
                            }
                            else
                            {
                                console.log('Mongodb connection success');
                                let collection_name = url.parse(req.url).pathname.split('/')[2];

                                client.db("bstu").collection(collection_name,(err,collection) =>
                                {
                                    if(err)
                                    {
                                        console.log('error', err)
                                    }
                                    else
                                    {
                                        if(collection_name == 'faculty')
                                        {
                                            collection.findOneAndDelete({faculty: o},(err, result) =>
                                            {
                                                if(err)
                                                {
                                                    console.log('collection.find error', err);
                                                }
                                                else
                                                {
                                                    if(result.value==null)
                                                    {
                                                        res.end(`"error":"1","message":"Уже удалено"`);
                                                    }
                                                    else
                                                    {
                                                        res.writeHead(200,{'Content-Type': 'application/json'});
                                                        res.end(JSON.stringify(result.value));
                                                    }
                                                }
                                            });
                                        }
                                        if(collection_name == 'pulpit')
                                        {
                                            client.db("bstu").collection(collection_name, (err,collection) =>
                                            {
                                                if(err)
                                                {
                                                    console.log('error', err)
                                                }
                                                else
                                                {
                                                    collection.findOneAndDelete({pulpit: o},function(err,result)
                                                    {
                                                        if(err)
                                                        {
                                                            console.log('collection.find error', err);
                                                        }
                                                        else
                                                        {
                                                            if(result.value==null)
                                                            {
                                                                res.end(`"error":"1","message":"Уже удалено"`);
                                                            }
                                                            else
                                                            {
                                                                res.writeHead(200,{'Content-Type': 'application/json'});
                                                                res.end(JSON.stringify(result.value));
                                                            }
                                                        }

                                                    });
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });

                    });
                    break;
                default: break;
            }
            break;
        default: break;
    }
}

http.createServer((req, res) =>
{
    try
    {
        http_handler(req,res);
    }
    catch(e)
    {
        console.error(e);
    }

}).listen(3000, () =>{console.log('Server has started on http://localhost:3000')});
