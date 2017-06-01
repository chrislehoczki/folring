'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addRoom = addRoom;
exports.deleteRoom = deleteRoom;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addRoom(roomName) {
	console.log(roomName);
	return function (dispatch) {

		var options = {
			headers: { authorization: window.localStorage.apitoken },
			method: 'POST',
			url: '/api/room',
			data: {
				roomName: roomName
			}
		};

		(0, _axios2.default)(options).then(function (response) {
			if (response.error) {
				console.log(response.error);
			} else {
				var newRoom = response.data;
				dispatch({
					type: _types.ADD_USER_ROOM,
					payload: response.data
				});
			}
		}).catch(function (err) {
			console.log(err);
		});
	};
}

function deleteRoom(roomId) {
	return function (dispatch) {

		var options = {
			headers: { authorization: window.localStorage.apitoken },
			method: 'DELETE',
			url: '/api/room/' + roomId
		};

		console.log(options);
		(0, _axios2.default)(options).then(function (response) {
			if (response.error) {
				console.log(response.error);
			} else {
				dispatch({
					type: _types.DELETE_USER_ROOM,
					payload: response.data.roomId
				});
			}
		}).catch(function (err) {
			console.log(err);
		});
	};
}