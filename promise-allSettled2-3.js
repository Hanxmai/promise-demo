/**
 * 实现一个allSettled2方法,接收两个promise数组，数组内的 promise 串行，两个数组并行
 * 1. 改成使用Promise.all 实现两个数组并行
 * 2. 利用reduce 实现数组内的数据串行
 */

Promise.allSettled2 = (promisesList) => {
  return Promise.all(
    promisesList.map(promises => {
      let list = [];
      return promises.reduce((accumulator, promise) => {
        return accumulator.then(() => Promise.resolve(promise()).then((val) => {
          list.push({
            status: 'fulfilled',
            value: val
          })

        }, (val) => {
          list.push({
            status: 'rejected',
            value: val
          })
        }))
      }, Promise.resolve()).then(() => Promise.resolve(list))
    })
  )
}





var resolvedPromisesArray = [
  [1, Promise.resolve(13), new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(14)
    }, 2000)
  }), Promise.reject(15), 16], [26,28]];


function delay(v, t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(v, t)
      resolve(v)
    }, t)
  })
}

const list1 = [1,3,5,7,9].map(i => delay.bind(null, i, Math.random()*1000))
const list2 = [2,4,6,8,10].map(i => delay.bind(null, i, Math.random()*1000))
  


 Promise.allSettled2([list1, list2]).then((val) => {
  console.log("22", val)
})


