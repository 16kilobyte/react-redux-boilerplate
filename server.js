var express = require('express')
var path = require('path')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var routes = require('./server/api')

var app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

const isDevelopment = process.env.NODE_ENV !== 'production'

if (!isDevelopment) {
  app.use(express.static(__dirname))

  app.use('/api', routes)

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'))
  })

  app.listen(8080, function () {
    console.log('Your app listening on 8080! have a nice day:)')
  })
} else {
  var config = require('./webpack.config.js')
  var compiler = webpack(config)
  compiler.apply(new webpack.ProgressPlugin())

  app.use(express.static(__dirname))

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true }
  }))

  app.use('/api', routes)

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'))
  })

  app.listen(8080)
}
