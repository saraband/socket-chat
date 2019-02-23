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
      CONSTANTS: path.resolve(__dirname, 'src/constants'),
      ROUTES: path.resolve(__dirname, 'src/routes'),
      PAGES: path.resolve(__dirname, 'src/pages'),
      SHARED: path.resolve(__dirname, '../shared'),
      LAYOUTS: path.resolve(__dirname, 'src/layouts')
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
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  }
};
