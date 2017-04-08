const webpack = require('webpack');
const path = require('path');

module.exports = {
  //devtool: 'inline-source-map',
  // devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    './client/js/index'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'react-hmre']
          }},
      
      include: path.join(__dirname, 'client/js')
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }

      ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'BROWSER': JSON.stringify(true)
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};



