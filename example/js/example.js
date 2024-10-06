document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('button#launch-button').addEventListener('click', doLaunch)
})

var doLaunch = function() {
  if (!window.castv2) return

  var cc_ip   = document.querySelector('input#cc-ip').value
  var cc_port = document.querySelector('input#cc-port').value

  var tcp_host = document.querySelector('input#tcp-host').value
  var tcp_port = document.querySelector('input#tcp-port').value
  var tcp_path = document.querySelector('input#tcp-path').value

  if (!cc_ip) return

  if (cc_port)  cc_port  = parseInt(cc_port,  10)
  if (tcp_port) tcp_port = parseInt(tcp_port, 10)

  var cc_options = {
    host: cc_ip,
    port: cc_port
  }

  var tcp_options = {
    hostname: tcp_host,
    port:     tcp_port,
    path:     tcp_path
  }

  window.castv2.setProxy(tcp_options)

  var client = new window.castv2.Client()

  // https://github.com/thibauts/node-castv2#usage
  client.connect(cc_options, function() {
    // create various namespace handlers
    var connection = client.createChannel('sender-0', 'receiver-0', 'urn:x-cast:com.google.cast.tp.connection', 'JSON')
    var heartbeat  = client.createChannel('sender-0', 'receiver-0', 'urn:x-cast:com.google.cast.tp.heartbeat', 'JSON')
    var receiver   = client.createChannel('sender-0', 'receiver-0', 'urn:x-cast:com.google.cast.receiver', 'JSON')

    // establish virtual connection to the receiver
    connection.send({ type: 'CONNECT' })

    // start heartbeating
    setInterval(function() {
      heartbeat.send({ type: 'PING' })
    }, 5000)

    // launch YouTube app
    receiver.send({ type: 'LAUNCH', appId: 'YouTube', requestId: 1 })

    // display receiver status updates
    receiver.on('message', function(data, broadcast) {
      if(data.type = 'RECEIVER_STATUS') {
        console.log(data.status)
      }
    })
  })
}
