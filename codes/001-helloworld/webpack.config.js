const path = require('path');
const { join, resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './main.js',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'index_bundle.js'
   },
   devServer: {
      inline: true,
      port: 8000
   },
   module: {
      rules: [
         {
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   },
   resolve: {
      extensions: ['*', '.js', '.jsx']
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: resolve(__dirname, 'index.html'),
         filename: './index.html'
      })
   ]
}