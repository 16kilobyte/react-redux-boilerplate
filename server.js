const express = require('express')
const path = require('path')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const routes = require('./server/api')

const app = express()

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
  const webpackConfig = require('./webpack.config.js')
  var compiler = webpack(webpackConfig)
  compiler.apply(new webpack.ProgressPlugin())

  app.use(express.static(__dirname))

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }
  }))

  app.use('/api', routes)

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'))
  })

  app.listen(8080)
}
