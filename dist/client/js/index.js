'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = require('./components/App.js');

var _App2 = _interopRequireDefault(_App);

var _reactRouterDom = require('react-router-dom');

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// redux store


// import routes from './routes/routes';

// import { Router } from 'react-router';
_reactDom2.default.render(_react2.default.createElement(
		_reactRedux.Provider,
		{ store: _store2.default },
		_react2.default.createElement(
				_reactRouterDom.BrowserRouter,
				null,
				_react2.default.createElement(_App2.default, null)
		)
), document.querySelector('#root'));