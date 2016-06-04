var reduxer = require('reduxer')

module.exports = predux
module.exports.ctor = ctor
module.exports.proxy = proxy

function predux (options) {
  return new ctor(options)()
}

function ctor (options) {

  var Stream = reduxer.ctor({ objectMode: true }, function (state, chunk) {
    chunk = chunk.toString()
    var i = chunk.indexOf(' ')
    var name = chunk.slice(0, i)
    var args = JSON.parse(chunk.slice(i+1))
    var state = this.functions[name].apply(this, [state, ...args])
    this.emit.apply(this, [name, state, ...args])
    return state
  })

  Stream.prototype.set = function (name, fn) {
    this.functions = this.functions || {}
    this.functions[name] = fn 
    Object.defineProperty(this, name, {
      value: function () {
        this.write(name + ' ' + JSON.stringify(Array.prototype.slice.call(arguments)))
      },
      writable: true
    })
  }

  return Stream

}

function proxy (options) {
  var stream = new ctor(options)()

  if (typeof Proxy !== 'undefined') {
    var handler = {
      set(target, name, fn) {
        if (name !== 'functions') target.set(name, fn)
        else target[name] = fn
        return true
      }
    }

    return new Proxy(stream, handler)
  }

  return stream
}