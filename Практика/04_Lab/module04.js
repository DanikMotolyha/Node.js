var util    = require('util');
var ee      = require('events');

var db_data = [
    {id: '1', name: 'Мотолыга Д.И.', bday: '2000-06-26'}
];

function DB(){
    this.get    = ()    => { console.log(db_data); return db_data;  };
    this.post   = (r)   => { 
        var index = db_data.findIndex(ind => ind.id == r.id);
        if(index < 0)
            db_data.push(r);
        else
            console.log('this index already exists');
   }; 
    this.put    = (r)   => { 
            const index = db_data.findIndex(ind => ind.id == r.id);
            if (index != -1) {
                db_data.splice(index, 1, r);
            }
            else
               console.log('Error put command');
    };
    this.delete = (r)  =>  { 
        var index = db_data.findIndex(ind => ind.id == r.id);
        if (index !== -1) {
            db_data.splice(index, 1);
        }
        else
            console.log('Error delete command');
    };
    this.commit = () => {};
}

util.inherits(DB, ee.EventEmitter);

exports.DB = DB;