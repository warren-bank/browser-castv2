const webpack      = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const path         = require('path')

module.exports = {
  entry: './src/globals.js',
  externals: {
    protobufjs: 'protobuf'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'castv2.js',
    sourceMapFilename: 'castv2.map'
  },
  target: ['web'],
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
      path.resolve('../node_modules')
    ],
    fallback: {
      "buffer": require.resolve("buffer/"),
      "events": require.resolve("events/"),
      "fs":     false,
      "http":   false,
      "net":    require.resolve("@warren-bank/net-browserify"),
      "stream": require.resolve("stream-browserify"),
      "timers": require.resolve("timers-browserify"),
      "tls":    require.resolve("tls-browserify"),
      "url":    require.resolve("@warren-bank/url"),
      "util":   require.resolve("util/")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /cast_channel\.proto$/,
        type: 'asset/source'
      }
    ]
  },
  node: {
    global: false,
    __filename: false,
    __dirname: 'mock'
  },
  optimization: {
    nodeEnv: 'production', 
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        terserOptions: {
          compress: true,
          sourceMap: true
        }
      }),
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ]
}
