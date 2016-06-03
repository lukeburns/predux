var predux = require('../')

var counter = predux()
counter.increment = (state=0, num=1) => state+num
counter.decrement = (state=0, num=1) => state-num

counter.on('increment', function (state, args) {
  console.log(state, args)
})

counter.increment()
counter.increment(2)