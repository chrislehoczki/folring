



export function socket() {

	return new Promise((resolve, reject) => {

		let url = `http://folring.azurewebsites.net/`
		if (process.env.NODE_ENV === 'production') {
			url = 'http://folring.azurewebsites.net/'
		}

		var socket = require('socket.io-client')(url);

		socket.on('connect_failed', function(err){
			
    		reject(err);
		});

		socket.on('connect', function(){
			window.socket = socket;
			resolve();
		});


	});

	

	
}

