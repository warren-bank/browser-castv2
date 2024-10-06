### [_browser-castv2_](https://github.com/warren-bank/browser-castv2)

Browser build for [_node-castv2_](https://github.com/thibauts/node-castv2): An implementation of the Chromecast `CASTV2` protocol

#### Build

```bash
npm install

# workaround for: "SyntaxError: Binding 'arguments' in strict mode."
#
# file:    ./node_modules/tls-browserify/index.js
# search:  function(arguments)
# replace: function()

npm run build
```

#### CDN

```html
  <script src="//cdn.jsdelivr.net/npm/@warren-bank/browser-castv2@1.0.0/dist/es2020/castv2.js"></script>
```

#### Usage

1. start the [TCP proxy server](./tcp-proxy-server/index.js)
   * command-line:
     ```bash
       npm install
       npm start
     ```
   * uses _Node.js_ with _Express.js_
   * comes from the [_net-browserify_](https://github.com/emersion/net-browserify) polyfill library
     - the original [server](https://github.com/emersion/net-browserify/blob/master/examples/connect/server.js) with its [middleware](https://github.com/emersion/net-browserify/blob/master/api.js)
   * is a required workaround for the limitation that client-side javascript cannot make TCP socket connections
     - allows the client-side javascript to connect by websocket
     - pipes data from the websocket to the TCP socket
     - pipes data from the TCP socket to the websocket
2. run the [client-side javascript library](./dist/es2020/castv2.js) in a web browser
   * [example](./example/es2020.html)

#### Legal

* license for [_node-castv2_](https://github.com/thibauts/node-castv2/releases/tag/v0.1.10) is [MIT](https://github.com/thibauts/node-castv2/blob/v0.1.10/LICENSE)
* license for [_browser-castv2_](https://github.com/warren-bank/browser-castv2/releases/tag/v1.0.0) is [GPL-2.0](https://github.com/warren-bank/browser-castv2/blob/v1.0.0/LICENSE.txt)
  - only covers the content of this repo, which contains primarily build scripts
