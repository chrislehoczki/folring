const io = require('socket.io-client');

import { updateCurrentRoom } from './rooms';
import { toggleNotification } from './notifications';
import { loadUser } from './auth';
import { addMessage } from './messaging';

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
        socket.on('update_current_room', (config) => store.dispatch(updateCurrentRoom(config)));
        
        socket.on('notification_win', (config) => store.dispatch(toggleNotification({show: true, notification: `${config.winner} won!`})));

        socket.on('notification', (notification) => displayNotification(notification));

        socket.on('update_user', (user) => store.dispatch(loadUser(user)));

        socket.on('message', (config) => store.dispatch(addMessage(config)) )
      })
      .on('unauthorized', function(msg) {
        console.log("unauthorized: " + JSON.stringify(msg.data));
        displayNotification('Sorry - you weren\'t authorised to use Folring with those credentials. Try logging in again.')
        throw new Error(msg.data.type);
      })
});
}


export function emit(type, data) {
  console.log("EMITTING SOCKET EVENT", type, data)
  // emit events to server here
  socket.emit(type, data);

}