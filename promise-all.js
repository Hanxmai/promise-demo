/**
 * 实现一个promise.all()
 * 1. 返回一个promise实例
 * 1、接收一个 Promise 实例的数组或具有 Iterator 接口的对象，
 * 2、如果元素不是 Promise 对象，则使用 Promise.resolve 转成 Promise 对象
 * 3、如果全部成功，状态变为 resolved，返回值将组成一个数组传给回调
 * 4、只要有一个失败，状态就变为 rejected，返回值将直接传递给回调all() 的返回值也是新的 Promise 对象
 */

var resolvedPromisesArray = [
  1, new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(33)
    })
  }), Promise.resolve(44), 2];



Promise.all = (promises) => { 

  return new Promise((resolve, reject) => {
    if(!Array.isArray(promises)) reject('必须是个数组')
    if(typeof promises[Symbol.iterator] != 'function') reject('类型错误');

    const len = promises.length;
    let index = 0;
    const list = [];

    for(let i=0; i<len; i++) {

      let promise = promises[i];

      // 非Promise转换成Promise判断
      if(!(promise instanceof Promise)) {
        promise = Promise.resolve(promise);
      }
      
      promise.then((val) => {
        index++;
        list[i] = val;
        if(index === len) resolve(list);
      }, (val) => {
        reject(val)
      })
    }
  })
}

Promise.all(resolvedPromisesArray).then((val) => {
  console.log("222", val)
}, (val) => {
  console.log("333", val)
});

