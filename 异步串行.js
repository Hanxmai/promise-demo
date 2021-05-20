// 递归处理
function loop(i) {
  const promise = Promise.resolve(resolvedPromisesArray[i])
  promise.then((val) => {
    if( i>=resolvedPromisesArray.length ) return;
    i++;
    console.log(val)
    loop(i)
  })
}

//async await 
async function asyncFunc() {
  for(let item of resolvedPromisesArray) {
    const val = await item;
    console.log(val)
  }
}

// 串行then调用
function thenThen() {
  let promise = Promise.resolve();
  resolvedPromisesArray.forEach((p) => {
    promise = promise.then(() => Promise.resolve(p).then(console.log))
  })
}

// reduce实现
function reduce () {
  // resolvedPromisesArray.unshift(Promise.resolve())
  resolvedPromisesArray.reduce((accumulator, val) => {
    return accumulator.then(() => Promise.resolve(val).then(console.log))
  }, Promise.resolve())
}

var resolvedPromisesArray = [
  1, Promise.resolve(13), new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(14)
    }, 2000)
  }), Promise.resolve(15), 16];