const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'client/app.js'),
  output: {
    path: path.join(__dirname, 'client-dist'),
    filename: 'app.bundle.js',
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: ExtractTextWebpackPlugin.extract({
        use: ['css-loader']
      }),
    }],
  },
  devServer: {
    contentBase: path.join(__dirname, 'client/public'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/public/index.html'),
    }),
    new ExtractTextWebpackPlugin('style.bundle.css')
  ],
};
