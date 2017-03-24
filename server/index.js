

var app = require('express')();
var server = require('http').createServer(app);

app.get('/', function(req, res) {
	res.send(createPage());
});

var io = require('socket.io')(server);
io.on('connection', function(){ /* … */ });
server.listen(3000);


function createPage() {

	const page = 
	`<!DOCTYPE html>
	<html lang="en">
	<head>
	    <meta charset="utf-8">
	    <title>Builder - Fun Academy</title>
      	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      	<h1> Hello World </h1>
      <script>
      
      </script>
		
	<body>
	</body>
	</html>`;

	return page;
}