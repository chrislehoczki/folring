
export function socket() {
console.log('SOCKET IS HERE')
	// play with socket.io here
var socket = require('socket.io-client')('http://localhost:8080');
socket.on('connect', function(){
	console.log('SOCKET CONNECTED')
	socket.emit('my other event', { my: 'data' });
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
