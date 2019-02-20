const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/src/index.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      APP_BASE_URL: process.env.NODE_ENV === 'production'
        ? JSON.stringify('HEROKU URL')
        : JSON.stringify('http://localhost:3000')
    })
  ],
  resolve: {
    alias: {
      COMPONENTS: path.resolve(__dirname, 'src/components'),
      ROUTES: path.resolve(__dirname, 'src/routes'),
      PAGES: path.resolve(__dirname, 'src/pages')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};