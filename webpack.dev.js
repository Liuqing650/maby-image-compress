const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  entry: './src/example/index.js',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlwebpackPlugin({
      template: __dirname + "/src/index.html"
    })
  ],
  devServer: {
    contentBase: './dist'
  }
});
