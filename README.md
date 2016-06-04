predux
===============

[![NPM](https://nodei.co/npm/predux.png)](https://nodei.co/npm/predux/)

predux is an interface for building redux-like streams. It uses [reduxer](https://github.com/lukeburns/reduxer) and optionally ES6 proxies (works in [Node.js v6.2.1](http://node.green/)).

example
-------

```js
var predux = require('predux')

var counter = predux.proxy()
counter.increment = (state=0, num=1) => state+num
counter.decrement = (state=0, num=1) => state-num

counter.on('data', function (state) {
  console.log(state)
})

counter.increment() // 1
counter.increment() // 2
counter.decrement() // 1
```

If you'd rather not use proxies, the following is equivalent to the above.

```
var counter = predux()
counter.set('increment', (state=0, num=1) => state+num)
counter.set('decrement', (state=0, num=1) => state-num)
```

`counter` is an object stream.

install
-----

```
npm install predux
```