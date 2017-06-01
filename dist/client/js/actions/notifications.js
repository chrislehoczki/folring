'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.toggleNotification = toggleNotification;

var _types = require('./types');

function toggleNotification(notification) {
	return function (dispatch) {
		dispatch({ type: _types.TOGGLE_NOTIFICATION, payload: notification });
		setTimeout(function () {
			dispatch({ type: _types.TOGGLE_NOTIFICATION, payload: { show: false, notification: '' } });
		}, 2000);
	};
}