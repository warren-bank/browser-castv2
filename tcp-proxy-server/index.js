const express = require('express')
const netApi  = require('net-browserify/api')

const app     = express()
const port    = (process.argv.length > 2) ? parseInt(process.argv[2], 10) : 3000
const options = {
  urlRoot:     '/api/vm/net',
  allowOrigin: false
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin)
  res.header('Access-Control-Allow-Credentials', 'true')

  if (req.method.toUpperCase() == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    res.header('Access-Control-Max-Age', 1728000); // Access-Control headers cached for 20 days
  }

  next()
})

app.use(netApi(options))

app.listen(port, function() {
  console.log('Server listening on port ' + port)
})
