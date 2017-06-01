'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addMessage = addMessage;

var _types = require('./types');

function addMessage(config) {
	console.log('CONFIG', config);

	return { type: _types.ADD_MESSAGE, payload: config };
}