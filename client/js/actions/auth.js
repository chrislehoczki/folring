
import axios from 'axios';
const io = require('socket.io-client')

import { LOAD_USER } from './types';



export function authenticateToken(token) {

  return function(dispatch) {
    const url = '/api/user';
    const options = {
      headers: { authorization: token }
    };

    axios.get(url, options)
      .then(response => {
        if (response.error) {
          localStorage.removeItem('apitoken');
        } else {
          dispatch({
            type: LOAD_USER,
            payload: response.data
          });

          connect_socket(window.localStorage.apitoken);

        }
   
      }).catch(err => {
      	console.log(err);
        dispatch({type: LOAD_USER, payload: null});
      });
    }

}

export function connect_socket (token) {
  var socket = io.connect('http://localhost:5000');
  socket.on('connect', function () {
    socket
      .emit('authenticate', {token: window.localStorage.apitoken }) //send the jwt
      .on('authenticated', function (msg) {
        //do other things
        console.log('authenticated', msg)
      })
      .on('unauthorized', function(msg) {
        console.log("unauthorized: " + JSON.stringify(msg.data));
        throw new Error(msg.data.type);
      })
});
}
