
var express = require('express')
var app = express();
var server = require('http').createServer(app);

app.use('/client', express.static(process.cwd() + '/client'));

app.get('/', function(req, res) {
	res.send(createPage());
});

const UPDATE_GAME = 'update_game';
const GAME_END = 'game_end';
const GAME_START = 'game_start';

var io = require('socket.io')(server);
io.on('connection', function (socket) {
	console.log('connext to socket')
  socket.emit('game_death', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

if (process.env.NODE_ENV !== 'production') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var config = require('../webpack.config.dev.js');

    var compiler = webpack(config);

    // var morgan = require('morgan');
    // app.use(morgan('dev'));
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

var PORT = process.env.PORT || 8080;
server.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
  }
});


function createPage() {
	const page = 
	`<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="utf-8">
	    <title>Builder - Fun Academy</title>
      	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      	<div id="root"></div>
		<script type="text/javascript" src="/bundle.js"></script>
	<body>
	</body>
	</html>`;

	return page;
}