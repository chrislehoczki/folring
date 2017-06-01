'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateToken = authenticateToken;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.signupUser = signupUser;
exports.loadUser = loadUser;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _types = require('./types');

var _socket = require('./socket');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authenticateToken(token) {

  return function (dispatch) {
    var url = '/api/user';
    var options = {
      headers: { authorization: token }
    };

    _axios2.default.get(url, options).then(function (response) {
      if (response.data.error) {
        window.localStorage.removeItem('apitoken');
      } else {
        dispatch({
          type: _types.LOAD_USER,
          payload: response.data
        });
        dispatch({ type: _types.LOAD_CURRENT_ROOM, payload: response.data.playingRooms[0] || null });

        (0, _socket.connect_socket)();
      }
    }).catch(function (err) {
      console.log(err);
      dispatch({ type: _types.LOAD_USER, payload: null });
    });
  };
}

function loginUser(_ref) {
  var email = _ref.email,
      password = _ref.password;

  var url = '/auth/login';
  var options = {
    email: email, password: password
  };

  return function (dispatch) {

    _axios2.default.post(url, options).then(function (response) {
      if (response.data.error) {
        console.log(response.data.error);
        window.localStorage.removeItem('apitoken');
      } else {
        window.localStorage.setItem('apitoken', response.data.apitoken);
        console.log(response.data);
        dispatch({
          type: _types.LOAD_USER,
          payload: response.data
        });
        dispatch({ type: _types.LOAD_CURRENT_ROOM, payload: response.data.playingRooms[0] || null });

        (0, _socket.connect_socket)();
      }
    }).catch(function (err) {
      console.log(err);
      dispatch({ type: _types.LOAD_USER, payload: null });
    });
  };
}

function logoutUser() {

  window.localStorage.removeItem('apitoken');
  return { type: _types.LOAD_USER, payload: null };
}

function signupUser(_ref2) {
  var username = _ref2.username,
      email = _ref2.email,
      password = _ref2.password;

  var url = '/auth/signup';
  var options = {
    username: username, email: email, password: password
  };

  return function (dispatch) {

    _axios2.default.post(url, options).then(function (response) {
      if (response.data.error) {
        console.log(response.data.error);
        window.localStorage.removeItem('apitoken');
      } else {
        window.localStorage.setItem('apitoken', response.data.apitoken);
        console.log(response.data);
        dispatch({
          type: _types.LOAD_USER,
          payload: response.data
        });
        dispatch({ type: _types.LOAD_CURRENT_ROOM, payload: response.data.playingRooms[0] || null });

        (0, _socket.connect_socket)();
      }
    }).catch(function (err) {
      console.log(err);
      dispatch({ type: _types.LOAD_USER, payload: null });
    });
  };
}

function loadUser(user) {
  return { type: _types.LOAD_USER, payload: user };
}