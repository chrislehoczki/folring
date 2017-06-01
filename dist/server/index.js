'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require.extensions['.css'] = function () {
  return;
};

// import dotenv from 'dotenv';
require('dotenv').config();


var express = require('express');
var app = express();
var server = require('http').createServer(app);

var setupSocket = require('./socket/socket_server');

// const socket = require('./socket_server');

_mongoose2.default.Promise = global.Promise;
var mongooseURI = 'mongodb://admin:admin@ds161041.mlab.com:61041/folring';
_mongoose2.default.connect(mongooseURI);

var Folring = require('./socket_server');
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json({ limit: '5mb' }));
app.use(_bodyParser2.default.urlencoded({
  extended: true,
  limit: '5mb'
}));
app.use('/client', express.static(__dirname + '/client'));
app.use('/dist', express.static(__dirname + '/dist'));
app.use(_passport2.default.initialize());

// app.get('/', function(req, res) {
// 	res.send(createPage());
// });


// const routes = [
//     '/',
//     '/profile',
//     '/tolring'
// ];


// new Folring(server);
// // socket(server);


if ((process && process.env && process.env.NODE_ENV || 'production') === 'development') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var webpack = require('webpack');
  var config = require('../webpack.config.dev.js');

  var compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: config.output.publicPath,
    quiet: false,
    stats: {
      colors: true
    },
    serverSideRender: true,
    historyApiFallback: true
  }));
  app.use(webpackHotMiddleware(compiler));
}

(0, _index2.default)(app);

setupSocket(server);

var PORT = process && process.env && process.env.PORT || '5000' || 5000;
server.listen(PORT, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});