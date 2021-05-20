/**
 * 实现一个Promise.allSettled
 */
var resolvedPromisesArray = [
  1, Promise.reject(33), new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(33)
    },1000)
  }), Promise.resolve(44), 2];


Promise.allSettled = (promises) => {
  return new Promise((resolve, reject) => {
    const list = [];
    let len = promises.length;
    let index = 0;

    for(let i=0; i<len; i++) {
      const promise = Promise.resolve(promises[i]);
      
      
      promise.then((val) => {
        list[i] = {
          status: 'fulfilled',
          value: val
        }
        index++;
        if(index === len) resolve(list)
        
      }, (val) => {
        list[i] = {
          status: 'rejected',
            reason: val
        }
        index++;
        if(index === len) resolve(list)
      })
    }
  })
}

Promise.allSettled(resolvedPromisesArray).then((val) => {
  console.log("success", val)
}, (val) => {
  console.log("error", val)
})