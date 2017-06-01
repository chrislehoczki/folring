'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { messages: [] };
	var action = arguments[1];


	switch (action.type) {
		case _types.LOAD_CURRENT_ROOM:
			return action.payload;
			break;
		case _types.UPDATE_CURRENT_ROOM:
			return _extends({}, state, action.payload);
			break;
		case _types.ADD_MESSAGE:
			return _extends({}, state, { messages: [].concat(_toConsumableArray(state.messages), [action.payload]) });
	}

	return state;
};

var _types = require('../actions/types');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }