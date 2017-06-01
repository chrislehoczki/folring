'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.listRooms = listRooms;
exports.getCurrentRoom = getCurrentRoom;
exports.loadCurrentRoom = loadCurrentRoom;
exports.updateCurrentRoom = updateCurrentRoom;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listRooms(query) {

	return function (dispatch) {
		var url = '/api/rooms';
		var options = {
			headers: { authorization: window.localStorage.apitoken }
		};

		console.log('API/rooms options', options);

		_axios2.default.get(url, options).then(function (response) {
			if (response.error) {
				console.log(response.error);
				dispatch({ type: _types.LOAD_MAIN_ROOMS, payload: [] });
			} else {
				dispatch({
					type: _types.LOAD_MAIN_ROOMS,
					payload: response.data
				});
			}
		}).catch(function (err) {
			console.log(err);
			dispatch({ type: _types.LOAD_MAIN_ROOMS, payload: [] });
		});
	};
}

function getCurrentRoom(roomId) {

	return function (dispatch) {
		var url = '/api/room/' + roomId;
		var options = {
			headers: { authorization: window.localStorage.apitoken }
		};

		_axios2.default.get(url, options).then(function (response) {
			if (response.error) {
				console.log(response.error);
				dispatch({ type: _types.LOAD_CURRENT_ROOM, payload: null });
			} else {
				dispatch({
					type: _types.LOAD_CURRENT_ROOM,
					payload: response.data
				});
			}
		}).catch(function (err) {
			console.log(err);
			dispatch({ type: _types.LOAD_CURRENT_ROOM, payload: null });
		});
	};
}

function loadCurrentRoom(room) {
	return { type: _types.LOAD_CURRENT_ROOM, payload: null };
}

function updateCurrentRoom(config) {
	return { type: _types.UPDATE_CURRENT_ROOM, payload: config };
}