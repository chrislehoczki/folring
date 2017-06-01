'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.updateUI = updateUI;

var _types = require('./types');

function updateUI(config) {
	return { type: _types.UPDATE_UI, payload: config };
}