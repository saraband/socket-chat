const merge = require('webpack-merge');
const common = require('./webpack.client.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const distPath = path.resolve(__dirname, 'dist');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: distPath,
    filename: '[name].[contentHash].bundle.js',
    chunkFilename: '[name].[contentHash].bundle.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
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
      template: 'client/templates/index.html',
      title: 'socket-chat',
      meta: {
        'viewport': 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no'
      },
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ]
});