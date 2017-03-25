var path = require('path');
var webpack = require('webpack');

const externals = ['react', 'react-dom'];
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'source-map'/*'cheap-module-source-map' */,
  entry: {
    app: "./client/js/index",
    vendor: externals
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {
       warnings: true
     }, sourceMap: false}),
    new ExtractTextPlugin({ filename: './styles.css', disable: false, allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'}),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
     use: {loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-0']
      }}},
     {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
       {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
        },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
      ]
  }
};