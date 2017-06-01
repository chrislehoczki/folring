'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { notification: 'test notification', show: false };
	var action = arguments[1];

	switch (action.type) {
		case _types.TOGGLE_NOTIFICATION:
			return action.payload;
	}
	return state;
};

var _types = require('../actions/types');