'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reactRouter = require('react-router');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _index = require('./reducers/index');

var _index2 = _interopRequireDefault(_index);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// middleware


// import the root reducer


// create our store based on whether we are in dev or production mode

var store = void 0,
    middleware = void 0;
var middlewares = [_reduxThunk2.default];

if ((process && process.env && process.env.NODE_ENV || undefined) != 'production') {
	var _require = require('redux-devtools-extension'),
	    composeWithDevTools = _require.composeWithDevTools;

	middlewares = [].concat(_toConsumableArray(middlewares), [_reduxLogger2.default]);

	middleware = _redux.applyMiddleware.apply(undefined, _toConsumableArray(middlewares));

	// get preloaded state and if we have rendered server side, populate store with it
	var preloadedState = window.__PRELOADED_STATE__;
	if (!preloadedState) {
		store = (0, _redux.createStore)(_index2.default, composeWithDevTools(middleware));
	} else {
		store = (0, _redux.createStore)(_index2.default, preloadedState, composeWithDevTools(middleware));
	}
} else {

	middlewares = [].concat(_toConsumableArray(middlewares));
	middleware = _redux.applyMiddleware.apply(undefined, _toConsumableArray(middlewares));

	// Grab the state from a global injected into server-generated HTML
	var _preloadedState = window.__PRELOADED_STATE__;
	if (!_preloadedState) {
		store = (0, _redux.createStore)(_index2.default, middleware);
	} else {
		// Create Redux store with initial state
		store = (0, _redux.createStore)(_index2.default, _preloadedState, middleware);
	}
}

// export const history = syncHistoryWithStore(browserHistory, store);

exports.default = store;