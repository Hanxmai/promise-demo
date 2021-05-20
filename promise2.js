// 手写一个promise对象
const pengding = 'PENGDING';
const fulfilled = "fulfilled";
const rejected ="REJECTED";

class Promise  {
  constructor (executor) {
    // 初始状态
    this.status = pengding;
    // 接收争取的值
    this.value = undefined;
    // 接收错误的值
    this.reason = undefined;
    // 存放成功的回调
    this.onResolvedCallbacks = [];
    // 存放失败的回调
    this.onRejectedCallbacks = [];

    let rosolve = (val) => {
      if(this.status === pengding) {
        this.status = fulfilled
        this.value = val
        // 依次将对应的函数执行
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }

    let reject = (err) => {
      if(this.status === pengding) {
        this.status = rejected
        this.reason = err
        // 依次将对应的函数执行
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }

    try {
      executor(rosolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then (onFulfilled, onReject) {

    //解决 onFufilled，onRejected 没有传值的问题
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    //因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后 then 的 resolve 中捕获
    onReject = typeof onReject === 'function' ? onReject : err => {throw err};

    let promise2 = new Promise((resolve, reject) => {

      if(this.status === fulfilled) {
        
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      
      } else if( this.status === rejected) {
        
        setTimeout(() => {
          try {
            let x = onReject(this.reason);
            resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      } else if (this.status === pengding) {

        // 如果状态是pengding状态，无法确定是成功还是失败，所以需要将成功和失败的回调都存起来，等确定好结果再执行
        this.onResolvedCallbacks.push(() => {

          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onReject(this.reason);
              resolvePromise(promise2, x, resolve, reject)
            } catch (err) {
              reject(err)
            }
          })
        })
      }
    })
  }
}


// const aa = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("111")
//     resolve("3333")
//   }, 2000)
// })

// aa.then((val) => {
//  console.log("11", val)
// }, (err) => {
//   console.log("22", err)
// })