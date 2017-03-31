



export function socket() {

	return new Promise((resolve, reject) => {

		let url = `http://localhost:${5000}`
		if (process.env.NODE_ENV === 'production') {
			url = 'http://tolring.azurewebsites.net/'
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

