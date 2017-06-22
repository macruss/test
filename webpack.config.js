const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
});
const CommonsChunkPluginConfig = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: Infinity,
  filename: 'vendor.js'
});
const devServerConfig = {
  historyApiFallback: { disableDotRule: true },
};

module.exports = {
  entry: {
    app: ['./client/index.jsx'],
    vendor: ['react', 'react-dom', 'react-router-dom']
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  plugins: [
    HtmlWebpackPluginConfig,
    CommonsChunkPluginConfig
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      { 
        test: /\.jsx?$/, 
        loader: 'babel-loader',
        exclude:  /node_modules/
      }
    ]
  },
  devServer: devServerConfig
}