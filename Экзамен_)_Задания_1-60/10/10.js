let mod = require('./testmodule');
//let mod = require('./testmodule')('hello');

mod.printMod('hi');
console.log('x: ' + mod.x);
console.log('y: ' + global.y);
console.log('z: ' + process.z);
console.log('CACHE1: ')
console.log(require.cache);
delete require.cache[require.resolve('./testmodule.js')];
console.log('CACHE2: ')
console.log(require.cache);