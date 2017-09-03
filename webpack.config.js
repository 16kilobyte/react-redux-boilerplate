var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    main: [
      'babel-polyfill',
      './src/index.js'
    ],
    vendor: ['jquery', 'popper.js', 'bootstrap']
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'public/bundle.js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['env', 'react', 'stage-0']
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      },
      {
        test: /\.(ttf|otf)$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      container: path.resolve(__dirname, 'src/container'),
      components: path.resolve(__dirname, 'src/components/'),
      actions: path.resolve(__dirname, 'src/actions/'),
      reducers: path.resolve(__dirname, 'src/reducers/')
    }
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'public/site.css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      Popper: ['popper.js', 'default'],
      'window.jQuery': 'jquery',
      $: 'jquery',
      jQuery: 'jquery',
      React: 'react'
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'public/vendor.bundle.js', minChunks: 1000 })
  ]
}
