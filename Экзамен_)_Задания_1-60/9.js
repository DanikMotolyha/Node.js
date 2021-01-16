setTimeout(() => {
    console.log('setTimeout');
 }, 100)
 let interval = setInterval(() => {
    console.log('setInterval');
 }, 40)
 process.nextTick(() => {
    console.log('nextTick');
 }, 10);
 interval.unref();
 /**
  * nextTick() выполнится после завершения текущей итерации цикла событий. 
  * То есть, такая функция всегда будет выполняться до функции,
  *  выполнение которой запланировано с помощью setTimeout() или setImmediate() 
  */ 