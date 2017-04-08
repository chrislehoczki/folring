console.log('RUNNING INDEX.JS')
require.extensions['.css'] = () => {
  return;
};

// import dotenv from 'dotenv';
require('dotenv').config()
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';

var express = require('express')
var app = express();
var server = require('http').createServer(app);

import routes from './routes/index'
import cors from 'cors';
// const React = require('react');
// const ReactDOMServer = require('react-dom/server');
// const StaticRouter = require('react-router').StaticRouter;
// import { StaticRouter as Router, matchPath } from 'react-router';
// import { renderToString } from 'react-dom/server';
// import App from '../client/js/components/App';
// const ReactApp = require('../client/js/components/App');

// const socket = require('./socket_server');

mongoose.Promise = global.Promise;
const mongooseURI = 'mongodb://root:abc123@localhost:3000/folring';
mongoose.connect(mongooseURI);

const Folring = require('./socket_server');
app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb'
}));
app.use('/client', express.static(process.cwd() + '/client'));
app.use('/dist', express.static(process.cwd() + '/dist'));
app.use(passport.initialize());

routes(app);

app.get('/', function(req, res) {
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


// new Folring(server);
// // socket(server);


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

var PORT = process.env.PORT || 5000;
server.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});


function createPage() {
  let scripts, staticCss;

  if (process.env.NODE_ENV === 'development') { 
    scripts = `<script type="text/javascript" src="/bundle.js"></script>`;
    staticCss = '';
  } else {
    scripts = `<script type="text/javascript" src="/dist/vendor.bundle.js"></script><script type="text/javascript" src="/dist/bundle.js"></script>`;
    staticCss = '<link rel="stylesheet" type="text/css" href="/dist/styles.css">';
  }

	const page = 
	`<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="utf-8">
	    <title>Folring</title>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
      ${staticCss}
  </head>
	<body>
    <div id="root"></div>
    ${scripts}
	</body>
	</html>`;

	return page;
}