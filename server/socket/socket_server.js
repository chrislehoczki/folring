var socketioJwt = require('socketio-jwt');
var socketIo = require('socket.io');

module.exports = function socketSetup(server) {

	var sio = socketIo.listen(server);

	sio.sockets
  	.on('connection', socketioJwt.authorize({
	    secret: process.env.SECRET,
	    timeout: 15000 // 15 seconds to send the authentication message
		  })).on('authenticated', function(socket) {
		    //this socket is authenticated, we are good to handle more events from it.
		    const userId = socket.decoded_token.sub;
		    console.log('hello! ' + JSON.stringify(socket.decoded_token));
		  });
	
}