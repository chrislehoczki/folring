'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect_socket = connect_socket;
exports.emit = emit;

var _rooms = require('./rooms');

var _notifications = require('./notifications');

var _auth = require('./auth');

var _messaging = require('./messaging');

var io = require('socket.io-client');

var store = void 0;
if (process && process.env && process.env.BROWSER || undefined) {
  store = require('../store').default;
}

var socket = null;

function connect_socket() {
  socket = io.connect('http://localhost:5000');
  socket.on('connect', function () {
    socket.emit('authenticate', { token: window.localStorage.apitoken }) //send the jwt
    .on('authenticated', function () {
      //do other things
      socket.on('update_current_room', function (config) {
        return store.dispatch((0, _rooms.updateCurrentRoom)(config));
      });

      socket.on('notification_win', function (config) {
        return store.dispatch((0, _notifications.toggleNotification)({ show: true, notification: config.winner + ' won!' }));
      });

      socket.on('notification', function (notification) {
        return displayNotification(notification);
      });

      socket.on('update_user', function (user) {
        return store.dispatch((0, _auth.loadUser)(user));
      });

      socket.on('message', function (config) {
        return store.dispatch((0, _messaging.addMessage)(config));
      });
    }).on('unauthorized', function (msg) {
      console.log("unauthorized: " + JSON.stringify(msg.data));
      displayNotification('Sorry - you weren\'t authorised to use Folring with those credentials. Try logging in again.');
      throw new Error(msg.data.type);
    });
  });
}

function emit(type, data) {
  console.log("EMITTING SOCKET EVENT", type, data);
  // emit events to server here
  socket.emit(type, data);
}