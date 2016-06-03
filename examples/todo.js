var predux = require("../")

var todo = predux()
todo.add = (state=[], item, due='today') => state.concat({ item, due })
todo.remove = (state=[], index=0) => state.slice(0, index).concat(state.slice(index + 1))

todo.on('data', console.log.bind(console))

todo.add('do dishes')
todo.add('pick up the milk', 'tomorrow morning')
todo.remove(0)