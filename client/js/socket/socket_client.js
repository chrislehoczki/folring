



export function socket() {
	// play with socket.io here
	let url = 'http://localhost:3000'
	if (process.env.NODE_ENV === 'production') {
		url = 'http://tolring.azurewebsites.net/'
	}

	var socket = require('socket.io-client')(url);


socket.on('connect', function(){
	window.socket = socket;

	// socket.on('message', function(message) {
	// 	console.log(message);
	// });

	// socket.on('game', function(game) {
	// 	console.log(game);
	// });
	// socket.on('users', function(users){
	// 	console.log('users: ' + users);
 //    	// alert('user connected, users: '+ users)
 //  	});
});
// socket.on('event', function(data){});
// socket.on('disconnect', function(){
// 	// alert('user disconnected')
// });


	
}

