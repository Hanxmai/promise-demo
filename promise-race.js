/**
 * 实现一个Promise.race()
 * 谁跑的快先输出谁
 * 如果前面没有成功的，跑到错误的就是错误的
 */

 var resolvedPromisesArray = [1,
  new Promise((resolve, reject) => {
    setTimeout(() => {
     resolve(33)
   })
 }), Promise.resolve(44), 2];




Promise.race = (promises) => {
  return new Promise((resolve, reject) => {
    const len = promises.length;
    for(let i=0; i<len; i++) {

      let promise = Promise.resolve(promises[i]);

      promise.then((val) => {
        resolve(val)
      }, (val) => {
        reject(val)
      })
    }
  })
}

Promise.race(resolvedPromisesArray).then(
  (val) => {
  console.log("success", val),
  (val) => {
    console.log("error", val)
  }
})