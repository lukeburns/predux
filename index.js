var reduxer = require('reduxer')

module.exports = predux

function predux (options) {
  return proxify(reduxer(options, function (state, chunk) {
    chunk = chunk.toString()
    var i = chunk.indexOf(' ')
    var name = chunk.slice(0, i)
    var args = JSON.parse(chunk.slice(i+1))
    var state = this.fns[name].apply(this, [state, ...args])
    this.emit.apply(this, [name, state, ...args])
    return state
  }))
}

function proxify (target) {
  var handler = {
    set(target, name, fn) {
      target.fns = target.fns || []
      target.fns[name] = fn;
      target[name] = function () {
        target.write(name + ' ' + JSON.stringify(Array.prototype.slice.call(arguments)))
      }
      return true
    }
  }

  return new Proxy(target, handler)
}