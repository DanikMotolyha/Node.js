async function func() {
    console.log('check');
    return "Success";
 };
 (
    async () => {
       try {
          let res = await func();
          console.log("Result: " + res)
       }
       catch (e) {
          console.log("Result: " + e)
       }
    }
 )()
 //без авейт 
 /*
 async function func() {
    console.log('check');
    return "Success";
 };
 (
    async () => {
       try {
          let res = func();
          console.log("Result: " + res)
       }
       catch (e) {
          console.log("Result: " + e)
       }
    }
 )()*/