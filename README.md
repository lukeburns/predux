predux
===============

[![NPM](https://nodei.co/npm/predux.png)](https://nodei.co/npm/predux/)

predux is an interface for building redux-like streams built using ES6 proxies (works in [Node.js v6.2.1](http://node.green/)).

example
-------

```js
var predux = require('predux')

var counter = predux()
counter.increment = (state=0, num=1) => state+num
counter.decrement = (state=0, num=1) => state-num

counter.on('data', function (state) {
  console.log(state)
})

counter.increment() // 1
counter.increment() // 2
```

`counter` is a object stream

install
-----

```
npm install predux
```