// Modules
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Directories
const dirNode = 'node_modules'
const dirDemo = path.join(__dirname, 'demo')
const dirAssets = path.join(__dirname, 'assets')
const dirSrc = path.join(__dirname, 'src')

// Settings
const IS_DEV = (process.env.NODE_ENV === 'dev')
const appHtmlTitle = 'SeeClarke.js Boilerplates'

/**
 * Webpack Configuration
 */
module.exports = {
  // Entry scripts
  entry: {
    seeclarke: ['babel-polyfill', './src/SeeClarke.js'],
    demo: './demo/index.js'
  },

  // Path resolvers
  resolve: {
    modules: [
      dirNode,
      dirSrc,
      dirDemo,
      dirAssets
    ]
  },

  plugins: [
    new webpack.DefinePlugin({IS_DEV}),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.ejs'),
      title: appHtmlTitle
    }),

    new CopyWebpackPlugin([
      {from: 'assets', to: 'assets'}
    ])
  ],

  module: {
  rules: [
      /**
       * Babel
       */
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {compact: 'auto'}
      },

      /**
       * Vanilla CSS
       */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {sourceMap: IS_DEV}
          }
        ]
      },

      /**
       * CSS Preprocessors
       */
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {sourceMap: IS_DEV}
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEV,
              includePaths: [dirAssets]
            }
          }
        ]
      },

      /**
       * Images
       */
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'file-loader',
        options: {name: '[path][name].[ext]'}
      }
    ]
  }
}
