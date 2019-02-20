const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  target: 'node',
  mode: 'production',
  devtool: 'source-map',
  externals: [nodeExternals()],
  entry: path.resolve(srcPath, 'index.js'),
  output: {
    path: distPath,
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([distPath], {
      verbose: true
    })
  ]
};