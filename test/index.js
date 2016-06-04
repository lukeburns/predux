var test = require('tape').test
var predux = require('../')

test('initial state and arguments passed to handler', function (t) {
  t.plan(3)
  var proxy = predux()
  var a1 = 1, a2 = 2, a3 = 3

  proxy.set('fn', (state={}, arg1, arg2, arg3) => {
    t.equal(arg1, a1)
    t.equal(arg2, a2)
    t.equal(arg3, a3)
    return { arg1, arg2, arg3 }
  })

  proxy.fn(a1, a2, a3)
})

test('final state and arguments passed to event', function (t) {
  t.plan(4)
  var proxy = predux()
  var a1 = 1, a2 = 2, a3 = 3

  proxy.set('fn', (state={}, arg1, arg2, arg3) => {
    return { arg1, arg2, arg3 }
  })

  proxy.on('fn', function (state, arg1, arg2, arg3) {
    t.deepEqual(state, { arg1: a1, arg2: a2, arg3: a3 })
    t.equal(arg1, a1)
    t.equal(arg2, a2)
    t.equal(arg3, a3)
  })

  proxy.fn(a1, a2, a3)
})