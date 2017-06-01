'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.socket = socket;
function socket() {

	return new Promise(function (resolve, reject) {

		var url = 'http://localhost:' + 5000;
		if ((process && process.env && process.env.NODE_ENV || undefined) === 'production') {
			url = 'http://folring.azurewebsites.net/';
		}

		var socket = require('socket.io-client')(url);

		socket.on('connect_failed', function (err) {

			reject(err);
		});

		socket.on('connect', function () {
			window.socket = socket;
			resolve();
		});
	});
}