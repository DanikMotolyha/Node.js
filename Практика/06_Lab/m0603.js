const sendmail = require('sendmail')({silent: true});

 
module.exports.send = (name) => {
    sendmail({
        from:   'motolyha@belstu.by',
        to:     'motolyha@belstu.by',
        subject:'sendmail',
        html:   `<h1>${name}</h1>` 
    }, function(err, reply){
        console.log(err && err.stack);
        console.dir(reply);
    });
}

