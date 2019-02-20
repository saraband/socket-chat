const merge = require('webpack-merge');
const common = require('./webpack.client.common.js');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const path = require('path');

const distPath = path.resolve(__dirname, 'dist');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: distPath,
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: distPath,
    hot: true,
    port: 8080,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    // Clean dist/ folder
    new CleanWebpackPlugin(['dist'], {
      verbose: true
    }),

    // Generating index.html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      alwaysWriteToDisk: true,
      template: 'client/templates/index.html',
      title: '[DEV] socket-chat',
      meta: {
        'viewport': 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
      },
    }),

    // Writes index.html to disk so we can
    // use it as historyFallback with the devServer
    new HtmlWebpackHarddiskPlugin({
      outputPath: distPath
    }),

    // HMR
    new webpack.HotModuleReplacementPlugin()
  ]
});