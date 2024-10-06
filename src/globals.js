// =============
// monkey patch:
// =============
// https://github.com/protobufjs/protobuf.js/blob/6.8.8/src/root.js#L169
// https://github.com/protobufjs/protobuf.js/blob/6.8.8/src/util.js#L15
// https://github.com/protobufjs/protobuf.js/blob/6.8.8/lib/fetch/index.js#L33
// =============
const protobuf = require('protobufjs')
protobuf.util.fetch = function(filename, callback) {
  const timers = require('timers')
  timers.setTimeout(function(){
    // ====================
    // type: 'asset/source'
    // ====================
    const cast_channel_proto = require('castv2/lib/cast_channel.proto')

    callback(null, cast_channel_proto)
  }, 0)
}

window.castv2 = require('castv2')
window.Buffer = require('buffer').Buffer
window.process = {
  nextTick: function(callback, ...args) {
    const timers = require('timers')
    timers.setTimeout(function() {
      callback.apply(null, args)
    }, 0)
  }
}

// ===============================
// expose tcp proxy configuration:
// ===============================
// https://github.com/emersion/net-browserify#how-to-use
// ===============================
// example:
//   window.castv2.setProxy({port: 3000})
// ===============================
const net = require('net')
window.castv2.setProxy = net.setProxy
