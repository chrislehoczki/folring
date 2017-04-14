const io = require('socket.io-client');

import { updateCurrentRoom } from './rooms';
import { displayNotification } from './notifications';
import { loadUser } from './auth';

let store;
if (process.env.BROWSER) {
  store = require('../store').default;
}

let socket = null;

export function connect_socket () {
  socket = io.connect('http://localhost:5000');
  socket.on('connect', function () {
    socket
      .emit('authenticate', {token: window.localStorage.apitoken }) //send the jwt
      .on('authenticated', function () {
        //do other things
        console.log('authenticated user');
        socket.on('update_current_room', (config) => store.dispatch(updateCurrentRoom(config)));
        
        socket.on('notification_win', (config) => displayNotification(`${config.winner} won!`));

        socket.on('notification', (notification) => displayNotification(notification));

        socket.on('update_user', (user) => store.dispatch(loadUser(user)));
      })
      .on('unauthorized', function(msg) {
        console.log("unauthorized: " + JSON.stringify(msg.data));
        throw new Error(msg.data.type);
      })
});
}


export function emit(type, data) {
  console.log("EMITTING SOCKET EVENT", type, data)
  // emit events to server here
  socket.emit(type, data);

}