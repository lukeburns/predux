var predux = require('../')
var stringify = require('JSONStream').stringify(false)

var counter = predux.proxy()

// counter.set('increment', (state=0, num=1) => state+num)
// counter.set('decrement', (state=0, num=1) => state-num)
counter.increment = (state=0, num=1) => state+num
counter.decrement = (state=0, num=1) => state-num

counter.increment()
counter.decrement()

counter.pipe(stringify).pipe(process.stdout)