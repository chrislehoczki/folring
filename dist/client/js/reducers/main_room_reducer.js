'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];


	switch (action.type) {
		case _types.LOAD_MAIN_ROOMS:
			return action.payload;
			break;
	}

	return state;
};

var _types = require('../actions/types');