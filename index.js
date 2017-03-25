'use strict';

require.extensions['.css'] = function () {
  return;
};

var express = require('express');
var app = express();
var server = require('http').createServer(app);

// const React = require('react');
// const ReactDOMServer = require('react-dom/server');
// const StaticRouter = require('react-router').StaticRouter;
// import { StaticRouter as Router, matchPath } from 'react-router';
// import { renderToString } from 'react-dom/server';
// import App from '../client/js/components/App';
// const ReactApp = require('../client/js/components/App');

var socket = require('./socket_server');

app.use('/client', express.static(process.cwd() + '/client'));
app.use('/dist', express.static(process.cwd() + '/dist'));

app.get('/', function (req, res) {
  res.send(createPage());
});

// const routes = [
//     '/',
//     '/profile',
//     '/tolring'
// ];

// app.get('*', (req, res) => {
//     // const match = routes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null);
//     // if (!match) {
//     //     res.status(404).send(render(<h1>No Match</h1>));
//     //     return;
//     // }

//     const html = ReactDOMServer.renderToString(<StaticRouter context={{}} location={req.url}>
//                                   <ReactApp />
//                                 </StaticRouter>);

//     res.send(createPage(html));

// });


socket(server);

if (process.env.NODE_ENV === 'development') {
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
    serverSideRender: true
  }));
  app.use(webpackHotMiddleware(compiler));

  // reload(server, app);
}

var PORT = process.env.PORT || 3000;
server.listen(PORT, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});

function createPage() {
  var scripts = void 0,
      staticCss = void 0;

  if (process.env.NODE_ENV === 'development') {
    scripts = '<script type="text/javascript" src="/bundle.js"></script>';
    staticCss = '';
  } else {
    scripts = '<script type="text/javascript" src="/dist/vendor.bundle.js"></script><script type="text/javascript" src="/dist/bundle.js"></script>';
    staticCss = '<link rel="stylesheet" type="text/css" href="/dist/styles.css">';
  }

  var page = '<!DOCTYPE html>\n\t<html lang="en">\n\t<head>\n\t    <meta charset="utf-8">\n\t    <title>Folring</title>\n      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">\n      ' + staticCss + '\n  </head>\n\t<body>\n    <div id="root"></div>\n    ' + scripts + '\n\t</body>\n\t</html>';

  return page;
}